interface Env {
  CONFIG: KVNamespace;
  NOCODB_BASE_URL: string;
  TRANSACTION_SECRET: string;
  CORS_ORIGINS?: string;
}

interface TransactionClaims {
  id: string;
  auditId: string | number;
  exp: number;
  title: string;
  version: string;
  filename: string;
  language: string;
  series: string;
  edition: string;
}
interface SourceRow {
  Id?: string | number;
  id?: string | number;
  SourceId?: string;
  UpdateSource?: string;
  UpdateLink?: string;
  Enabled?: boolean | number | string;
  Priority?: number | string;
  Regions?: string;
  SupportsRange?: boolean | number | string;
  UpdateCount?: number | string;
}

const ZIP_CONTENT_TYPES = new Set(["application/zip", "application/x-zip-compressed", "application/octet-stream"]);
const WORKER_VERSION = "1.1.0";
const MAX_PROBE_BYTES = 65_536;
const PROBE_TIMEOUT_MS = 8_000;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const requestId = crypto.randomUUID();
    try {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }), request, env);
      const url = new URL(request.url);
      let response: Response;
      if (request.method === "POST" && url.pathname === "/updates/transactions") response = await createTransaction(request, env);
      else if (request.method === "GET" && url.pathname === "/updates/sources") response = await listSources(request, env);
      else if (request.method === "POST" && /^\/updates\/sources\/[^/]+\/probe$/.test(url.pathname)) response = await probeSource(request, env, decodeURIComponent(url.pathname.split("/")[3]));
      else if (request.method === "POST" && url.pathname === "/updates/package") response = await streamPackage(request, env);
      else if (request.method === "POST" && /^\/updates\/transactions\/[^/]+\/result$/.test(url.pathname)) response = await reportResult(request, env, decodeURIComponent(url.pathname.split("/")[3]));
      else response = json({ error: "Not found." }, 404);
      console.log(JSON.stringify({ requestId, path: url.pathname, status: response.status }));
      return cors(response, request, env);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      const message = error instanceof HttpError ? error.message : "Update service error.";
      console.log(JSON.stringify({ requestId, status, error: message }));
      return cors(json({ error: message }, status), request, env);
    }
  }
};

async function createTransaction(request: Request, env: Env): Promise<Response> {
  const body = await readJson(request);
  const fields = ["title", "version", "filename", "language", "series", "edition", "device_type", "os", "client_version", "user_agent"];
  for (const field of fields) if (!isShortString(body[field])) throw new HttpError(400, `Invalid ${field}.`);
  const auditId = await createAudit(env, {
    Title: body.title, Version: body.version, UpdateDate: new Date().toISOString(), UpdateSource: "pending",
    device_type: body.device_type, os: body.os, client_version: body.client_version, user_agent: body.user_agent, UpdateStatus: "initiated"
  });
  const claims: TransactionClaims = {
    id: crypto.randomUUID(), auditId, exp: Math.floor(Date.now() / 1000) + 30 * 60,
    title: body.title, version: body.version, filename: body.filename, language: body.language, series: body.series, edition: body.edition
  };
  return json({ id: claims.id, token: await signClaims(claims, env.TRANSACTION_SECRET) }, 201);
}

async function listSources(request: Request, env: Env): Promise<Response> {
  const claims = await authorize(request, env);
  const url = new URL(request.url);
  const params = Object.fromEntries(["language", "series", "edition", "version", "title", "filename"].map((key) => [key, url.searchParams.get(key) ?? ""]));
  if (!Object.values(params).every(isShortString)) throw new HttpError(400, "Invalid source query.");
  if (params.language !== claims.language || params.series !== claims.series || params.edition !== claims.edition || params.version !== claims.version || params.title !== claims.title || params.filename !== claims.filename) throw new HttpError(403, "Source query does not match the transaction.");
  const rows = await findSources(env, params.filename);
  const sources = rows.filter(isEnabled).map((row) => ({
    sourceId: opaqueSourceId(row), name: safeName(row.UpdateSource) ?? "Update source", region: safeName(row.Regions), priority: boundedInteger(row.Priority, 0, 1000), supportsRange: asBoolean(row.SupportsRange)
  }));
  return json({ sources });
}

async function probeSource(request: Request, env: Env, sourceId: string): Promise<Response> {
  const claims = await authorize(request, env);
  const source = await sourceById(env, sourceId, claims);
  const started = performance.now();
  try {
    const upstream = await fetchApproved(source.UpdateLink!, env, { headers: { Range: `bytes=0-${MAX_PROBE_BYTES - 1}` } });
    const contentType = upstream.headers.get("content-type")?.split(";", 1)[0].toLowerCase();
    if (!upstream.ok) throw new HttpError(502, `Source probe rejected (HTTP ${upstream.status}).`);
    if (contentType && !ZIP_CONTENT_TYPES.has(contentType)) throw new HttpError(502, `Source probe rejected (content type ${contentType}).`);
    if (!upstream.body) throw new HttpError(502, "Source probe rejected (empty response body).");
    const bytes = await readProbeBytes(upstream.body);
    if (bytes.byteLength < 2 || bytes[0] !== 0x50 || bytes[1] !== 0x4b) throw new HttpError(502, "Source probe rejected (response does not begin with a ZIP header).");
    return json({ sourceId, healthy: true, latencyMs: Math.round(performance.now() - started), bytes: bytes.byteLength });
  } catch (error) {
    console.log(JSON.stringify({ sourceId, probe: "failed", error: safeError(error) }));
    return json({ sourceId, healthy: false });
  }
}

async function streamPackage(request: Request, env: Env): Promise<Response> {
  const claims = await authorize(request, env);
  const body = await readJson(request);
  if (!isShortString(body.sourceId) || !isShortString(body.filename)) throw new HttpError(400, "Invalid package request.");
  const source = await sourceById(env, body.sourceId, claims);
  try {
    await incrementSourceCount(env, source);
  } catch (error) {
    console.log(JSON.stringify({ transactionId: claims.id, sourceId: body.sourceId, audit: "source-count-update-failed", error: safeError(error) }));
  }
  // Audit availability must not prevent a verified source from serving a
  // package. The final success/failure report remains best-effort as well.
  try {
    await patchAudit(env, claims.auditId, { UpdateSource: safeName(source.UpdateSource) ?? "selected source" });
  } catch (error) {
    console.log(JSON.stringify({ transactionId: claims.id, audit: "source-update-failed", error: safeError(error) }));
  }
  const upstream = await fetchApproved(source.UpdateLink!, env);
  const contentType = upstream.headers.get("content-type")?.split(";", 1)[0].toLowerCase();
  if (!upstream.ok || !upstream.body || (contentType && !ZIP_CONTENT_TYPES.has(contentType))) throw new HttpError(502, "Selected source did not return a ZIP package.");
  const declaredLength = Number(upstream.headers.get("content-length") ?? "0");
  if (declaredLength > 1024 * 1024 * 1024) throw new HttpError(413, "Package exceeds the service size limit.");
  const headers = new Headers({ "Content-Type": "application/zip", "Content-Disposition": `attachment; filename="${safeFilename(body.filename)}"`, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  if (upstream.headers.has("content-length")) headers.set("Content-Length", upstream.headers.get("content-length")!);
  console.log(JSON.stringify({ transactionId: claims.id, sourceId: body.sourceId, stream: "started" }));
  // Forward natively: a JavaScript transform per chunk exhausts Worker CPU on large ZIPs.
  // Declared size is checked above; the plugin also enforces the size limit while reading.
  return new Response(upstream.body, { status: 200, headers });
}

async function reportResult(request: Request, env: Env, transactionId: string): Promise<Response> {
  const claims = await authorize(request, env);
  if (claims.id !== transactionId) throw new HttpError(403, "Transaction mismatch.");
  const body = await readJson(request);
  if (body.status !== "success" && body.status !== "failed") throw new HttpError(400, "Invalid update status.");
  await patchAudit(env, claims.auditId, { UpdateStatus: body.status, UpdateDate: new Date().toISOString() });
  return json({ ok: true });
}

async function findSources(env: Env, filename: string): Promise<SourceRow[]> {
  const tableId = await config(env, "nocodbtableid_Updateinfo");
  // The package filename is the release's stable source key. Keep the database
  // lookup independent of descriptive collection metadata, which may be edited
  // in NocoDB without changing the published package.
  const clauses = `(Filename,eq,${escapeWhere(filename)})`;
  const result = await nocodb(env, `/api/v2/tables/${encodeURIComponent(tableId)}/records?where=${encodeURIComponent(clauses)}&limit=100`);
  return Array.isArray(result.list) ? result.list as SourceRow[] : [];
}

async function sourceById(env: Env, sourceId: string, claims: TransactionClaims): Promise<SourceRow> {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(sourceId)) throw new HttpError(400, "Invalid source id.");
  const rows = (await findSources(env, claims.filename)).filter((row) => row.SourceId === sourceId);
  if (rows.length !== 1 || !isEnabled(rows[0]) || !isShortString(rows[0].UpdateLink)) throw new HttpError(404, "Update source is unavailable.");
  return rows[0];
}

async function incrementSourceCount(env: Env, source: SourceRow): Promise<void> {
  const id = source.Id ?? source.id;
  if (typeof id !== "string" && typeof id !== "number") throw new HttpError(502, "Update source record is missing its id.");
  const current = typeof source.UpdateCount === "number" ? source.UpdateCount : Number(source.UpdateCount ?? 0);
  const next = Number.isFinite(current) && current >= 0 ? Math.floor(current) + 1 : 1;
  const tableId = await config(env, "nocodbtableid_Updateinfo");
  await patchRecord(env, tableId, id, { UpdateCount: next });
}

async function createAudit(env: Env, fields: Record<string, unknown>): Promise<string | number> {
  const tableId = await config(env, "nocodbtableid_Update");
  const result = await nocodb(env, `/api/v2/tables/${encodeURIComponent(tableId)}/records`, { method: "POST", body: JSON.stringify(fields) });
  const record = Array.isArray(result) ? result[0] : result;
  const id = record?.Id ?? record?.id ?? record?.ID;
  if (typeof id !== "string" && typeof id !== "number") throw new HttpError(502, "Audit record could not be created.");
  return id;
}
async function patchAudit(env: Env, id: string | number, fields: Record<string, unknown>): Promise<void> {
  const tableId = await config(env, "nocodbtableid_Update");
  await patchRecord(env, tableId, id, fields);
}
async function patchRecord(env: Env, tableId: string, id: string | number, fields: Record<string, unknown>): Promise<void> {
  const numericId = Number(id);
  const recordId = Number.isSafeInteger(numericId) && String(numericId) === String(id) ? numericId : id;
  await nocodb(env, `/api/v2/tables/${encodeURIComponent(tableId)}/records`, { method: "PATCH", body: JSON.stringify({ Id: recordId, ...fields }) });
}
async function nocodb(env: Env, path: string, init: RequestInit = {}): Promise<Record<string, any>> {
  const token = await config(env, "nocodbapitoken");
  const response = await fetch(`${env.NOCODB_BASE_URL.replace(/\/$/, "")}${path}`, { ...init, headers: { "xc-token": token, "Content-Type": "application/json", ...(init.headers ?? {}) } });
  if (!response.ok) throw new HttpError(502, "Update service database is unavailable.");
  return response.json() as Promise<Record<string, any>>;
}
async function config(env: Env, key: string): Promise<string> { const value = await env.CONFIG.get(key); if (!value) throw new HttpError(500, "Update service configuration is incomplete."); return value; }

async function fetchApproved(link: string, env: Env, init: RequestInit = {}): Promise<Response> {
  let url: URL;
  try { url = new URL(link); } catch { throw new HttpError(502, "Source URL is invalid."); }
  if (url.protocol !== "https:") throw new HttpError(502, "Source URL must use HTTPS.");
  const hostname = url.hostname.toLowerCase();
  if (hostname === "drive.google.com" || hostname === "docs.google.com") {
    const fileId = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] || url.searchParams.get("id");
    if (!fileId) throw new HttpError(502, "Google Drive link is missing its file id.");
    url = new URL(`https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download&confirm=t`);
  }
  const microsoftShare = hostname === "1drv.ms" || hostname === "onedrive.live.com" || hostname.endsWith(".sharepoint.com");
  if (microsoftShare) {
    if (hostname === "onedrive.live.com" && url.pathname.toLowerCase() === "/embed") url.pathname = "/download";
    url.searchParams.delete("web");
    url.searchParams.set("download", "1");
  }
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
  try {
    const cookieHost = url.hostname.toLowerCase();
    const cookies = new Map<string, string>();
    for (let hop = 0; hop < 6; hop++) {
      const headers = new Headers(init.headers);
      if (microsoftShare && url.hostname.toLowerCase() === cookieHost && cookies.size) {
        headers.set("Cookie", [...cookies].map(([name, value]) => `${name}=${value}`).join("; "));
      }
      // Preserve the original object URL, including Alibaba OSS signatures.
      // Only Google Drive and Microsoft sharing URLs need rewriting.
      const downloadUrl = hop === 0 && !microsoftShare && hostname !== "drive.google.com" && hostname !== "docs.google.com" ? link : url.toString();
      const response = await fetch(downloadUrl, { ...init, headers, redirect: "manual", signal: controller.signal });
      const location = response.headers.get("Location");
      if (![301, 302, 303, 307, 308].includes(response.status) || !location) return response;
      try {
        if (hop === 5) throw new HttpError(502, "Source redirected too many times.");
        const next = new URL(location, url);
        if (next.protocol !== "https:") throw new HttpError(502, "Source redirect must use HTTPS.");
        if (microsoftShare && url.hostname.toLowerCase() === cookieHost) {
          for (const setCookie of response.headers.getSetCookie()) {
            const pair = setCookie.split(";", 1)[0].trim();
            const separator = pair.indexOf("=");
            const name = pair.slice(0, separator);
            if (separator > 0 && /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(name)) cookies.set(name, pair.slice(separator + 1));
          }
        }
        url = next;
      } finally { await response.body?.cancel(); }
    }
    throw new HttpError(502, "Source redirected too many times.");
  }
  finally { clearTimeout(timeout); }
}

async function authorize(request: Request, env: Env): Promise<TransactionClaims> {
  const id = request.headers.get("X-Update-Transaction");
  const authorization = request.headers.get("Authorization");
  if (!id || !authorization?.startsWith("Bearer ")) throw new HttpError(401, "Update transaction authorization is required.");
  const claims = await verifyClaims(authorization.slice(7), env.TRANSACTION_SECRET);
  if (claims.id !== id || claims.exp < Math.floor(Date.now() / 1000)) throw new HttpError(403, "Update transaction authorization expired.");
  return claims;
}
async function signClaims(claims: TransactionClaims, secret: string): Promise<string> { const data = b64url(JSON.stringify(claims)); return `${data}.${await hmac(data, secret)}`; }
async function verifyClaims(token: string, secret: string): Promise<TransactionClaims> {
  const [data, signature] = token.split("."); if (!data || !signature || !(await timingSafeEqual(signature, await hmac(data, secret)))) throw new HttpError(403, "Invalid update transaction authorization.");
  try { const parsed = JSON.parse(new TextDecoder().decode(fromB64url(data))) as TransactionClaims; if (!isShortString(parsed.id) || (typeof parsed.auditId !== "string" && typeof parsed.auditId !== "number") || typeof parsed.exp !== "number" || ![parsed.title, parsed.version, parsed.filename, parsed.language, parsed.series, parsed.edition].every(isShortString)) throw new Error(); return parsed; }
  catch { throw new HttpError(403, "Invalid update transaction authorization."); }
}
async function hmac(value: string, secret: string): Promise<string> { const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); return b64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)))); }
async function timingSafeEqual(a: string, b: string): Promise<boolean> { if (a.length !== b.length) return false; let value = 0; for (let i = 0; i < a.length; i++) value |= a.charCodeAt(i) ^ b.charCodeAt(i); return value === 0; }
function b64url(value: string | Uint8Array): string { const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value; let binary = ""; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function fromB64url(value: string): Uint8Array { const base64 = value.replace(/-/g, "+").replace(/_/g, "/"); const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")); return Uint8Array.from(binary, (character) => character.charCodeAt(0)); }
function json(value: unknown, status = 200): Response { return new Response(JSON.stringify(value), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } }); }
function cors(response: Response, request: Request, env: Env): Response { const origin = request.headers.get("Origin"); const allowed = (env.CORS_ORIGINS ?? "").split(",").map((item) => item.trim()); const headers = new Headers(response.headers); headers.set("X-Tbpedia-Worker-Version", WORKER_VERSION); if (origin && allowed.includes(origin)) headers.set("Access-Control-Allow-Origin", origin); headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Update-Transaction"); headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); headers.set("Vary", "Origin"); return new Response(response.body, { status: response.status, headers }); }
async function readJson(request: Request): Promise<Record<string, any>> { try { const value = await request.json(); if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(); return value as Record<string, any>; } catch { throw new HttpError(400, "Request body must be JSON."); } }
function isEnabled(row: SourceRow): boolean { return row.Enabled === true || row.Enabled === 1 || row.Enabled === "true"; }
function asBoolean(value: unknown): boolean { return value === true || value === 1 || value === "true"; }
function opaqueSourceId(row: SourceRow): string { if (!isShortString(row.SourceId) || !/^[A-Za-z0-9_-]{1,128}$/.test(row.SourceId)) throw new HttpError(502, "Source configuration is invalid."); return row.SourceId; }
function boundedInteger(value: unknown, minimum: number, maximum: number): number { const parsed = typeof value === "number" ? value : Number(value); return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, Math.round(parsed))) : minimum; }
function safeName(value: unknown): string | undefined { return isShortString(value) ? value.replace(/[\r\n]/g, " ").slice(0, 120) : undefined; }
function safeFilename(value: string): string { return value.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120) || "tbpedia-update.zip"; }
function escapeWhere(value: string): string { return value.replace(/[~(),]/g, "\\$&"); }
function isShortString(value: unknown): value is string { return typeof value === "string" && value.length > 0 && value.length <= 512; }
function safeError(error: unknown): string { return error instanceof HttpError ? error.message : "upstream error"; }
async function readProbeBytes(body: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = body.getReader(); const chunks: Uint8Array[] = []; let total = 0;
  try {
    while (total < MAX_PROBE_BYTES) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = value.byteLength > MAX_PROBE_BYTES - total ? value.slice(0, MAX_PROBE_BYTES - total) : value;
      chunks.push(chunk); total += chunk.byteLength;
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  const bytes = new Uint8Array(total); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return bytes;
}
class HttpError extends Error { constructor(readonly status: number, message: string) { super(message); } }
