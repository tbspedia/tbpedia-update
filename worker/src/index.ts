interface Env {
  CONFIG: KVNamespace;
  NOCODB_BASE_URL: string;
  TRANSACTION_SECRET: string;
  UPSTREAM_ALLOWLIST: string;
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
}

const ZIP_CONTENT_TYPES = new Set(["application/zip", "application/x-zip-compressed", "application/octet-stream"]);
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
  const rows = await findSources(env, params);
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
    if (!upstream.ok || (contentType && !ZIP_CONTENT_TYPES.has(contentType)) || !upstream.body) throw new HttpError(502, "Source probe rejected.");
    const bytes = new Uint8Array(await upstream.arrayBuffer());
    if (bytes.byteLength === 0 || bytes.byteLength > MAX_PROBE_BYTES || bytes[0] !== 0x50 || bytes[1] !== 0x4b) throw new HttpError(502, "Source probe rejected.");
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
  await patchAudit(env, claims.auditId, { UpdateSource: safeName(source.UpdateSource) ?? "selected source" });
  const upstream = await fetchApproved(source.UpdateLink!, env);
  const contentType = upstream.headers.get("content-type")?.split(";", 1)[0].toLowerCase();
  if (!upstream.ok || !upstream.body || (contentType && !ZIP_CONTENT_TYPES.has(contentType))) throw new HttpError(502, "Selected source did not return a ZIP package.");
  const declaredLength = Number(upstream.headers.get("content-length") ?? "0");
  if (declaredLength > 1024 * 1024 * 1024) throw new HttpError(413, "Package exceeds the service size limit.");
  const headers = new Headers({ "Content-Type": "application/zip", "Content-Disposition": `attachment; filename="${safeFilename(body.filename)}"`, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  if (upstream.headers.has("content-length")) headers.set("Content-Length", upstream.headers.get("content-length")!);
  console.log(JSON.stringify({ transactionId: claims.id, sourceId: body.sourceId, stream: "started" }));
  return new Response(limitStream(upstream.body, 1024 * 1024 * 1024), { status: 200, headers });
}

async function reportResult(request: Request, env: Env, transactionId: string): Promise<Response> {
  const claims = await authorize(request, env);
  if (claims.id !== transactionId) throw new HttpError(403, "Transaction mismatch.");
  const body = await readJson(request);
  if (body.status !== "success" && body.status !== "failed") throw new HttpError(400, "Invalid update status.");
  await patchAudit(env, claims.auditId, { UpdateStatus: body.status, UpdateDate: new Date().toISOString() });
  return json({ ok: true });
}

async function findSources(env: Env, query: Record<string, string>): Promise<SourceRow[]> {
  const tableId = await config(env, "nocodbtableid_Updateinfo");
  const clauses = [["Language", query.language], ["Series", query.series], ["Edition", query.edition], ["Title", query.title], ["Version", query.version], ["Filename", query.filename]]
    .map(([field, value]) => `(${field},eq,${escapeWhere(value)})`).join("~and");
  const result = await nocodb(env, `/api/v2/tables/${encodeURIComponent(tableId)}/records?where=${encodeURIComponent(clauses)}&limit=100`);
  return Array.isArray(result.list) ? result.list as SourceRow[] : [];
}

async function sourceById(env: Env, sourceId: string, claims: TransactionClaims): Promise<SourceRow> {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(sourceId)) throw new HttpError(400, "Invalid source id.");
  const tableId = await config(env, "nocodbtableid_Updateinfo");
  const clauses = [["SourceId", sourceId], ["Language", claims.language], ["Series", claims.series], ["Edition", claims.edition], ["Title", claims.title], ["Version", claims.version], ["Filename", claims.filename]]
    .map(([field, value]) => `(${field},eq,${escapeWhere(value)})`).join("~and");
  const result = await nocodb(env, `/api/v2/tables/${encodeURIComponent(tableId)}/records?where=${encodeURIComponent(clauses)}&limit=2`);
  const rows = Array.isArray(result.list) ? result.list as SourceRow[] : [];
  if (rows.length !== 1 || !isEnabled(rows[0]) || !isShortString(rows[0].UpdateLink)) throw new HttpError(404, "Update source is unavailable.");
  return rows[0];
}

async function createAudit(env: Env, fields: Record<string, unknown>): Promise<string | number> {
  const tableId = await config(env, "nocodbtableid_Update");
  const result = await nocodb(env, `/api/v2/tables/${encodeURIComponent(tableId)}/records`, { method: "POST", body: JSON.stringify(fields) });
  const id = result.Id ?? result.id;
  if (typeof id !== "string" && typeof id !== "number") throw new HttpError(502, "Audit record could not be created.");
  return id;
}
async function patchAudit(env: Env, id: string | number, fields: Record<string, unknown>): Promise<void> {
  const tableId = await config(env, "nocodbtableid_Update");
  await nocodb(env, `/api/v2/tables/${encodeURIComponent(tableId)}/records/${encodeURIComponent(String(id))}`, { method: "PATCH", body: JSON.stringify(fields) });
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
  const allowed = env.UPSTREAM_ALLOWLIST.split(",").map((host) => host.trim().toLowerCase()).filter(Boolean);
  if (url.protocol !== "https:" || !allowed.includes(url.hostname.toLowerCase())) throw new HttpError(502, "Source is not approved.");
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
  try { return await fetch(url, { ...init, redirect: "manual", signal: controller.signal }); }
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
function cors(response: Response, request: Request, env: Env): Response { const origin = request.headers.get("Origin"); const allowed = (env.CORS_ORIGINS ?? "").split(",").map((item) => item.trim()); const headers = new Headers(response.headers); if (origin && allowed.includes(origin)) headers.set("Access-Control-Allow-Origin", origin); headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Update-Transaction"); headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); headers.set("Vary", "Origin"); return new Response(response.body, { status: response.status, headers }); }
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
function limitStream(body: ReadableStream<Uint8Array>, maximum: number): ReadableStream<Uint8Array> {
  let total = 0;
  return body.pipeThrough(new TransformStream({ transform(chunk, controller) { total += chunk.byteLength; if (total > maximum) { controller.error(new Error("Source response exceeded the service size limit.")); return; } controller.enqueue(chunk); } }));
}
class HttpError extends Error { constructor(readonly status: number, message: string) { super(message); } }
