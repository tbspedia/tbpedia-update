"""Export the supplied manifest workbook using Python 3.10+ (no pip packages).

Windows: py -3 excel_to_json.py tbpedia-manifests.xlsx --output exported
Each worksheet has JSON path / Value / Type columns, beginning at row 9.
"""
import argparse
import json
import math
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from pathlib import Path, PurePosixPath

NS = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'


def read_workbook(filename):
    """Read values directly from XLSX; reject formulas instead of stale caches."""
    with zipfile.ZipFile(filename) as archive:
        shared = []
        if 'xl/sharedStrings.xml' in archive.namelist():
            tree = ET.fromstring(archive.read('xl/sharedStrings.xml'))
            shared = [''.join(t.text or '' for t in si.iterfind('.//s:t', NS))
                      for si in tree.findall('s:si', NS)]
        rels = ET.fromstring(archive.read('xl/_rels/workbook.xml.rels'))
        targets = {r.attrib['Id']: r.attrib['Target'] for r in rels
                   if r.attrib.get('TargetMode') != 'External'}
        book = ET.fromstring(archive.read('xl/workbook.xml'))
        properties = book.find('s:workbookPr', NS)
        date1904 = properties is not None and properties.get('date1904') in ('1', 'true')
        for sheet in book.findall('s:sheets/s:sheet', NS):
            target = targets[sheet.attrib[f'{{{REL}}}id']]
            member = target.lstrip('/') if target.startswith('/') else 'xl/' + target
            cells = {}
            tree = ET.fromstring(archive.read(member))
            for cell in tree.findall('s:sheetData/s:row/s:c', NS):
                ref = cell.attrib['r']
                if cell.find('s:f', NS) is not None:
                    raise ValueError(f"{sheet.attrib['name']}!{ref}: formulas are not supported; paste values")
                kind = cell.attrib.get('t')
                value = cell.findtext('s:v', default='', namespaces=NS)
                if kind == 's':
                    value = shared[int(value)] if value else ''
                elif kind == 'inlineStr':
                    value = ''.join(t.text or '' for t in cell.iterfind('.//s:t', NS))
                elif kind == 'b':
                    value = value == '1'
                elif kind == 'e':
                    raise ValueError(f"{sheet.attrib['name']}!{ref}: Excel error {value}")
                elif kind == 'd':
                    # Excel stores dates with a midnight time; manifests use dates only.
                    value = value.split('T', 1)[0]
                elif kind not in ('str', 'd') and value:
                    value = float(value)
                    if value.is_integer():
                        value = int(value)
                cells[ref] = value
            # Excel may save edited dates as serial numbers instead of ISO date cells.
            # Only publication-date fields accept this conversion; other strings stay strict.
            for ref, pointer in list(cells.items()):
                if ref.startswith('A') and isinstance(pointer, str) and pointer.endswith('/publishedAt'):
                    value_ref = 'B' + ref[1:]
                    value = cells.get(value_ref)
                    if isinstance(value, (int, float)) and not isinstance(value, bool):
                        if not math.isfinite(value) or value < 0 or (not date1904 and int(value) == 60):
                            raise ValueError(f"{sheet.attrib['name']}!{value_ref}: invalid Excel publication date")
                        epoch = datetime(1904, 1, 1) if date1904 else datetime(1899, 12, 31)
                        days = int(value) if date1904 or value < 60 else int(value) - 1
                        cells[value_ref] = (epoch + timedelta(days=days)).strftime('%Y-%m-%d')
            yield sheet.attrib['name'], cells


def typed_value(value, kind):
    kind = str(kind).strip().lower()
    if kind == 'string':
        if value is None or value == '':
            return ''
        if not isinstance(value, str):
            raise ValueError('string values must be Excel text cells')
        return value
    if kind in ('integer', 'number'):
        if isinstance(value, bool) or value is None or value == '':
            raise ValueError(f'{kind} value is required')
        number = float(value)
        if not math.isfinite(number):
            raise ValueError('numbers must be finite')
        if kind == 'integer':
            if not number.is_integer():
                raise ValueError('integer value cannot contain a fraction')
            return int(number)
        return number
    if kind == 'boolean':
        if isinstance(value, bool):
            return value
        if str(value).lower() in ('true', 'false'):
            return str(value).lower() == 'true'
        raise ValueError('boolean must be TRUE or FALSE')
    if kind == 'null':
        if value not in (None, '', 'null'):
            raise ValueError('null value must be blank or null')
        return None
    if kind == 'json':
        if not isinstance(value, str):
            raise ValueError('json cells must contain JSON text, such as []')
        return json.loads(value, parse_constant=lambda x: (_ for _ in ()).throw(ValueError(f'invalid JSON: {x}')))
    raise ValueError(f'unknown type {kind!r}')


def build_manifest(entries):
    """Build a tree from JSON Pointer leaves, detecting conflicts and array gaps."""
    tree = {}
    terminal = object()
    for pointer, value in entries:
        if not isinstance(pointer, str) or not pointer.startswith('/'):
            raise ValueError('JSON paths must start with /')
        parts = pointer[1:].split('/')
        node = tree
        for part in parts:
            if re.search(r'~(?![01])', part):
                raise ValueError(f'invalid JSON Pointer escape: {pointer}')
            part = part.replace('~1', '/').replace('~0', '~')
            if terminal in node:
                raise ValueError(f'path conflicts with a parent value: {pointer}')
            node = node.setdefault(part, {})
        if node:
            raise ValueError(f'duplicate or overlapping path: {pointer}')
        node[terminal] = value

    def finish(node):
        if terminal in node:
            return node[terminal]
        keys = list(node)
        if keys and all(re.fullmatch(r'0|[1-9][0-9]*', k) for k in keys):
            ordered = sorted(keys, key=int)
            if [int(k) for k in ordered] != list(range(len(keys))):
                raise ValueError('array indexes must start at 0 with no gaps')
            return [finish(node[k]) for k in ordered]
        return {k: finish(v) for k, v in node.items()}
    return finish(tree)


def validate_manifest(m):
    """Validate the reference v2 shape, identifiers, paths and release counts."""
    def require(ok, message):
        if not ok:
            raise ValueError(message)

    def text(v, name):
        require(isinstance(v, str) and bool(v.strip()), f'{name} must be nonempty text')

    def safe_path(v, name):
        text(v, name)
        require(not v.startswith('/') and '\\' not in v and ':' not in v
                and all(p not in ('', '.', '..') for p in v.split('/')), f'{name}: unsafe relative path')

    require(isinstance(m, dict), 'manifest must be an object')
    require(type(m.get('schemaVersion')) is int and m['schemaVersion'] == 2, 'schemaVersion must be integer 2')
    for key in ('product', 'plugin', 'channel', 'title', 'Collection',
                'minimumPluginVersion', 'minimumObsidianVersion'):
        text(m.get(key), key)
    require(m['product'] == 'Tbpedia-Distribute' and m['plugin'] == 'tbpedia-update', 'unexpected product/plugin')
    require('collection' not in m, 'lowercase collection was renamed to tbpedia; uppercase Collection is unchanged')
    c = m.get('tbpedia')
    require(isinstance(c, dict), 'tbpedia must be the language/series/edition object; release manifest version uses uppercase Collection')
    for key, field in (('language', 'code'), ('series', 'id'), ('edition', 'id')):
        require(isinstance(c.get(key), dict), f'tbpedia.{key} must be an object')
        text(c[key].get(field), f'tbpedia.{key}.{field}')
    for part in (c['language']['code'], c['series']['id'], c['edition']['id'], m['Collection']):
        require(bool(re.fullmatch(r'[A-Za-z0-9_-]+', part)), 'tbpedia identifiers contain unsafe characters')
    roots = m.get('managedRoots')
    require(isinstance(roots, list) and bool(roots), 'managedRoots must be a nonempty list')
    for p in roots:
        safe_path(p, 'managedRoots entry')
    require(len(roots) == len(set(roots)), 'duplicate managedRoots')
    releases = m.get('releases')
    require(isinstance(releases, list), 'releases must be a list')
    if any(isinstance(r, dict) and 'dependsOn' in r for r in releases):
        version = m['minimumPluginVersion']
        require(bool(re.fullmatch(r'\d+\.\d+\.\d+', version)) and tuple(map(int, version.split('.'))) >= (1, 2, 0),
                'dependsOn requires minimumPluginVersion 1.2.0 or newer')
    ids = set()
    prefix = f"{c['language']['code'].lower()}-{c['series']['id']}-{c['edition']['id']}-"
    for i, r in enumerate(releases):
        require(isinstance(r, dict), f'releases/{i} must be an object')
        for key in ('releaseVersion', 'releaseId', 'publishedAt', 'filename'):
            text(r.get(key), f'releases/{i}/{key}')
        for key in ('releaseVersion', 'releaseId', 'filename'):
            require(r[key].startswith(prefix), f'releases/{i}/{key} must start with {prefix}')
        require(r['releaseId'] not in ids, 'duplicate releaseId')
        if 'dependsOn' in r:
            dependencies = r['dependsOn']
            require(isinstance(dependencies, list) and all(isinstance(d, str) and bool(d.strip()) for d in dependencies),
                    f'releases/{i}/dependsOn must be a JSON array of release IDs')
            require(len(dependencies) == len(set(dependencies)), f'releases/{i}/dependsOn contains duplicate IDs')
            for dependency in dependencies:
                require(dependency in ids, f'releases/{i}/dependsOn: {dependency} must identify an earlier release in this manifest')
        ids.add(r['releaseId'])
        require(re.fullmatch(r'\d{4}-\d{2}-\d{2}', r['publishedAt']) is not None,
                'publishedAt must use YYYY-MM-DD')
        datetime.strptime(r['publishedAt'], '%Y-%m-%d')
        safe_path(r['filename'], 'filename')
        require('/' not in r['filename'] and r['filename'].endswith('.zip'), 'filename must be a ZIP basename')
        files, deletions = r.get('files'), r.get('deletions')
        require(isinstance(files, list) and isinstance(deletions, list), 'files and deletions must be lists')
        paths = []
        for f in files:
            require(isinstance(f, dict), 'each file must be an object')
            safe_path(f.get('path'), 'file path')
            require(f.get('change') in ('+', '~'), 'file change must be + or ~')
            paths.append(f['path'])
        for p in deletions:
            safe_path(p, 'deletion path')
        require(len(paths) == len(set(paths)), 'duplicate file paths in release')
        require(len(deletions) == len(set(deletions)), 'duplicate deletions')
        require(not set(paths).intersection(deletions), 'a path cannot be changed and deleted in the same release')
        notes = r.get('releaseNotes')
        require(isinstance(notes, dict), 'releaseNotes must be an object')
        text(notes.get('summary'), 'releaseNotes.summary')
        counts = {'added': sum(f['change'] == '+' for f in files),
                  'updated': sum(f['change'] == '~' for f in files), 'removed': len(deletions)}
        for key, count in counts.items():
            require(type(notes.get(key)) is int and notes[key] == count,
                    f'releases/{i}/releaseNotes/{key} must equal {count}')


def convert(workbook, output, layout='tabs', selected=None, force=False):
    exports = {}
    seen = set()
    for name, cells in read_workbook(workbook):
        full = cells.get('B4', '')
        if selected and name not in selected and full not in selected:
            continue
        seen.update((name, full))
        if not isinstance(full, str) or not re.fullmatch(r'[A-Za-z0-9_-]+', full):
            raise ValueError(f'{name}!B4: full export name is missing or unsafe')
        entries = []
        row_numbers = sorted({int(re.search(r'\d+$', ref).group()) for ref in cells})
        for row in row_numbers:
            if row < 9:
                continue
            pointer = cells.get(f'A{row}', '')
            value = cells.get(f'B{row}', '')
            kind = cells.get(f'C{row}', '')
            if pointer == '' and value == '' and kind == '':
                continue
            try:
                entries.append((pointer, typed_value(value, kind)))
            except (ValueError, TypeError) as e:
                if isinstance(pointer, str) and pointer.endswith('/dependsOn'):
                    raise ValueError(f'{name}, row {row}: dependsOn must be a JSON array, such as [] or ["release-id"]') from e
                raise ValueError(f'{name}, row {row}: {e}') from e
        try:
            manifest = build_manifest(entries)
            # Always export explicit dependency metadata. Legacy workbooks retain
            # sequential semantics instead of silently becoming independent.
            earlier_ids = []
            for release in manifest.get('releases', []):
                release.setdefault('dependsOn', list(earlier_ids))
                earlier_ids.append(release.get('releaseId'))
            if any('dependsOn' in release for release in manifest.get('releases', [])):
                version = str(manifest.get('minimumPluginVersion', ''))
                if re.fullmatch(r'\d+\.\d+\.\d+', version) and tuple(map(int, version.split('.'))) < (1, 2, 0):
                    manifest['minimumPluginVersion'] = '1.2.0'
            validate_manifest(manifest)
        except (ValueError, TypeError, KeyError) as e:
            raise ValueError(f'{name}: {e}') from e
        if layout == 'tabs':
            relative = Path(full) / 'latest.json'
        else:
            c = manifest['tbpedia']
            relative = Path('manifests') / c['language']['code'].lower() / c['series']['id'] / c['edition']['id'] / manifest['Collection'] / 'latest.json'
        if relative in exports and exports[relative] != manifest:
            raise ValueError(f'conflicting sheets export to {relative}; select one with --sheet')
        exports[relative] = manifest
    if selected and set(selected) - seen:
        raise ValueError(f'unknown sheet(s): {sorted(set(selected) - seen)}')
    if not exports:
        raise ValueError('no manifest sheets selected')
    # Validate all sheets and all destinations before writing any JSON.
    output = Path(output).resolve()
    for relative in exports:
        target = (output / relative).resolve()
        if not target.is_relative_to(output):
            raise ValueError(f'output escapes export folder: {target}')
        if target.exists() and not force:
            raise ValueError(f'{target} already exists; use --force to replace exported JSON')
    for relative, manifest in exports.items():
        target = output / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        temporary = target.with_suffix('.json.tmp')
        temporary.write_text(json.dumps(manifest, ensure_ascii=False, indent=2, allow_nan=False) + '\n', encoding='utf-8', newline='\n')
        temporary.replace(target)
        print(target)
    return exports


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('workbook', nargs='?', type=Path, default=Path(__file__).with_name('tbpedia-manifests.xlsx'))
    parser.add_argument('--output', type=Path, default=Path(__file__).with_name('exported'))
    parser.add_argument('--layout', choices=['tabs', 'repository'], default='tabs')
    parser.add_argument('--sheet', action='append', help='Export this tab or full name; repeat to select several')
    parser.add_argument('--force', action='store_true', help='Replace existing exported JSON files')
    args = parser.parse_args()
    try:
        exports = convert(args.workbook, args.output, args.layout, args.sheet, args.force)
    except PermissionError as e:
        blocked = Path(e.filename).resolve() if e.filename else None
        if blocked == args.workbook.resolve():
            print(f'ERROR: Cannot read workbook "{args.workbook}". Save and close this workbook in Excel, then run export_json.bat again. If it is still locked, exit Excel after saving and wait for OneDrive to finish syncing.', file=sys.stderr)
        else:
            print(f'ERROR: Cannot write or replace "{e.filename or args.output}". Close any program using the exported JSON files and check that the output folder is writable.', file=sys.stderr)
        return 1
    except (OSError, ValueError, KeyError, ET.ParseError, zipfile.BadZipFile) as e:
        print(f'ERROR: {e}', file=sys.stderr)
        return 1
    print(f'Exported {len(exports)} latest.json file(s).')
    return 0


if __name__ == '__main__':
    sys.exit(main())
