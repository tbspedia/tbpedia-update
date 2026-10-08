import { PluginData } from "./types";

/** Preserve the starting release; do not mistake a later installed update for it. */
export function initializeBaseRelease(data: PluginData): NonNullable<PluginData["baseRelease"]> {
  if (data.baseRelease) return data.baseRelease;
  const legacy = data.installed.appliedReleaseIds
    .map((id) => ({ id, match: /^(\d{4})-(\d{1,2})-(\d{1,2})\.(\d+)$/.exec(id) }))
    .filter((entry) => entry.match !== null)
    .sort((a, b) => {
      for (let i = 1; i <= 4; i++) {
        const difference = Number(a.match![i]) - Number(b.match![i]);
        if (difference) return difference;
      }
      return 0;
    })[0];
  if (legacy) return { releaseVersion: `${legacy.match![1]}.${Number(legacy.match![2])}.${Number(legacy.match![3])}`, releaseId: legacy.id };
  if (data.installed.trackingVersion !== 2 && Object.keys(data.installed.ownedFiles).length === 0) {
    return { releaseVersion: data.installed.releaseVersion, releaseId: data.installed.releaseId };
  }
  return {};
}
