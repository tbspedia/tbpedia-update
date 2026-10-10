import { FileChange, InstalledState, ReleaseManifest } from "./types";

type LegacyFiles = Record<string, Array<string | FileChange>> | string[];

export function migrateOwnedFiles(value: LegacyFiles, installed: InstalledState, manifest?: ReleaseManifest): Record<string, FileChange[]> {
  const source = Array.isArray(value) ? { legacy: value } : value;
  const groups: Record<string, FileChange[]> = {};
  for (const [id, entries] of Object.entries(source)) {
    groups[id] = entries.map((entry) => typeof entry === "string" ? { path: entry, change: "+" } : { ...entry });
  }
  if (manifest) {
    for (const release of manifest.releases) {
      if (!installed.appliedReleaseIds.includes(release.releaseId) && installed.releaseId !== release.releaseId) continue;
      const known = new Set(release.files.map((file) => file.path));
      const recorded = new Map((groups[release.releaseId] ?? []).map((file) => [file.path, file]));
      groups[release.releaseId] = [...release.files.map((file) => ({ ...recorded.get(file.path), ...file })), ...(groups[release.releaseId] ?? []).filter((file) => !known.has(file.path))];
      if (groups.legacy) groups.legacy = groups.legacy.filter((file) => !known.has(file.path));
    }
    if (groups.legacy?.length === 0) delete groups.legacy;
  }
  return groups;
}

export function currentOwnedPaths(installed: InstalledState): Set<string> {
  const owned = new Set<string>();
  const order = [...new Set([...Object.keys(installed.ownedFiles).filter((id) => !installed.appliedReleaseIds.includes(id)), ...installed.appliedReleaseIds])];
  for (const id of order) {
    for (const file of installed.ownedFiles[id] ?? []) {
      if (file.change === "-") owned.delete(file.path);
      else owned.add(file.path);
    }
  }
  return owned;
}
