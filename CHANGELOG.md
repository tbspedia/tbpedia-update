# Changelog

All notable changes to Tbpedia Update are recorded here. Plugin versions use semantic versioning: `major.minor.patch`.

## 1.2.9 — 2026-10-10

- Use YYYY-MM-DD publication dates in release manifests, Excel templates, exported JSON, and plugin release information.
- Validate publication dates in the Excel exporter and reject invalid calendar dates in the plugin while accepting older timestamp manifests.
- Refresh the eight-sheet Excel editor and exports from the published standard manifest, preserving the additional release entry with a corrected array index.

## 1.2.8 — 2026-10-10

- Add editable dependsOn arrays to Excel release templates and generated release manifests, with minimum plugin version 1.2.0.
- Validate explicit dependency IDs during Excel export; preserve sequential dependencies when older workbooks omit the field.
- Update example exports and add regression tests for independent and dependent releases.

## 1.2.7 — 2026-10-10

- Record each successfully installed release's download date in data.json under installed.downloadedAt.
- Display local download dates in My Download; show Not recorded for historical releases without saved dates.

## 1.2.6 — 2026-10-10

- Let My Download release and file-detail tables use natural column widths with horizontal scrolling.
- Keep table content on one line and make scroll regions keyboard accessible.

## 1.2.5 — 2026-10-10

- Display the saved collection Title before Language in My Download.
- Move File details immediately after Status in the release history table.

## 1.2.4 — 2026-10-10

- Add the offline My Download settings tab using saved data.json release and file history.
- Show installed status, downloaded-file counts, added/updated/removed totals, and expandable file details.
- Load file tables on expansion and explain missing historical records.

## Unreleased

- Allow explicit release deletions to remove existing Markdown files inside approved collection folders even when they are missing from `installed.ownedFiles`, including base collection files and locally created notes whose paths are listed.
- Keep ownership checks for other files, reject folder deletion, and preserve path/reparse-point checks and transaction rollback.
- Add regression coverage for untracked collection deletion, protected files and folders, tracked-file deletion, and restoration after a failed update.

## 1.2.0 — 2026-10-06

- Added per-release `dependsOn`: an empty array allows independent installation; explicit IDs include required dependencies recursively. Omitted fields preserve sequential installation.
- Added release selection in settings and persistent one-time announcements with Go to download and Acknowledge actions.
- Track completed releases individually so independent installations do not hide skipped releases. Preserve legacy installation history on migration.
- Added startup update checking, enabled by default, and separated Interface language from collection language.
- Improved archive mismatch diagnostics and removed the Vault edition dropdown.

## 1.1.0 — 2026-10-04

### Added

- Human-readable content release identifiers based on the collection key, such as `zh-tw-reading-standard-2026.10.1` and `zh-tw-reading-standard-2026-10-1.1`.
- This changelog as the source of plugin change history.
- The `X-Tbpedia-Worker-Version` response header for deployed Worker version checks.

### Changed

- Content ZIP paths are relative to the current vault root; manifests no longer define collection folder paths or `installRoot`.
- The plugin records the readable `releaseVersion`, current `releaseId`, and every applied `releaseId` in `data.json`.

### Fixed

- UTF-8 transaction claims now preserve non-English titles when the Worker compares a source query with its signed transaction.

## 1.0.0

### Added

- Initial Obsidian updater and Cloudflare Worker implementation for approved, incremental Tbpedia content releases.
