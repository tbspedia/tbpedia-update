# Excel manifest editor

Requires Windows with Python 3.10 or newer. No pip install is needed.

1. Open `tbpedia-manifests.xlsx`, edit the yellow Value cells, then save.
2. Double-click `export_json.bat`. It replaces JSON files in the adjacent `exported` folder.
3. Each sheet exports to `exported/<full requested name>/latest.json`.

Or run in PowerShell from this folder:

```powershell
py -3 .\excel_to_json.py .\tbpedia-manifests.xlsx --output .\exported --force
```

To use the GitHub repository directory structure instead:

```powershell
py -3 .\excel_to_json.py .\tbpedia-manifests.xlsx --output .\repository-export --layout repository --force
```

This writes `manifests/zh-tw/<series>/<edition>/V1/latest.json` under the output folder. Both essential-notes sheets map to the same repository path. Identical sheets are deduplicated; differing sheets produce an error. Select one explicitly if they differ:

```powershell
py -3 .\excel_to_json.py --output .\repository-export --layout repository --sheet zh-tw-notes-essential-V1 --force
```

## Editing rows

- Column A is a JSON Pointer, column B is its value, column C is its JSON type. Column D is guidance and is not exported.
- Numbers use `integer` or `number`; identifiers and timestamps use `string`.
- Empty arrays use type `json` with value `[]`. Empty objects use `{}`. Null uses type `null`.
- Array indexes start at 0, with no gaps. Row order does not matter. Append new rows below the existing rows; table resizing is optional.
- To add a release, copy every row beginning `/releases/0/`, append them, change the new release index to the next unused index, and edit its fields.
- To add a file, copy `/releases/0/files/0/path` and `/releases/0/files/0/change` into new rows and change the file index to the next unused index.
- To add a deletion to an empty list, replace the `/releases/0/deletions` row with `/releases/0/deletions/0`, type `string`, and the relative file path. Add `/deletions/1` for the next path.
- Keep added/updated/removed counts aligned with the file and deletion lists. The converter checks these counts.
- Remove all rows belonging to a release to remove it, then renumber later release indexes. To have no releases, replace all release rows with one `/releases` row, type `json`, value `[]`.
- Use literal values, not Excel formulas. Text timestamps must use `YYYY-MM-DDTHH:MM:SSZ`.
- `/tbpedia` contains the language, series and edition identity. `/Collection` is the version string. The former lowercase `/collection` key is rejected.
- Existing files are protected unless `--force` is provided. All sheets are validated before any output is written.

## Tab mapping and source data

| Requested name | Excel tab | Series ID | Edition ID |
|---|---|---|---|
| zh-tw-reading-standard-V1 | zh-tw-reading-standard-V1 | reading | standard |
| zh-tw-reading-advanced-V1 | zh-tw-reading-advanced-V1 | reading | advanced |
| zh-tw-notes-essential-V1 | zh-tw-notes-essential-V1 | notes | essential |
| zhtw-notes-expanded-V1 | zhtw-notes-expanded-V1 | notes | expanded |
| zhtw-notes-essential-V1 | zhtw-notes-essential-V1 | notes | essential |
| zhtw-specialisation-ai-V1 | zhtw-specialisation-ai-V1 | specialisation | ai |
| zhtw-specialisation-propagation-V1 | zhtw-special-propagation-V1 | specialisation | propagation |
| zhtw-specialisation-seclusion-V1 | zhtw-special-seclusion-V1 | specialisation | seclusion |

Excel limits tab names to 31 characters. B4 stores the full requested name, including the two longer names. Both essential-notes tabs are retained as requested and describe the same collection.

Source snapshot: 2026-10-08. The reading tabs use the actual repository manifests below. At the time of creation, the repository had no notes or specialisation manifests. Those six sheets are templates derived from reading standard. Their series, edition, title, release identifier prefixes, ZIP filename prefixes and summaries were adjusted. Managed roots, sample file paths and sample publication dates remain from the reference and must be reviewed before publishing. The standard source includes a November 2026 sample release, which is preserved.

- https://github.com/tbspedia/tbpedia-update/blob/main/manifests/zh-tw/reading/standard/V1/latest.json
- https://github.com/tbspedia/tbpedia-update/blob/main/manifests/zh-tw/reading/advanced/V1/latest.json

The workbook preserves schemaVersion 2 and all reference fields, nested objects, arrays, integer counts, empty deletion arrays and Traditional Chinese Unicode. The Python converter exports UTF-8 JSON with two-space indentation. It converts this workbook layout rather than arbitrary Excel workbooks and does not download newer source manifests or upload files to GitHub.

The local manifest contract now uses `tbpedia` instead of lowercase `collection`. The source snapshots were migrated only by renaming that key. Rebuilt update plugins and migrated manifests must be published together.
