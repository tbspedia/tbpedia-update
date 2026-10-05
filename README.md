# tbpedia-update

An Obsidian plugin and Cloudflare Worker for installing approved incremental Tbpedia releases. Public release metadata comes from the GitHub manifest for the vault’s configured language; mirror links and NocoDB credentials remain in the Worker. The current plugin and Worker version is **1.1.0**; see [CHANGELOG.md](CHANGELOG.md) for change history. Every Worker response includes `X-Tbpedia-Worker-Version`, which allows the deployed Worker version to be checked without exposing configuration or secrets.

## Repository layout

- `src/` — Obsidian plugin source. `main.js` is the built plugin bundle and `manifest.json` is the Obsidian plugin manifest.
- `worker/` — Cloudflare Worker source and Wrangler configuration.
- `latest.json` — public index of published language manifests; it is not a release manifest itself.
- `manifests/<language>/<series>/<edition>/<Collection>/latest.json` — immutable incremental-release history for one language, series, and edition.
- `latest-manifest-template.xlsx` — authoring template for a public language release manifest; do not put mirror URLs, hashes, signatures, or credentials into it.

## Build the plugin

Install a current Node.js LTS and pnpm, then run:

```powershell
pnpm install
pnpm run check
pnpm run build
```

Copy `main.js` and `manifest.json` to `.obsidian/plugins/tbpedia-update/` in a test vault, enable **Tbpedia Update**, then select the vault language and edition in plugin settings. Standard uses `manifests/<language>/<series>/standard/V1/latest.json`; Advanced uses `manifests/<language>/<series>/advanced/V1/latest.json`. For example, a Traditional Chinese vault retrieves `https://raw.githubusercontent.com/tbspedia/tbpedia-update/main/manifests/zh-tw/reading/standard/V1/latest.json`.

The plugin stores that selection in `.obsidian/plugins/tbpedia-update/data.json`, with `seriesId` and `editionId` immediately after `languageCode`, followed by `Collection: "V1"` and `installed`. These IDs default to `reading` and `standard`. The edition dropdown offers `standard` and `advanced`; update checks validate the manifest against the selected language, series, and edition. Switching editions preserves installed release records and checks applied release IDs independently of release dates in other editions. Existing saved data receives the fields when the plugin loads. Existing vaults must select the language once; a fresh install without a language selected deliberately does not fetch a manifest.

The plugin validates the collection tuple, exact approved managed roots, release compatibility, every archive path, archive/expanded-size limits, collisions, and the exact manifest file inventory. It creates a vault-local staging and backup transaction, refuses to overwrite unowned files, and restores backed-up files if applying the release fails.

## Incremental release history

Each language has its own `manifests/<language>/<series>/<edition>/<Collection>/latest.json`, using `schemaVersion: 2` and retaining an ordered `releases` array. The root `latest.json` is only a small public manifest index. Each release entry has its own ZIP, source rows in NocoDB, exact `files` inventory, explicit `deletions`, and release notes. A ZIP contains only that release's new or changed managed Markdown files; it is not a full vault snapshot.

Supported vault language codes are `en`, `ja`, `fr`, `es`, `de`, `nl`, `sv`, `ko`, `zh-TW`, `zh-CN`, `vi`, `id`, `th`, and `bo`. Directory names are always lowercase, so `zh-TW` uses `manifests/zh-tw/reading/standard/V1/latest.json` and `zh-CN` uses `manifests/zh-cn/reading/standard/V1/latest.json`.

The root index is intentionally small:

```json
{
  "schemaVersion": 1,
  "product": "Tbpedia-Distribute",
  "type": "manifest-index",
  "manifests": [
    { "language": "zh-TW", "path": "manifests/zh-tw/reading/standard/V1/latest.json" }
  ]
}
```

Add a language to this index only after its language manifest is published and validated. The plugin directly builds the manifest path from languageCode, seriesId, editionId, and Collection; it does not use the index during normal updates.

For example, a vault recorded at `zh-tw-reading-standard-2026.9.30` receives the `zh-tw-reading-standard-2026.10.1` ZIP first and then the `zh-tw-reading-standard-2026.11.1` ZIP. Each release is downloaded, validated, backed up, committed, audited, and persisted separately. If the second release fails, the vault remains correctly installed through `zh-tw-reading-standard-2026.10.1`; the next run resumes with `zh-tw-reading-standard-2026.11.1`. Existing vaults with legacy date-only version records remain comparable during this transition.

```json
{
  "schemaVersion": 2,
  "product": "Tbpedia-Distribute",
  "plugin": "tbpedia-update",
  "channel": "stable",
  "title": "真佛百科閱讀系列標準版本",
  "collection": {
    "language": { "code": "zh-TW" },
    "series": { "id": "true-buddha-encyclopedia-reading" },
    "edition": { "id": "standard" }
  },
  "Collection": "V1",
  "minimumPluginVersion": "1.1.0",
  "minimumObsidianVersion": "1.6.0",
  "managedRoots": ["00 說明", "01 文集部", "02 開示部", "03 經藏部", "04 頌與戒律", "05 傳法部", "06 密法儀軌", "07 佛語典藏", "08 其他類別", "09 蓮香上師", "10 真佛宗", "20 專題", "50 列表", "60 導讀", "70 背景資料", "90 幫助", "98 下載資料", "99 Setting"],
  "releases": [
    { "releaseVersion": "zh-tw-reading-standard-2026.10.1", "releaseId": "zh-tw-reading-standard-2026-10-1.1", "publishedAt": "2026-10-01T08:00:00Z", "filename": "zh-tw-reading-standard-2026-10-1.1.zip", "files": [{ "path": "01 文集部/new-note.md", "change": "+" }], "deletions": [], "releaseNotes": { "summary": "October additions", "added": 1, "updated": 0, "removed": 0 } },
    { "releaseVersion": "zh-tw-reading-standard-2026.11.1", "releaseId": "zh-tw-reading-standard-2026-11-1.1", "publishedAt": "2026-11-01T08:00:00Z", "filename": "zh-tw-reading-standard-2026-11-1.1.zip", "files": [{ "path": "01 文集部/another-note.md", "change": "+" }], "deletions": [], "releaseNotes": { "summary": "November additions", "added": 1, "updated": 0, "removed": 0 } }
  ]
}
```

ZIP entry paths are always relative to the current vault root. Do not include language, collection, series, edition, or `installRoot` folders in the manifest or ZIP. The collection identity values remain only for choosing the correct language manifest and authorised update source.

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

Before publishing a release, upload its incremental ZIP and enable its matching private `Updateinfo` rows first. Build the readable release key from the manifest collection identity: `<language>-<series>-<edition>` in lowercase. Use `releaseVersion` as `<release-key>-YYYY.M.D` and `releaseId` as `<release-key>-YYYY-M-D.sequence`; for example, `zh-tw-reading-standard-2026-10-1.2` is the second 1 October release. The key in both fields must match the manifest’s `language.code`, `series.id`, and `edition.id`. Append the release to that language’s `manifests/<language>/<series>/<edition>/<Collection>/latest.json`; never alter or reorder a published entry. Publish the manifest only after a canary update succeeds.

When adding a new language, create and validate `manifests/<lowercase-language>/<series>/<edition>/<Collection>/latest.json`, add its path to root `latest.json`, create the corresponding enabled `Updateinfo` rows, and then choose that language in a test vault’s plugin settings.

Installed state stores ownedFiles as an object keyed by release ID, containing historical file change records matching the manifest: { "path": "01 文集部/note.md", "change": "+" }. The change field follows path: + means added, ~ means modified, and - means deleted. Deleted entries are excluded from ZIP inventories and remain in release history. Current ownership is computed by replaying applied releases. The legacy deletions array is still supported; matching - entries may also appear in files. Legacy entries without indicators are inferred from manifest history; unmatched saved paths retain provisional + indicators in a legacy group.
