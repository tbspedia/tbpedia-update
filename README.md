# tbpedia-update

An Obsidian plugin and Cloudflare Worker for installing approved incremental Tbpedia releases. Public release metadata comes only from the fixed GitHub `latest.json`; mirror links and NocoDB credentials remain in the Worker.

## Repository layout

- `src/` — Obsidian plugin source. `main.js` is the built plugin bundle and `manifest.json` is the Obsidian plugin manifest.
- `worker/` — Cloudflare Worker source and Wrangler configuration.
- `latest-manifest-template.xlsx` — authoring template for a public `latest.json`; do not put mirror URLs, hashes, signatures, or credentials into it.

## Build the plugin

Install a current Node.js LTS and pnpm, then run:

```powershell
pnpm install
pnpm run check
pnpm run build
```

Copy `main.js` and `manifest.json` to `.obsidian/plugins/tbpedia-update/` in a test vault, then enable **Tbpedia Update**. The plugin fetches only `https://raw.githubusercontent.com/tbspedia/tbpedia-update/main/latest.json`.

The plugin validates the collection tuple, exact approved managed roots, release compatibility, every archive path, archive/expanded-size limits, collisions, and the exact manifest file inventory. It creates a vault-local staging and backup transaction, refuses to overwrite unowned files, and restores backed-up files if applying the release fails.

## Incremental release history

`latest.json` now uses `schemaVersion: 2` and retains an ordered `releases` array. Each entry has its own ZIP, source rows in NocoDB, exact `files` inventory, explicit `deletions`, and release notes. A ZIP contains only that release's new or changed managed Markdown files; it is not a full vault snapshot.

For example, a vault recorded at `2026.9.30` receives the `2026.10.1` ZIP first and then the `2026.11.1` ZIP. Each release is downloaded, validated, backed up, committed, audited, and persisted separately. If the second release fails, the vault remains correctly installed through `2026.10.1`; the next run resumes with `2026.11.1`.

```json
{
  "schemaVersion": 2,
  "product": "Tbpedia-Distribute",
  "plugin": "tbpedia-update",
  "channel": "stable",
  "title": "真佛百科閱讀系列標準版本",
  "collection": {
    "language": { "code": "zh-Hant", "name": "繁體中文", "folder": "繁體中文" },
    "series": { "id": "true-buddha-encyclopedia-reading", "name": "真佛百科閱讀系列", "folder": "真佛百科閱讀系列" },
    "edition": { "id": "standard", "name": "標準版本", "folder": "標準版本" },
    "installRoot": "繁體中文/真佛百科閱讀系列/標準版本"
  },
  "minimumPluginVersion": "1.0.0",
  "minimumObsidianVersion": "1.6.0",
  "managedRoots": ["00 說明", "01 文集部", "02 開示部", "03 經藏部", "04 頌與戒律", "05 傳法部", "06 密法儀軌", "07 佛語典藏", "08 其他類別", "09 蓮香上師", "10 真佛宗", "20 專題", "50 列表", "60 導讀", "70 背景資料", "90 幫助", "98 下載資料", "99 Setting"],
  "releases": [
    { "releaseVersion": "2026.10.1", "releaseId": "2026-10-1.1", "publishedAt": "2026-10-01T08:00:00Z", "filename": "tbpedia-2026.10.1.zip", "files": [{ "path": "繁體中文/真佛百科閱讀系列/標準版本/01 文集部/new-note.md" }], "deletions": [], "releaseNotes": { "summary": "October additions", "added": 1, "updated": 0, "removed": 0 } },
    { "releaseVersion": "2026.11.1", "releaseId": "2026-11-1.1", "publishedAt": "2026-11-01T08:00:00Z", "filename": "tbpedia-2026.11.1.zip", "files": [{ "path": "繁體中文/真佛百科閱讀系列/標準版本/01 文集部/another-note.md" }], "deletions": [], "releaseNotes": { "summary": "November additions", "added": 1, "updated": 0, "removed": 0 } }
  ]
}
```

## Configure and deploy the Worker

1. Put the existing Cloudflare KV namespace id in `worker/wrangler.toml` as the `CONFIG` binding. The production route is `cfupdate.tbpedia.org/*`.
2. Put these values in `CONFIG` (they are intentionally not source code): `nocodbtableid_Updateinfo`, `nocodbtableid_Update`, and `nocodbapitoken`.
3. Set the Worker secrets (not `[vars]`):

```powershell
pnpm exec wrangler secret put NOCODB_BASE_URL --config worker/wrangler.toml
pnpm exec wrangler secret put TRANSACTION_SECRET --config worker/wrangler.toml
```

`TRANSACTION_SECRET` must be a random value of at least 32 bytes. Set `UPSTREAM_ALLOWLIST` in `worker/wrangler.toml` to the exact, comma-separated hostnames of approved R2/CDN/mirror providers. Do not include URLs, query strings, or wildcards.

4. Validate and deploy:

```powershell
pnpm run worker:check
pnpm run worker:dev
pnpm run worker:deploy
```

The Worker offers opaque source discovery, bounded source probes, package streaming, and transaction audit endpoints. It signs short-lived transaction tokens, matches every requested source to the same collection/title/version/filename as the transaction, blocks redirects and non-HTTPS/unapproved hosts, and never returns private `UpdateLink` values or NocoDB configuration.

## NocoDB requirements

`Updateinfo` needs the design-spec fields, especially `Language`, `Series`, `Edition`, `Title`, `Version`, `Filename`, `UpdateSource`, `UpdateLink`, `SourceId`, `Enabled`, `Priority`, `Regions`, and `SupportsRange`. `SourceId` must be unique and URL-safe (`A–Z`, `a–z`, `0–9`, `_`, `-`). The `Update` audit table uses the fields defined in the specification; the Worker records `initiated`, then `success` or `failed`.

Before publishing a release, upload its incremental ZIP and enable its matching private `Updateinfo` rows first. Use `releaseId` as `YYYY-M-D.sequence` (for example, `2026-10-1.2` is the second 1 October release). Append the release to `latest.json`; never alter or reorder a published entry. Publish the manifest only after a canary update succeeds.
