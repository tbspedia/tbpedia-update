# tbpedia-update

An Obsidian plugin and Cloudflare Worker for installing approved incremental Tbpedia releases. Public release metadata comes from the GitHub manifest for the vault’s configured language; mirror links and NocoDB credentials remain in the Worker. The current plugin version is **1.2.14** and the Worker version is **1.1.0**; see [CHANGELOG.md](CHANGELOG.md) for change history. Every Worker response includes `X-Tbpedia-Worker-Version`, which allows the deployed Worker version to be checked without exposing configuration or secrets.

## Repository layout

Plugin `data.json` stores the starting release separately from installed updates, immediately after `tbpedia`:

```json
"tbpedia": "V1",
"baseRelease": {
  "releaseVersion": "2026.9.30",
  "releaseId": "2026-9-30.1"
}
```

Release information displays **Base Release** and **Base Release ID** immediately after Collection. Installing updates preserves this baseline. Existing data initializes it from a legacy baseline release ID where available, or from the installed record when no managed updates are recorded. If the starting release cannot be determined, it displays **Not configured**; populate `baseRelease` with the original release details when preparing the vault. An already saved baseline is never replaced automatically.

Each release can declare `dependsOn`:

```json
"dependsOn": []
```

An empty array declares an independent release. For dependencies, list earlier release IDs, for example `"dependsOn": ["zh-tw-reading-standard-2026-10-1.1"]`. The plugin recursively includes missing dependencies and installs them in manifest order. Omit the field to retain the original requirement for all earlier releases. Dependency IDs must exist earlier in the same manifest; duplicates, self references, and forward references are rejected. Manifests using this field must set `minimumPluginVersion` to `1.2.0` or newer.

Declare a release independent only if its ZIP can install without previous release files. A release deleting a previously managed file should depend on the release that installed it. Installed state uses `trackingVersion: 2` and individual `appliedReleaseIds`; `releaseVersion` describes the last installation and does not imply that skipped releases are installed. Older state migrates its sequential history before the first successful installation with the new plugin. Existing published manifests retain their dependency behavior unless explicitly revised.

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

Copy `main.js` and `manifest.json` to `.obsidian/plugins/tbpedia-update/` in a test vault, enable **Tbpedia Update**, then select the preferred Interface language in plugin settings. Configure the installed collection language using `languageCode` in plugin `data.json`. Standard uses `manifests/<language>/<series>/standard/V1/latest.json`; Advanced uses `manifests/<language>/<series>/advanced/V1/latest.json`. For example, a Traditional Chinese vault retrieves `https://raw.githubusercontent.com/tbspedia/tbpedia-update/main/manifests/zh-tw/reading/standard/V1/latest.json`.

The plugin stores the interface selection separately as `interfaceLanguage`, preserving `languageCode` in `.obsidian/plugins/tbpedia-update/data.json`, with `seriesId` and `editionId` immediately after `languageCode`, followed by `tbpedia: "V1"` and `installed`. Fresh installations leave `languageCode`, `seriesId`, and `editionId` empty until the vault owner configures them. The Vault edition dropdown has been removed; saved edition values remain available for update routing. Update checks validate the manifest against the configured language, series, and edition. Existing saved data receives the fields when the plugin loads. The **Check for content updates on startup** toggle defaults to enabled, including for existing installations, and can be disabled in plugin settings. Startup checks run after the workspace is ready and show the update dialog when releases are available; they stay quiet when content is current. Click **Check Tbpedia updates** in the ribbon or run **Check for content update** to fetch the configured collection's release manifest directly from GitHub. Every request uses a unique query parameter and a no-cache header to request fresh metadata. Manual checks show available releases even if previously announced, confirm when content is up to date, and report retrieval failures. The Interface language setting initially displays the saved collection language when no interface preference is saved. A fresh install without a configured `languageCode` deliberately does not fetch a manifest.

The **Release information** tab in plugin settings reads the configured collection's `latest.json`. It shows the title, language code, series, edition, and Collection above a table containing release versions, publication dates, summaries, added/updated/removed counts, downloaded status, and selection checkboxes. **Yes (installed)** means the installed release history records the release as completed, including legacy version records; downloading a ZIP without completing installation does not mark it as installed. Installed releases cannot be selected. Selecting a release includes its required dependencies automatically. Independent releases can be selected alone. Releases without dependency metadata keep the sequential behavior. **Download selected releases** opens a confirmation listing the complete ordered batch before installation. Use **Refresh** to reload the table. Viewing release information does not install updates or modify saved release history.

Update checks announce the latest pending release with **Go to download** and **Acknowledge** actions. The first opens the Release information tab; the second closes the announcement without downloading. The plugin saves collection-scoped announcement keys in `notifiedReleaseIds`, so automatic startup checks announce each latest release once across restarts. A new release ID triggers a new startup announcement. Manual checks always show pending releases, including previously acknowledged releases. Previously acknowledged updates remain selectable in Release information.

The plugin validates the collection tuple, exact approved managed roots, release compatibility, every archive path, archive/expanded-size limits, collisions, and the exact manifest file inventory. It creates a vault-local staging and backup transaction, requests permission before replacing any existing file (including tracked files), and restores backed-up files if applying the release fails. **Overwrite all** grants permission for the remaining existing files in that installation, including subsequent releases. Existing `data.json` files remain exempt because they are preserved entirely.

When updating an existing Markdown file (`.md`, case-insensitive) with YAML frontmatter, the installer preserves the existing values of 計劃閱讀、閱讀狀態、閱讀層次、閱讀次數、想讀日期、在讀日期、已讀日期、不讀日期、棄讀日期、閱讀感想、閱讀推薦、評分、文章評分、文章推薦. Blank values are preserved, and saved reading progress is never reset to release defaults. Other properties and article content come from the release. Properties absent from the existing file may be supplied by the release. If the release has no frontmatter, the installer adds frontmatter for the saved reading properties. Ordinary block properties retain their original YAML spelling and multiline formatting; complex YAML uses serialization while retaining property values. Invalid frontmatter stops the release and restores its files. The permission dialog explains these rules before replacement.

## Incremental release history

Each language has its own `manifests/<language>/<series>/<edition>/<Collection>/latest.json`, using `schemaVersion: 2`, the `tbpedia` identity object, and retaining an ordered `releases` array. The root `latest.json` is only a small public manifest index. Each release entry has its own ZIP, source rows in NocoDB, exact `files` inventory, explicit `deletions`, and release notes. A ZIP contains only that release's new or changed managed Markdown files; it is not a full vault snapshot.

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
  "tbpedia": {
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

## Deleting collection files

Add paths to `deletions` inside the appropriate release entry in `manifests/<language>/<series>/<edition>/<Collection>/latest.json`. Paths are quoted JSON strings relative to the vault root:

```json
"deletions": ["01 文集部/測試更新-2026-11-1.md"]
```

When the release is installed, the plugin deletes the listed file if either:

- It is currently owned according to `installed.ownedFiles`.
- It exists, has a `.md` extension (case-insensitive), and is inside one of the approved `managedRoots` collection folders, even if it is absent from `installed.ownedFiles`.

The second rule supports files shipped with the base collection before ownership tracking. It also applies to locally created notes: any existing Markdown note in a managed collection folder can be deleted when its exact path is listed. The plugin does not use a separate base-file inventory or `baseRelease` metadata to identify those files, and does not request individual deletion approval.

Folders are always refused. Untracked non-Markdown files and untracked files outside the collection folders remain protected. Path validation and symlink/reparse-point checks still apply. Starting with plugin 1.2.3, a deletion target that is already absent is skipped whether or not it appears in installed.ownedFiles. The plugin reports Information: skipping deletion; file is already absent: <path> and continues installing the release. Missing targets are excluded from the deletion transaction and backups. Ownership checks apply only to targets that exist.

Do not include deleted files in the ZIP or mark the same path as added or modified. A matching `{ "path": "01 文集部/測試更新-2026-11-1.md", "change": "-" }` entry in `files` is allowed; the parser adds it automatically when only `deletions` lists the path. Include the removal in `releaseNotes.removed`.

Before changing files, the plugin backs up existing deletion targets. If applying that release fails, it restores the backed-up files. After a successful installation, the deletion is recorded with `change: "-"` in `.obsidian/plugins/tbpedia-update/data.json` under `installed.ownedFiles[releaseId]`.

## Configure and deploy the Worker

1. Put the existing Cloudflare KV namespace id in `worker/wrangler.toml` as the `CONFIG` binding. The production route is `cfupdate.tbpedia.org/*`.
2. Put these values in `CONFIG` (they are intentionally not source code): `nocodbtableid_Updateinfo`, `nocodbtableid_Update`, and `nocodbapitoken`.
3. Set the Worker secrets (not `[vars]`):

```powershell
pnpm exec wrangler secret put NOCODB_BASE_URL --config worker/wrangler.toml
pnpm exec wrangler secret put TRANSACTION_SECRET --config worker/wrangler.toml
```

`TRANSACTION_SECRET` must be a random value of at least 32 bytes. Package source URLs must use HTTPS.

Alibaba OSS sources support public HTTPS object links and pre-signed download links. The Worker preserves their path and query parameters, probes the ZIP, streams the package, and records `Alibaba OSS` when selected. In `Updateinfo`, set `UpdateSource` to `Alibaba OSS`, provide the link in `UpdateLink`, match the release `Filename`, and enable the row. Pre-signed links must remain valid during the update.

Alibaba OSS download handling follows the approach in `tbpedia-install/cloudflare-worker/src/index.js`: preserve the object URL and signature query parameters, follow HTTPS redirects, and reject HTML/XML provider error pages. The updater additionally requires a ZIP package. If the response declares a `Content-Type`, it must be `application/zip`, `application/x-zip-compressed`, or `application/octet-stream`; the health probe also checks that the response begins with the ZIP signature (`PK`). Set the OSS object's `Content-Type` to `application/zip` when uploading an update ZIP. An expired signed URL, an HTML/XML error response, or an unsupported content type can cause the source health check to fail.

4. Validate and deploy:

```powershell
pnpm run worker:check
pnpm run worker:dev
pnpm run worker:deploy
```

The Worker offers opaque source discovery, bounded source probes, package streaming, and transaction audit endpoints. It signs short-lived transaction tokens, validates source queries against the transaction, matches source records by the transaction's filename and enabled state, requires HTTPS at every redirect, and never returns private `UpdateLink` values or NocoDB configuration.

## NocoDB requirements

`Updateinfo` needs the design-spec fields, especially `Language`, `Series`, `Edition`, `Title`, `Version`, `Filename`, `UpdateSource`, `UpdateLink`, `SourceId`, `Enabled`, `Priority`, `Regions`, and `SupportsRange`. Source discovery matches the release `Filename` only, then returns rows whose `Enabled` value is true; the descriptive collection fields are not used for source matching. `SourceId` must be unique and URL-safe (`A–Z`, `a–z`, `0–9`, `_`, `-`). The `Update` audit table uses the fields defined in the specification; the Worker records `initiated`, then `success` or `failed`.

Before publishing a release, upload its incremental ZIP and enable its matching private `Updateinfo` rows first. Build the readable release key from the manifest collection identity: `<language>-<series>-<edition>` in lowercase. Use `releaseVersion` as `<release-key>-YYYY.M.D` and `releaseId` as `<release-key>-YYYY-M-D.sequence`; for example, `zh-tw-reading-standard-2026-10-1.2` is the second 1 October release. The key in both fields must match the manifest’s `language.code`, `series.id`, and `edition.id`. Append the release to that language’s `manifests/<language>/<series>/<edition>/<Collection>/latest.json`; never alter or reorder a published entry. Publish the manifest only after a canary update succeeds.

When adding a new language, create and validate `manifests/<lowercase-language>/<series>/<edition>/<Collection>/latest.json`, add its path to root `latest.json`, create the corresponding enabled `Updateinfo` rows, and then configure that language as `languageCode` in a test vault plugin `data.json`.

Installed state stores ownedFiles as an object keyed by release ID, containing historical file change records matching the manifest: { "path": "01 文集部/note.md", "change": "+" }. The change field follows path: + means added, ~ means modified, and - means deleted. Deleted entries are excluded from ZIP inventories and remain in release history. Current ownership is computed by replaying applied releases. The legacy deletions array is still supported; matching - entries may also appear in files. Legacy entries without indicators are inferred from manifest history; unmatched saved paths retain provisional + indicators in a legacy group.

### Manifest identity field

The language/series/edition identity object is named `tbpedia`. The former lowercase `collection` key is rejected. Content release manifests retain uppercase `Collection` as their version string (for example `V1`). Saved plugin data uses lowercase `tbpedia` for that version string and migrates the legacy saved `Collection` field automatically. Publish the updated manifests together with the rebuilt plugin; older plugin builds expect the previous identity key.

### Excel manifest editor

[Workbook, Windows Python converter and instructions](tools/manifest-excel/README.md) are included in this repository. Each sheet exports the current `tbpedia` identity format while retaining uppercase `Collection`. Run `py -3 tools/manifest-excel/test_converter.py` to verify the workbook and converter.

### First-install saved data

A first install creates the following `data.json`. Configure the three identity fields before checking for updates. Existing settings, installed history, and saved base releases are preserved.

```json
{
  "languageCode": "",
  "seriesId": "",
  "editionId": "",
  "tbpedia": "V1",
  "baseRelease": {
    "releaseVersion": "2026.9.30",
    "releaseId": "2026-9-30.1"
  },
  "checkForUpdatesOnStartup": true,
  "installed": {
    "ownedFiles": {},
    "appliedReleaseIds": []
  }
}
```

### Obsidian configuration paths

Release inventories may include any vault-relative file under `.obsidian/`, including fonts, themes, snippets, and plugin files. Windows backslashes are normalized to forward slashes by the plugin. Absolute paths, traversal segments, invalid Windows names, and paths outside the approved vault boundary are rejected. Existing ownership, overwrite confirmation, backup, and rollback rules still apply.

### Preserving vault data.json files

Bundled `data.json` files are defaults. When a target already exists in the vault, the update installer skips replacement and deletion, including files tracked by an earlier release, without asking for overwrite approval. Missing `data.json` files receive the bundled defaults. Preserved files are excluded from the current release's write transaction and ownership records; other files follow the normal update rules. The plugin still saves its own settings and installed release history during normal operation.

To update an existing plugin installation, rebuild with `npm run build` and copy `main.js` into `.obsidian/plugins/tbpedia-update/`. Keep the vault's existing `data.json`. Reload the plugin or restart Obsidian to activate the new build.

Verify these behaviors with `node scripts/test-manual-update.cjs` and `node scripts/test-preserve-data.cjs`, and run `npm run check` before rebuilding.
### Troubleshooting incomplete release ZIPs

A “can't find end of central directory” error can mean the download was truncated, even when the source ZIP is valid. On 10 October 2026, the Google Drive release ZIP was verified at 38,662,642 bytes, while the production proxy returned about 2.4–2.9 MB. Worker logs confirmed `exceededCpu` and `Worker exceeded CPU time limit` during the package response. The deployed fix forwards the upstream body natively instead of running JavaScript on every chunk. The Worker rejects declared sizes above 1 GB, and the plugin enforces the 1 GB limit during download, checks declared length when present, validates the ZIP before accepting a source, and tries another enabled source on validation failure. Run `node scripts/test-download-integrity.cjs` to check incomplete-download handling. Deployed on 10 October 2026 as Worker version `cdc589bc-6687-4b27-9ee7-9255c62907b5`. A live proxy download returned all 38,662,642 bytes and passed ZIP central-directory and CRC integrity checks for all six entries.

### Release information loading on mobile

Opening or redrawing Release information reuses a validated manifest fetched within the last 60 seconds for the same language, series, edition, and collection version. Concurrent requests for that collection share one network request. This avoids fetching the same GitHub metadata again immediately after an update check or tab redraw. Manual **Check Tbpedia updates**, **Refresh**, and the pre-install manifest check request fresh metadata; an already-running request is shared. Cache entries are kept only in memory, and failed requests can be retried. Initial loading still depends on the device's connection to GitHub. Android device timing has not been measured; this change addresses duplicate requests confirmed in the code.

On mobile, manifest loading uses WebView fetch first and falls back to Obsidian requestUrl on network failure or timeout. Each attempt is limited to 12 seconds, including response parsing. If both attempts fail, Release information displays an error and Refresh can retry. The native requestUrl API has no cancellation option, so a timed-out native request may finish in the background, but it cannot keep the page waiting indefinitely. Mobile transport, fallback, timeout, and recovery are covered by the mocked request regression tests; The user confirmed that Android Release information loads successfully after the 1.2.1 update.

### Plugin release 1.2.1

Version 1.2.1 includes bounded Android manifest requests with a fallback transport, shared concurrent requests, recent release metadata reuse, manual GitHub checks, incomplete-ZIP detection, and preservation of existing vault data.json defaults. Install or update through BRAT using repository `tbspedia/tbpedia-update` and the latest release. The release includes `main.js` and `manifest.json`. Reload the plugin after updating. The user confirmed that Release information now loads on Android.


### Plugin release 1.2.2

Mobile update service calls and ZIP downloads use Obsidian requestUrl to bypass WebView CORS restrictions. This addresses the likely cause of Android Update failed: Failed to fetch after release information loads. Desktop downloads retain streaming. Mobile native downloads buffer the response before checking the archive size, so large packages depend on available device memory. Authentication, response status, declared download length, and ZIP validation remain enforced. Verify with node scripts/test-mobile-update.cjs. Android device verification remains pending.

### Plugin release 1.2.3

Deletion targets already absent from the vault are skipped with an informational progress message, and the update continues. Missing paths are excluded from deletion transactions and backups. Existing file ownership, folder protection, and preservation of existing data.json files still apply.

### Updating through BRAT

1. Open BRAT settings and add `tbspedia/tbpedia-update` if it is not already registered.
2. Check for plugin updates and install version **1.2.3** or newer. If the repository is pinned to an older release, select the latest release.
3. Reload True Buddha Pedia Update or restart Obsidian. Confirm the installed plugin version is 1.2.3 or newer.
4. Open **Release information**, select the pending content release, and retry the update.

A missing deletion target is informational and does not prevent completion. For example, if `00 說明/搜索 (search) 9.md` is listed for deletion but is not present, it is skipped and the remaining changes proceed. Existing unowned files outside the permitted collection-note deletion rules can still stop an update. Plugin releases attach `main.js` and `manifest.json`; the vault's existing `data.json` is preserved.

### Adding folders in a release

List a folder in `files` with its vault-relative path and `change: "+"`, just as for a file (for example `{"path":"80 我的書架","change":"+"}`). Include the directory itself in the ZIP, including when it is empty. The installer detects ZIP directory entries, creates missing folders, and preserves existing folders and their contents. Files inside a folder must each be listed separately in the manifest. Folder deletion is not supported. Folder support requires plugin version 1.2.11 or newer.
