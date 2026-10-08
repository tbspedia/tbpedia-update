const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { build } = require('esbuild');

(async () => {
  const result = await build({ entryPoints: ['src/manifest.ts'], bundle: true, platform: 'node', format: 'cjs', write: false });
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(require, mod, mod.exports);
  const { parseAndValidateManifest } = mod.exports;
  function visit(folder) {
    for (const item of fs.readdirSync(folder, { withFileTypes: true })) {
      const filename = path.join(folder, item.name);
      if (item.isDirectory()) visit(filename);
      else if (item.name === 'latest.json') {
        const source = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const parsed = parseAndValidateManifest(source);
        assert.deepEqual(parsed.tbpedia, source.tbpedia);
        assert.equal(parsed.Collection, 'V1');
        assert.equal(Object.hasOwn(parsed, 'collection'), false);
      }
    }
  }
  visit('manifests');
  const source = JSON.parse(fs.readFileSync('manifests/zh-tw/reading/standard/V1/latest.json', 'utf8'));
  const old = structuredClone(source);
  old.collection = old.tbpedia;
  delete old.tbpedia;
  assert.throws(() => parseAndValidateManifest(old), /renamed to tbpedia/);
  const both = { ...source, collection: source.tbpedia };
  assert.throws(() => parseAndValidateManifest(both), /renamed to tbpedia/);
  const missing = structuredClone(source);
  delete missing.tbpedia;
  assert.throws(() => parseAndValidateManifest(missing), /tbpedia identity/);
  const wrong = structuredClone(source);
  wrong.tbpedia.edition.id = 'advanced';
  assert.throws(() => parseAndValidateManifest(wrong), /releaseVersion/);
  const noVersion = structuredClone(source);
  delete noVersion.Collection;
  assert.throws(() => parseAndValidateManifest(noVersion), /Collection must/);
  const exported = path.resolve('tools/manifest-excel/exported');
  if (fs.existsSync(exported)) visit(exported);
  console.log('Passed tbpedia identity validation, legacy-key rejection, uppercase Collection preservation, and all manifest fixtures.');
})().catch(error => { console.error(error); process.exitCode = 1; });
