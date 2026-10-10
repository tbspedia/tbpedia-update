import copy
import json
import tempfile
import unittest
from unittest.mock import patch
from pathlib import Path
import excel_to_json as e

FOLDER = Path(__file__).parent

class ConverterTests(unittest.TestCase):
    def test_dependency_validation(self):
        m = json.loads((FOLDER / 'standard.source.json').read_text(encoding='utf-8'))
        self.assertEqual(m['releases'][1]['dependsOn'], [])
        m['releases'][1]['dependsOn'] = [m['releases'][0]['releaseId']]
        e.validate_manifest(m)
        for dependencies in (None, '[]', [m['releases'][1]['releaseId']], ['missing'], [m['releases'][0]['releaseId']] * 2):
            bad = copy.deepcopy(m)
            bad['releases'][1]['dependsOn'] = dependencies
            with self.assertRaises(ValueError):
                e.validate_manifest(bad)
        bad = copy.deepcopy(m)
        bad['minimumPluginVersion'] = '1.1.0'
        with self.assertRaisesRegex(ValueError, '1.2.0'):
            e.validate_manifest(bad)

    def test_legacy_export_preserves_sequential_dependencies(self):
        sheets = list(e.read_workbook(FOLDER / 'tbpedia-manifests.xlsx'))
        name, cells = sheets[0]
        cells = dict(cells)
        for ref, value in list(cells.items()):
            if ref.startswith('A') and isinstance(value, str) and value.endswith('/dependsOn'):
                row = ref[1:]
                for column in 'ABCD': cells.pop(column + row, None)
        with tempfile.TemporaryDirectory() as output, patch.object(e, 'read_workbook', return_value=[(name, cells)]):
            manifests = e.convert('legacy.xlsx', output)
            manifest = next(iter(manifests.values()))
            self.assertEqual(manifest['releases'][0]['dependsOn'], [])
            self.assertEqual(manifest['releases'][1]['dependsOn'], [manifest['releases'][0]['releaseId']])

    def test_explicit_dependency_export(self):
        name, source = next(e.read_workbook(FOLDER / 'tbpedia-manifests.xlsx'))
        cells = dict(source)
        first_id = next(cells['B' + ref[1:]] for ref, value in cells.items() if ref.startswith('A') and value == '/releases/0/releaseId')
        dependency_row = next(ref[1:] for ref, value in cells.items() if ref.startswith('A') and value == '/releases/1/dependsOn')
        cells['B' + dependency_row] = json.dumps([first_id])
        with tempfile.TemporaryDirectory() as output, patch.object(e, 'read_workbook', return_value=[(name, cells)]):
            manifest = next(iter(e.convert('dependencies.xlsx', output).values()))
            self.assertEqual(manifest['releases'][0]['dependsOn'], [])
            self.assertEqual(manifest['releases'][1]['dependsOn'], [first_id])

    def test_all_eight_roundtrip(self):
        expected = json.loads((FOLDER / 'expected.json').read_text(encoding='utf-8'))
        with tempfile.TemporaryDirectory() as output:
            results = e.convert(FOLDER / 'tbpedia-manifests.xlsx', output)
            self.assertEqual(len(results), 8)
            for full, manifest in expected.items():
                actual = json.loads((Path(output) / full / 'latest.json').read_text(encoding='utf-8'))
                self.assertEqual(actual, manifest)
            for edition in ('standard', 'advanced'):
                source = json.loads((FOLDER / f'{edition}.source.json').read_text(encoding='utf-8'))
                self.assertEqual(expected[f'zh-tw-reading-{edition}-V1'], source)
            with self.assertRaises(ValueError):
                e.convert(FOLDER / 'tbpedia-manifests.xlsx', output)

    def test_repository_layout_deduplication(self):
        with tempfile.TemporaryDirectory() as output:
            results = e.convert(FOLDER / 'tbpedia-manifests.xlsx', output, 'repository')
            self.assertEqual(len(results), 7)

    def test_array_and_pointer_rules(self):
        self.assertEqual(e.build_manifest([('/a/1', '二'), ('/a/0', '一'), ('/x~1y', [])]),
                         {'a': ['一', '二'], 'x/y': []})
        for rows in ([('/a/1', 1)], [('/a', []), ('/a/0', 2)], [('/a', 1), ('/a', 2)]):
            with self.assertRaises(ValueError):
                e.build_manifest(rows)
        self.assertEqual(e.typed_value('[]', 'json'), [])
        self.assertEqual(e.typed_value(False, 'boolean'), False)
        self.assertEqual(e.typed_value(0, 'integer'), 0)

    def test_invalid_count_and_unsafe_path(self):
        m = json.loads((FOLDER / 'standard.source.json').read_text(encoding='utf-8'))
        bad = copy.deepcopy(m)
        bad['releases'][0]['releaseNotes']['added'] = 0
        with self.assertRaises(ValueError):
            e.validate_manifest(bad)

    def test_identity_contract_and_uppercase_version(self):
        m = json.loads((FOLDER / 'standard.source.json').read_text(encoding='utf-8'))
        e.validate_manifest(m)
        self.assertEqual(m['Collection'], 'V1')
        self.assertEqual(m['tbpedia']['language']['code'], 'zh-TW')
        old = copy.deepcopy(m)
        old['collection'] = old.pop('tbpedia')
        with self.assertRaisesRegex(ValueError, 'renamed to tbpedia'):
            e.validate_manifest(old)
        both = copy.deepcopy(m)
        both['collection'] = copy.deepcopy(m['tbpedia'])
        with self.assertRaisesRegex(ValueError, 'renamed to tbpedia'):
            e.validate_manifest(both)
        bad = copy.deepcopy(m)
        bad['releases'][0]['files'][0]['path'] = '../escape.md'
        with self.assertRaises(ValueError):
            e.validate_manifest(bad)

if __name__ == '__main__':
    unittest.main()
