export const MANIFEST_BASE_URL = "https://raw.githubusercontent.com/tbspedia/tbpedia-update/main/manifests";
export const WORKER_URL = "https://cfupdate.tbpedia.org";

export const SUPPORTED_LANGUAGES = ["en", "ja", "fr", "es", "de", "nl", "sv", "ko", "zh-TW", "zh-CN", "vi", "id", "th", "bo"] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const MANAGED_ROOTS = [
  "00 說明", "01 文集部", "02 開示部", "03 經藏部", "04 頌與戒律",
  "05 傳法部", "06 密法儀軌", "07 佛語典藏", "08 其他類別", "09 蓮香上師",
  "10 真佛宗", "20 專題", "50 列表", "60 導讀", "70 背景資料", "90 幫助",
  "98 下載資料", "99 Setting"
] as const;

export interface ReleaseEntry {
  releaseVersion: string;
  releaseId: string;
  publishedAt: string;
  filename: string;
  files: Array<{ path: string }>;
  deletions: string[];
  releaseNotes: { summary: string; added: number; updated: number; removed: number };
}

export interface ReleaseManifest {
  schemaVersion: 2;
  product: "Tbpedia-Distribute";
  plugin: "tbpedia-update";
  channel: "stable";
  title: string;
  collection: {
    language: { code: string; name: string; folder: string };
    series: { id: string; name: string; folder: string };
    edition: { id: string; name: string; folder: string };
    installRoot: string;
  };
  minimumPluginVersion: string;
  minimumObsidianVersion: string;
  managedRoots: string[];
  releases: ReleaseEntry[];
}

export interface InstalledState {
  releaseVersion?: string;
  releaseId?: string;
  appliedReleaseIds: string[];
  ownedFiles: string[];
}

export interface PluginData {
  languageCode?: SupportedLanguage;
  installed: InstalledState;
}

export interface Source {
  sourceId: string;
  name: string;
  region?: string;
  priority: number;
  supportsRange: boolean;
}

export interface UpdateTransaction {
  id: string;
  token: string;
}

export interface ProbeResult {
  sourceId: string;
  healthy: boolean;
  latencyMs?: number;
  bytes?: number;
  error?: string;
}

export interface UpdatePlan {
  manifest: ReleaseManifest;
  release: ReleaseEntry;
  writes: string[];
  deletions: string[];
}

export interface UpdateBatch {
  manifest: ReleaseManifest;
  releases: ReleaseEntry[];
}
