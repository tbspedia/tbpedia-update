const assert = require('node:assert/strict');
const { build } = require('esbuild');
(async () => {
  const result = await build({ entryPoints: ['src/path-policy.ts'], bundle: true, platform: 'node', format: 'cjs', write: false });
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(require, mod, mod.exports);
  const { assertManagedPath } = mod.exports;
  for (const file of ['.obsidian/fonts/LXGWWenKaiTC-Regular.ttf', '.obsidian/plugins/example/main.js', '.obsidian/themes/example/theme.css', '.obsidian/snippets/layout.css', '.obsidian/any/subfolder/config.json', '.obsidian/app.json']) {
    assert.equal(assertManagedPath(file), file);
    assert.equal(assertManagedPath(file.replaceAll('/', '\\')), file);
  }
  for (const file of ['.obsidian/../outside.md', '.obsidian/fonts/../../outside.md', '/.obsidian/fonts/font.ttf', 'C:/vault/.obsidian/font.ttf', '.obsidian', '.obsidian-other/font.ttf', '.obsidian/fonts/CON.ttf', '.obsidian/invalid:name.ttf', 'Personal/file.md']) {
    assert.throws(() => assertManagedPath(file), /Unsafe path|outside the managed boundary/);
  }
  const serviceBundle = await build({ entryPoints: ['src/update-service.ts'], bundle: true, platform: 'node', format: 'cjs', external: ['obsidian'], write: false });
  const serviceModule = { exports: {} };
  new Function('require', 'module', 'exports', serviceBundle.outputFiles[0].text)(name => name === 'obsidian' ? { Notice: class {}, Platform: {} } : require(name), serviceModule, serviceModule.exports);
  const { UpdateService } = serviceModule.exports;
  const JSZip = require('jszip');
  const service = new UpdateService({}, '1.2.0', () => ({}), async () => {});
  const zip = new JSZip();
  zip.folder('.obsidian/fonts');
  zip.file('.obsidian/fonts/font.ttf', 'font bytes');
  const release = { files: [{ path: '.obsidian/fonts/font.ttf', change: '+' }], deletions: [] };
  const plan = await service.validateArchive(await zip.generateAsync({ type: 'arraybuffer' }), {}, release);
  assert.deepEqual(plan.writes, ['.obsidian/fonts/font.ttf']);
  const invalid = new JSZip();
  invalid.file('.obsidian', 'not a directory');
  await assert.rejects(service.validateArchive(await invalid.generateAsync({ type: 'arraybuffer' }), {}, { files: [], deletions: [] }), /outside the managed boundary/);
  console.log('Passed arbitrary .obsidian paths, Windows separator normalization, ZIP directory handling, and unsafe-path rejection.');
})().catch(error => { console.error(error); process.exitCode = 1; });
