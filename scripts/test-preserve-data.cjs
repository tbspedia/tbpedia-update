const assert = require('node:assert/strict');
const { build } = require('esbuild');
(async () => {
  const bundle = await build({ entryPoints: ['src/update-service.ts'], bundle: true, platform: 'node', format: 'cjs', external: ['obsidian'], write: false });
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(name => name === 'obsidian' ? {} : require(name), mod, mod.exports);
  const JSZip = require('jszip');
  const existing = '.obsidian/plugins/example/data.json';
  const missing = '.obsidian/plugins/new/data.json';
  const deleted = '.obsidian/plugins/old/data.json';
  const regular = '.obsidian/plugins/example/main.js';
  for (const tracked of [false, true]) {
    const files = new Map([[existing, '{"custom":true}'], [deleted, 'keep old settings'], [regular, 'old code']]);
    const adapter = {
      exists: async p => files.has(p), stat: async () => ({ type: 'file' }),
      readBinary: async p => new TextEncoder().encode(files.get(p)).buffer,
      writeBinary: async (p, bytes) => files.set(p, new TextDecoder().decode(bytes)),
      write: async (p, text) => files.set(p, text), mkdir: async () => {},
      remove: async p => files.delete(p), rmdir: async () => {},
    };
    let data = { installed: { trackingVersion: 2, appliedReleaseIds: [], ownedFiles: tracked ? { prior: [{ path: existing, change: '+' }] } : {} } };
    const service = new mod.exports.UpdateService({ vault: { adapter } }, '1.2.0', () => data, async value => { data = value; });
    const zip = new JSZip();
    for (const p of [existing, missing, regular]) zip.file(p, 'bundled default');
    const release = { releaseId: 'new', releaseVersion: '1', files: [existing, missing, regular].map(path => ({ path, change: '+' })) };
    const approvals = [];
    await service.apply({ manifest: {}, release, writes: [existing, missing, regular], deletions: [deleted] }, await zip.generateAsync({ type: 'arraybuffer' }), () => {}, async p => { approvals.push(p); return 'overwrite'; });
    assert.equal(files.get(existing), '{"custom":true}');
    assert.equal(files.get(deleted), 'keep old settings');
    assert.equal(files.get(missing), 'bundled default');
    assert.equal(files.get(regular), 'bundled default');
    assert.deepEqual(approvals, [regular]);
    assert.equal(data.installed.ownedFiles.new.some(f => f.path === existing), false);
  }
  console.log('Passed existing, tracked, deleted, and missing data.json preservation; normal files still update.');
})().catch(error => { console.error(error); process.exitCode = 1; });