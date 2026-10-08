import copy
import json
import tempfile
import unittest
from pathlib import Path
import excel_to_json as e

FOLDER = Path(__file__).parent

class ConverterTests(unittest.TestCase):
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
