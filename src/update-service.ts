import JSZip from "jszip";
import { App, DataAdapter, Notice, Platform, requestUrl } from "obsidian";
import { compareReleaseVersions, compareVersions, parseAndValidateManifest } from "./manifest";
import { assertManagedPath, ensureNoPathConflicts } from "./path-policy";
import { currentOwnedPaths, migrateOwnedFiles } from "./ownership";
import { MANIFEST_BASE_URL, PluginData, ProbeResult, ReleaseEntry, ReleaseManifest, Source, SupportedLanguage, UpdateBatch, UpdatePlan, UpdateTransaction, WORKER_URL } from "./types";

const STAGING_DIR = ".obsidian/plugins/tbpedia-update/.staging";
const MAX_ARCHIVE_BYTES = 1024 * 1024 * 1024;
const MAX_FILES = 30_000;
const MAX_UNCOMPRESSED_BYTES = 4 * 1024 * 1024 * 1024;

export type OverwriteDecision = "overwrite" | "overwrite-all" | "cancel";
export type ConfirmOverwrite = (path: string) => Promise<OverwriteDecision>;

export class UpdateService {
  constructor(
    private readonly app: App,
    private readonly pluginVersion: string,
    private readonly getData: () => PluginData,
    private readonly saveData: (data: PluginData) => Promise<void>,
  ) {}

  async check(): Promise<UpdateBatch | null> {
    const language = this.getData().languageCode;
    if (!language) throw new Error("Choose this vault’s Tbpedia language in the plugin settings first.");
    const edition = this.getData().editionId;
    const manifest = await this.fetchManifest(language, this.getData().seriesId, edition);
    this.assertSelectedCollection(manifest);
    this.assertCompatible(manifest);
    const data = this.getData();
    await this.saveData({ ...data, seriesId: manifest.collection.series.id, editionId: manifest.collection.edition.id,
      installed: { ...data.installed, ownedFiles: migrateOwnedFiles(data.installed.ownedFiles, data.installed, manifest) } });
    const releases = this.missingReleases(manifest);
    return releases.length ? { manifest, releases } : null;
  }

  async install(batch: UpdateBatch, progress: (message: string) => void, confirmOverwrite?: ConfirmOverwrite): Promise<void> {
    this.assertSelectedCollection(batch.manifest);
    this.assertCompatible(batch.manifest);
    // Approval lasts only for this installation, including subsequent releases.
    let overwriteAll = false;
    const approveOverwrite: ConfirmOverwrite = async (path) => {
      if (overwriteAll) return "overwrite";
      const decision = await confirmOverwrite?.(path) ?? "cancel";
      if (decision === "overwrite-all") overwriteAll = true;
      return decision;
    };
    for (let index = 0; index < batch.releases.length; index += 1) {
      this.assertSelectedCollection(batch.manifest);
      const release = batch.releases[index];
      progress(`Release ${index + 1} of ${batch.releases.length}: ${release.releaseVersion}`);
      await this.installRelease(batch.manifest, release, progress, approveOverwrite);
    }
    new Notice(`Tbpedia updated through ${batch.releases.at(-1)!.releaseVersion}.`);
  }

  private async installRelease(manifest: ReleaseManifest, release: ReleaseEntry, progress: (message: string) => void, confirmOverwrite: ConfirmOverwrite): Promise<void> {
    let transaction: UpdateTransaction | undefined;
    let committed = false;
    try {
      progress("Creating update transaction…");
      transaction = await this.createTransaction(manifest, release);
      progress("Discovering update sources…");
      const sources = await this.getSources(manifest, release, transaction);
      if (!sources.length) throw new Error("No enabled update source is available.");
      const ranked = await this.rankSources(sources, transaction, progress);
      if (!ranked.length) throw new Error("All update sources failed their health check.");

      let archive: ArrayBuffer | undefined;
      let lastError: unknown;
      for (const source of ranked) {
        try {
          progress(`Downloading from ${source.name}…`);
          archive = await this.downloadPackage(source, transaction, release.filename);
          break;
        } catch (error) { lastError = error; }
      }
      if (!archive) throw lastError instanceof Error ? lastError : new Error("All update sources failed.");

      progress("Validating release archive…");
      const stagingPath = `${STAGING_DIR}/${transaction.id}/package.zip`;
      await writeBinary(this.app.vault.adapter, stagingPath, archive);
      archive = await this.app.vault.adapter.readBinary(stagingPath);
      const plan = await this.validateArchive(archive, manifest, release);
      progress("Applying managed files…");
      await this.apply(plan, archive, progress, confirmOverwrite);
      committed = true;
      try { await this.report(transaction, "success"); }
      catch { new Notice("Tbpedia was updated, but the service could not record the success audit."); }
    } catch (error) {
      if (transaction && !committed) await this.report(transaction, "failed").catch(() => undefined);
      throw error;
    } finally {
      if (transaction) await removeTree(this.app.vault.adapter, `${STAGING_DIR}/${transaction.id}`).catch(() => undefined);
    }
  }

  private missingReleases(manifest: ReleaseManifest): ReleaseEntry[] {
    const installed = this.getData().installed;
    const installedIndex = installed.releaseId ? manifest.releases.findIndex((release) => release.releaseId === installed.releaseId) : -1;
    if (installedIndex >= 0) return manifest.releases.slice(installedIndex + 1);
    if (!installed.releaseVersion) return manifest.releases;
    const key = [manifest.collection.language.code, manifest.collection.series.id, manifest.collection.edition.id].join("-").toLowerCase();
    if (!installed.releaseVersion.startsWith(`${key}-`) && !/^\d{4}\./.test(installed.releaseVersion)) {
      return manifest.releases.filter((release) => !installed.appliedReleaseIds.includes(release.releaseId));
    }
    return manifest.releases.filter((release) => compareReleaseVersions(release.releaseVersion, installed.releaseVersion!) > 0);
  }

  private async fetchManifest(language: SupportedLanguage, series: string, edition: string): Promise<ReleaseManifest> {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(series)) throw new Error("The configured Tbpedia series ID is invalid.");
    if (edition !== "standard" && edition !== "advanced") throw new Error("Choose a supported Tbpedia edition in the plugin settings.");
    const editionPath = edition === "advanced" ? "/advanced" : "";
    const response = await requestUrl({ url: `${MANIFEST_BASE_URL}/${language.toLowerCase()}/${series}${editionPath}/latest.json`, method: "GET", throw: false });
    if (response.status !== 200) throw new Error(`Could not retrieve release metadata (HTTP ${response.status}).`);
    let json: unknown;
    try { json = response.json; } catch { throw new Error("Release metadata is not valid JSON."); }
    return parseAndValidateManifest(json);
  }

  private assertSelectedCollection(manifest: ReleaseManifest): void {
    const data = this.getData();
    if (manifest.collection.language.code !== data.languageCode || manifest.collection.series.id !== data.seriesId || manifest.collection.edition.id !== data.editionId) {
      throw new Error("The release manifest does not match the selected language, series, and edition. Check for updates again after changing settings.");
    }
  }

  private assertCompatible(manifest: ReleaseManifest): void {
    if (compareVersions(this.pluginVersion, manifest.minimumPluginVersion) < 0) throw new Error(`This release requires plugin ${manifest.minimumPluginVersion} or newer.`);
    const appVersion = this.appVersion();
    // Obsidian does not expose a stable, typed version property to every plugin
    // runtime. A missing value must not be interpreted as version 0.0.0.
    if (appVersion && compareVersions(appVersion, manifest.minimumObsidianVersion) < 0) throw new Error(`This release requires Obsidian ${manifest.minimumObsidianVersion} or newer.`);
  }

  private async createTransaction(manifest: ReleaseManifest, release: ReleaseEntry): Promise<UpdateTransaction> {
    const response = await this.api("/updates/transactions", "POST", {
      title: manifest.title, version: release.releaseVersion, filename: release.filename, language: manifest.collection.language.code,
      series: manifest.collection.series.id, edition: manifest.collection.edition.id,
      device_type: Platform.isMobile ? "mobile" : "desktop", os: navigator.platform,
      client_version: `${this.appVersion() ?? "unknown"}; plugin/${this.pluginVersion}`, user_agent: navigator.userAgent,
    });
    if (typeof response.id !== "string" || typeof response.token !== "string") throw new Error("Update service returned an invalid transaction.");
    return { id: response.id, token: response.token };
  }

  private async getSources(manifest: ReleaseManifest, release: ReleaseEntry, transaction: UpdateTransaction): Promise<Source[]> {
    const query = new URLSearchParams({ language: manifest.collection.language.code, series: manifest.collection.series.id, edition: manifest.collection.edition.id, title: manifest.title, version: release.releaseVersion, filename: release.filename });
    const response = await this.api(`/updates/sources?${query}`, "GET", undefined, transaction);
    if (!Array.isArray(response.sources)) throw new Error("Update service returned an invalid source list.");
    return response.sources.filter(isSource);
  }

  private async rankSources(sources: Source[], transaction: UpdateTransaction, progress: (message: string) => void): Promise<Source[]> {
    progress("Testing update sources…");
    const probes = await Promise.all(sources.slice(0, 8).map(async (source) => ({ source, result: await this.probe(source, transaction) })));
    return probes
      .filter((item): item is { source: Source; result: ProbeResult } => item.result.healthy && typeof item.result.latencyMs === "number")
      .sort((a, b) => score(a.source, a.result) - score(b.source, b.result))
      .map((item) => item.source);
  }

  private async probe(source: Source, transaction: UpdateTransaction): Promise<ProbeResult> {
    try {
      const response = await this.api(`/updates/sources/${encodeURIComponent(source.sourceId)}/probe`, "POST", {}, transaction);
      return { sourceId: source.sourceId, healthy: response.healthy === true, latencyMs: asNumber(response.latencyMs), bytes: asNumber(response.bytes), error: asString(response.error) };
    } catch { return { sourceId: source.sourceId, healthy: false }; }
  }

  private async downloadPackage(source: Source, transaction: UpdateTransaction, filename: string): Promise<ArrayBuffer> {
    const response = await fetch(`${WORKER_URL}/updates/package`, {
      method: "POST", headers: { "Content-Type": "application/json", ...authHeaders(transaction) },
      body: JSON.stringify({ sourceId: source.sourceId, filename }),
    });
    if (!response.ok || !response.body) throw new Error(`Download failed from ${source.name} (HTTP ${response.status}).`);
    const reader = response.body.getReader(); const chunks: Uint8Array[] = []; let total = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_ARCHIVE_BYTES) { await reader.cancel(); throw new Error("Release archive exceeds the configured size limit."); }
      chunks.push(value);
    }
    const archive = new Uint8Array(total); let offset = 0;
    for (const chunk of chunks) { archive.set(chunk, offset); offset += chunk.byteLength; }
    return archive.buffer;
  }

  private async validateArchive(archive: ArrayBuffer, manifest: ReleaseManifest, release: ReleaseEntry): Promise<UpdatePlan> {
    const zip = await JSZip.loadAsync(archive, { createFolders: false, checkCRC32: false });
    const expected = new Set(release.files.filter((file) => file.change !== "-").map((file) => file.path));
    const actual: string[] = []; let totalUncompressed = 0;
    for (const entry of Object.values(zip.files)) {
      const entryName = entry.dir ? entry.name.replace(/\/$/, "") : entry.name;
      if (entryName) assertManagedPath(entryName);
      if (entry.dir) continue;
      if (actual.length >= MAX_FILES) throw new Error("Release archive has too many files.");
      const path = assertManagedPath(entry.name);
      actual.push(path);
      const size = zipEntrySize(entry);
      if (size === undefined) throw new Error("Release archive has an entry with no size metadata.");
      totalUncompressed += size;
      if (totalUncompressed > MAX_UNCOMPRESSED_BYTES) throw new Error("Release archive exceeds the configured extracted-size limit.");
    }
    if (new Set(actual).size !== actual.length) throw new Error("Release archive contains colliding paths.");
    ensureNoPathConflicts(actual);
    if (actual.length !== expected.size || actual.some((path) => !expected.has(path))) throw new Error("Release archive does not exactly match the manifest inventory.");
    return { manifest, release, writes: actual, deletions: release.deletions };
  }

  private async apply(plan: UpdatePlan, archive: ArrayBuffer, progress: (message: string) => void, confirmOverwrite: ConfirmOverwrite): Promise<void> {
    const adapter = this.app.vault.adapter;
    const previous = this.getData().installed;
    const owned = currentOwnedPaths(previous);
    // Each release is incremental: only explicit deletions are removed. Earlier
    // releases remain installed after their ZIP has committed successfully.
    const deletions = [...new Set(plan.deletions)];
    for (const path of plan.writes) {
      await assertNoReparsePoints(this.app, path);
      if (await adapter.exists(path)) {
        if ((await adapter.stat(path))?.type === "folder") throw new Error(`Refusing to replace a local folder: ${path}`);
        if (!owned.has(path)) {
          progress(`Waiting for overwrite approval: ${path}`);
          if (await confirmOverwrite(path) === "cancel") throw new Error("Update cancelled. No files in this release were changed; earlier completed releases remain installed.");
        }
      }
    }
    for (const path of deletions) {
      await assertNoReparsePoints(this.app, path);
      if (!owned.has(path)) throw new Error(`Refusing to delete a file not owned by the prior release: ${path}`);
    }

    const transactionDir = `${STAGING_DIR}/${crypto.randomUUID()}`;
    const backupDir = `${transactionDir}/backup`;
    const journalPath = `${transactionDir}/transaction.json`;
    await mkdirp(adapter, backupDir);
    const targets = [...new Set([...plan.writes, ...deletions])];
    const originals: Array<{ path: string; existed: boolean }> = [];
    for (const path of targets) {
      const existed = await adapter.exists(path); originals.push({ path, existed });
      if (existed) await writeBinary(adapter, `${backupDir}/${encodeURIComponent(path)}`, await adapter.readBinary(path));
    }
    await adapter.write(journalPath, JSON.stringify({ originals }));

    try {
      const zip = await JSZip.loadAsync(archive, { createFolders: false, checkCRC32: false });
      for (const path of deletions) if (await adapter.exists(path)) await adapter.remove(path);
      for (const path of plan.writes) {
        progress(`Writing ${path}…`);
        await mkdirp(adapter, parent(path));
        const entry = zip.file(path);
        if (!entry) throw new Error(`Archive entry disappeared: ${path}`);
        await writeBinary(adapter, path, await entry.async("uint8array"));
      }
      const nextOwned = { ...previous.ownedFiles, [plan.release.releaseId]: plan.release.files.map((file) => ({ ...file })) };
      await this.saveData({ ...this.getData(), installed: {
        releaseVersion: plan.release.releaseVersion,
        releaseId: plan.release.releaseId,
        appliedReleaseIds: [...new Set([...(previous.appliedReleaseIds ?? []), plan.release.releaseId])],
        ownedFiles: nextOwned,
      } });
      await removeTree(adapter, transactionDir);
    } catch (error) {
      await this.rollback(adapter, originals, backupDir);
      throw error;
    }
  }

  private async rollback(adapter: DataAdapter, originals: Array<{ path: string; existed: boolean }>, backupDir: string): Promise<void> {
    for (const original of originals.reverse()) {
      if (original.existed) await writeBinary(adapter, original.path, await adapter.readBinary(`${backupDir}/${encodeURIComponent(original.path)}`));
      else if (await adapter.exists(original.path)) await adapter.remove(original.path);
    }
  }

  private async report(transaction: UpdateTransaction, status: "success" | "failed"): Promise<void> {
    await this.api(`/updates/transactions/${encodeURIComponent(transaction.id)}/result`, "POST", { status }, transaction);
  }

  private async api(path: string, method: "GET" | "POST", body?: object, transaction?: UpdateTransaction): Promise<Record<string, unknown>> {
    const response = await fetch(`${WORKER_URL}${path}`, { method, headers: { ...(body ? { "Content-Type": "application/json" } : {}), ...(transaction ? authHeaders(transaction) : {}) }, body: body ? JSON.stringify(body) : undefined });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(typeof json.error === "string" ? json.error : `Update service request failed (HTTP ${response.status}).`);
    return json as Record<string, unknown>;
  }

  private appVersion(): string | undefined {
    const app = this.app as unknown as { version?: unknown; appVersion?: unknown; vault: { getConfig?: (key: string) => unknown } };
    const globalApp = (globalThis as unknown as { app?: { version?: unknown; appVersion?: unknown } }).app;
    const candidates = [app.version, app.appVersion, globalApp?.version, globalApp?.appVersion, app.vault.getConfig?.("appVersion")];
    return candidates.find((value): value is string => typeof value === "string" && /^\d+\.\d+\.\d+/.test(value));
  }
}

function authHeaders(transaction: UpdateTransaction): Record<string, string> { return { "X-Update-Transaction": transaction.id, "Authorization": `Bearer ${transaction.token}` }; }
function isSource(value: unknown): value is Source { return typeof value === "object" && value !== null && typeof (value as Source).sourceId === "string" && typeof (value as Source).name === "string" && typeof (value as Source).priority === "number" && typeof (value as Source).supportsRange === "boolean"; }
function score(source: Source, probe: ProbeResult): number { return (probe.latencyMs ?? 60_000) + source.priority * 25 - (probe.bytes ?? 0) / 4096; }
function asNumber(value: unknown): number | undefined { return typeof value === "number" && Number.isFinite(value) ? value : undefined; }
function asString(value: unknown): string | undefined { return typeof value === "string" ? value : undefined; }
function zipEntrySize(entry: JSZip.JSZipObject): number | undefined {
  const size = (entry as unknown as { _data?: { uncompressedSize?: unknown } })._data?.uncompressedSize;
  return typeof size === "number" && Number.isSafeInteger(size) && size >= 0 ? size : undefined;
}
function parent(path: string): string { const index = path.lastIndexOf("/"); return index === -1 ? "" : path.slice(0, index); }
async function mkdirp(adapter: DataAdapter, path: string): Promise<void> {
  if (!path) return;
  let current = "";
  for (const segment of path.split("/")) {
    current = current ? `${current}/${segment}` : segment;
    if (!(await adapter.exists(current))) await adapter.mkdir(current);
  }
}
async function writeBinary(adapter: DataAdapter, path: string, data: ArrayBuffer | Uint8Array): Promise<void> { const copy = new Uint8Array(data instanceof Uint8Array ? data : new Uint8Array(data)); await mkdirp(adapter, parent(path)); await adapter.writeBinary(path, copy.buffer); }
async function removeTree(adapter: DataAdapter, path: string): Promise<void> { if (await adapter.exists(path)) await adapter.rmdir(path, true); }
async function assertNoReparsePoints(app: App, vaultPath: string): Promise<void> {
  const basePath = (app.vault.adapter as unknown as { getBasePath?: () => string }).getBasePath?.();
  const requireFn = (globalThis as unknown as { require?: (name: string) => { lstat: (path: string) => Promise<{ isSymbolicLink: () => boolean }> } }).require;
  if (!basePath || !requireFn) return;
  const fs = requireFn("fs/promises");
  let current = basePath;
  for (const segment of vaultPath.split("/")) {
    current = `${current}/${segment}`;
    try {
      if ((await fs.lstat(current)).isSymbolicLink()) throw new Error(`Refusing to traverse a link or reparse point: ${vaultPath}`);
    } catch (error) {
      if ((error as { code?: string }).code !== "ENOENT") throw error;
    }
  }
}
