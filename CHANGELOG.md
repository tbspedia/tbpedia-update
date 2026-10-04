# Changelog

All notable changes to Tbpedia Update are recorded here. Plugin versions use semantic versioning: `major.minor.patch`.

## 1.1.0 — 2026-10-04

### Added

- Human-readable content release identifiers based on the collection key, such as `zh-tw-reading-standard-2026.10.1` and `zh-tw-reading-standard-2026-10-1.1`.
- This changelog as the source of plugin change history.

### Changed

- Content ZIP paths are relative to the current vault root; manifests no longer define collection folder paths or `installRoot`.
- The plugin records the readable `releaseVersion`, current `releaseId`, and every applied `releaseId` in `data.json`.

### Fixed

- UTF-8 transaction claims now preserve non-English titles when the Worker compares a source query with its signed transaction.

## 1.0.0

### Added

- Initial Obsidian updater and Cloudflare Worker implementation for approved, incremental Tbpedia content releases.
