import { MANAGED_ROOTS, ReleaseEntry, ReleaseManifest } from "./types";
import { assertManagedPath } from "./path-policy";

const REQUIRED_STRING_FIELDS = ["title", "minimumPluginVersion", "minimumObsidianVersion"] as const;

export function parseAndValidateManifest(input: unknown): ReleaseManifest {
  if (!isRecord(input)) throw new Error("Release manifest must be a JSON object.");
  for (const forbidden of ["signature", "payload", "collectionKey", "sha256", "size", "downloadUrl", "url"]) {
    if (forbidden in input) throw new Error(`Manifest contains unsupported field: ${forbidden}.`);
  }
  if (input.schemaVersion !== 2 || input.product !== "Tbpedia-Distribute" || input.plugin !== "tbpedia-update") throw new Error("This is not a supported incremental Tbpedia release manifest.");
  if (input.channel !== "stable") throw new Error("Only the stable release channel is supported.");
  for (const field of REQUIRED_STRING_FIELDS) if (typeof input[field] !== "string" || !input[field].trim()) throw new Error(`Manifest field ${field} is invalid.`);
  if (!isRecord(input.collection) || !isCollectionPart(input.collection.language, "code") || !isCollectionPart(input.collection.series, "id") || !isCollectionPart(input.collection.edition, "id")) throw new Error("Collection identity is invalid.");
  const collection = input.collection as ReleaseManifest["collection"];
  const releaseKey = [collection.language.code, collection.series.id, collection.edition.id].join("-").toLowerCase();
  if (!Array.isArray(input.managedRoots) || !sameSet(input.managedRoots, [...MANAGED_ROOTS])) throw new Error("managedRoots does not match the approved boundary.");
  if (!Array.isArray(input.releases) || input.releases.length === 0) throw new Error("releases must be a non-empty array.");

  const existingPaths = new Set<string>();
  const releases = input.releases.map((entry) => {
    const release = parseRelease(entry, releaseKey, existingPaths);
    for (const file of release.files) {
      if (file.change === "-") existingPaths.delete(file.path);
      else existingPaths.add(file.path);
    }
    return release;
  });
  const ids = new Set<string>();
  for (let index = 0; index < releases.length; index += 1) {
    const release = releases[index];
    if (ids.has(release.releaseId)) throw new Error(`Duplicate releaseId: ${release.releaseId}.`);
    ids.add(release.releaseId);
    if (index > 0 && compareRelease(releases[index - 1], release) >= 0) throw new Error("releases must be in strictly increasing version and publication order.");
  }
  return { ...input, releases } as ReleaseManifest;
}

function parseRelease(input: unknown, expectedKey: string, existingPaths: Set<string>): ReleaseEntry {
  if (!isRecord(input)) throw new Error("Each release must be an object.");
  for (const field of ["releaseVersion", "releaseId", "publishedAt", "filename"] as const) if (typeof input[field] !== "string" || !input[field].trim()) throw new Error(`Release field ${field} is invalid.`);
  const version = parseReleaseVersion(input.releaseVersion);
  if (!version || version.key !== expectedKey) throw new Error(`releaseVersion must have the format ${expectedKey}-YYYY.M.D.`);
  const releaseId = parseReleaseId(input.releaseId);
  if (!releaseId || releaseId.key !== expectedKey) throw new Error(`releaseId must have the format ${expectedKey}-YYYY-M-D.sequence, for example ${expectedKey}-2026-10-1.1.`);
  if (releaseId.year !== version.year || releaseId.month !== version.month || releaseId.day !== version.day) throw new Error("releaseId date must match releaseVersion.");
  if (Number.isNaN(Date.parse(input.publishedAt))) throw new Error("publishedAt must be ISO-8601.");
  if (!Array.isArray(input.files) || !Array.isArray(input.deletions)) throw new Error("files and deletions must be arrays.");
  const files = input.files.map((entry) => {
    if (!isRecord(entry) || typeof entry.path !== "string") throw new Error("Each file entry needs a path.");
    const path = assertManagedPath(entry.path);
    const change = entry.change ?? (existingPaths.has(path) ? "~" : "+");
    if (change !== "+" && change !== "-" && change !== "~") throw new Error("File change must be +, -, or ~.");
    return { path, change };
  });
  const deletions = input.deletions.map((path) => {
    if (typeof path !== "string") throw new Error("Each deletion must be a path.");
    return assertManagedPath(path);
  });
  for (const path of deletions) {
    const file = files.find((entry) => entry.path === path);
    if (file && file.change !== "-") throw new Error("A deletion conflicts with a file write.");
    if (!file) files.push({ path, change: "-" });
  }
  const allPaths = files.map((file) => file.path);
  if (new Set(allPaths).size !== allPaths.length) throw new Error(`Release ${input.releaseId} contains duplicate or conflicting paths.`);
  if (!isRecord(input.releaseNotes) || typeof input.releaseNotes.summary !== "string" || !["added", "updated", "removed"].every((key) => typeof input.releaseNotes[key] === "number" && input.releaseNotes[key] >= 0)) throw new Error("releaseNotes is invalid.");
  return { releaseVersion: input.releaseVersion, releaseId: input.releaseId, publishedAt: input.publishedAt, filename: input.filename, files, deletions: files.filter((file) => file.change === "-").map((file) => file.path), releaseNotes: input.releaseNotes as ReleaseEntry["releaseNotes"] };
}

export function compareVersions(a: string, b: string): number {
  const parse = (value: string) => value.replace(/^v/, "").split(/[.+-]/).slice(0, 3).map((part) => Number.parseInt(part, 10) || 0);
  const left = parse(a); const right = parse(b);
  for (let index = 0; index < 3; index += 1) if (left[index] !== right[index]) return left[index] - right[index];
  return 0;
}
/** Compares readable collection release versions, while accepting legacy date-only stored versions. */
export function compareReleaseVersions(a: string, b: string): number {
  const left = parseReleaseVersion(a); const right = parseReleaseVersion(b);
  if (!left || !right) return compareVersions(a, b);
  return compareDates(left, right);
}
export function compareRelease(a: ReleaseEntry, b: ReleaseEntry): number {
  const version = compareReleaseVersions(a.releaseVersion, b.releaseVersion);
  if (version) return version;
  const sequence = parseReleaseId(a.releaseId)!.sequence - parseReleaseId(b.releaseId)!.sequence;
  return sequence || Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
}
function parseReleaseVersion(value: string): { key?: string; year: number; month: number; day: number } | undefined {
  const match = /^(?:([a-z0-9]+(?:-[a-z0-9]+)*)-)?(\d{4})\.(\d{1,2})\.(\d{1,2})$/.exec(value);
  return match && validDate(Number(match[2]), Number(match[3]), Number(match[4])) ? { key: match[1], year: Number(match[2]), month: Number(match[3]), day: Number(match[4]) } : undefined;
}
function parseReleaseId(value: string): { key?: string; year: number; month: number; day: number; sequence: number } | undefined {
  const match = /^(?:([a-z0-9]+(?:-[a-z0-9]+)*)-)?(\d{4})-(\d{1,2})-(\d{1,2})\.(\d+)$/.exec(value);
  if (!match) return undefined;
  const year = Number(match[2]); const month = Number(match[3]); const day = Number(match[4]); const sequence = Number(match[5]);
  return validDate(year, month, day) && Number.isSafeInteger(sequence) && sequence >= 1 ? { key: match[1], year, month, day, sequence } : undefined;
}
function compareDates(a: { year: number; month: number; day: number }, b: { year: number; month: number; day: number }): number { return a.year - b.year || a.month - b.month || a.day - b.day; }
function validDate(year: number, month: number, day: number): boolean { const date = new Date(Date.UTC(year, month - 1, day)); return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day; }
function isCollectionPart(value: unknown, identity: "code" | "id"): value is Record<string, string> { return isRecord(value) && typeof value[identity] === "string" && value[identity].trim().length > 0; }
function isRecord(value: unknown): value is Record<string, any> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function sameSet(values: unknown[], expected: string[]): boolean { return values.length === expected.length && new Set(values).size === values.length && values.every((value) => typeof value === "string" && expected.includes(value)); }
