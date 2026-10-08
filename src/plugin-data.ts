import { PluginData } from "./types";
import { initializeBaseRelease } from "./base-release";
import { migrateOwnedFiles } from "./ownership";

/** Fresh installations require the vault owner to configure the content identity. */
export function initializePluginData(saved?: (Partial<PluginData> & { Collection?: string }) | null): PluginData {
  const { Collection: legacyVersion, ...existing } = saved ?? {};
  const data: PluginData = {
    languageCode: "",
    seriesId: "",
    editionId: "",
    tbpedia: "V1",
    checkForUpdatesOnStartup: true,
    ...existing,
    installed: { ownedFiles: {}, appliedReleaseIds: [], ...existing.installed },
  };
  data.tbpedia = existing.tbpedia ?? legacyVersion ?? "V1";
  data.installed.ownedFiles = migrateOwnedFiles(data.installed.ownedFiles, data.installed);
  data.baseRelease = saved == null || Object.keys(saved).length === 0
    ? { releaseVersion: "2026.9.30", releaseId: "2026-9-30.1" }
    : initializeBaseRelease(data);
  const { languageCode, seriesId, editionId, tbpedia, baseRelease, checkForUpdatesOnStartup, installed, ...rest } = data;
  return { languageCode: languageCode ?? "", seriesId, editionId, tbpedia, baseRelease,
    checkForUpdatesOnStartup: checkForUpdatesOnStartup ?? true, installed, ...rest };
}
