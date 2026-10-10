const assert = require('node:assert/strict');
const { build } = require('esbuild');
const JSZip = require('jszip');
(async () => {
  const bundle = await build({ entryPoints: ['src/update-service.ts'], bundle: true, platform: 'node', format: 'cjs', external: ['obsidian'], write: false });
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(n => n === 'obsidian' ? {} : require(n), mod, mod.exports);
  const folder = '80 我的書架';
  const release = { releaseId: 'folder-test', releaseVersion: '1', files: [{ path: folder, change: '+' }], deletions: [] };
  const zip = new JSZip(); zip.folder(folder);
  const archive = await zip.generateAsync({ type: 'arraybuffer' });
  for (const existing of [false, true]) for (const fail of [false, true]) {
    const folders = new Set(existing ? [folder] : []);
    const files = new Map(existing ? [[folder + '/local.md', 'keep']] : []);
    const adapter = {
      exists: async p => folders.has(p) || files.has(p),
      stat: async p => ({ type: folders.has(p) ? 'folder' : 'file' }),
      mkdir: async p => { folders.add(p); },
      write: async (p, v) => { files.set(p, v); },
      readBinary: async p => new TextEncoder().encode(files.get(p)).buffer,
      writeBinary: async (p, v) => { files.set(p, new TextDecoder().decode(v)); },
      remove: async p => { files.delete(p); },
      rmdir: async (p, recursive) => {
        if (!recursive) assert.equal([...files.keys()].some(f => f.startsWith(p + '/')), false);
        folders.delete(p);
        if (recursive) {
          for (const f of files.keys()) if (f.startsWith(p + '/')) files.delete(f);
          for (const f of folders) if (f.startsWith(p + '/')) folders.delete(f);
        }
      },
    };
    let data = { installed: { appliedReleaseIds: [], ownedFiles: {} } };
    const service = new mod.exports.UpdateService({ vault: { adapter } }, '1.2.10', () => data, async v => { if (fail) throw new Error('save failed'); data = v; });
    const plan = await service.validateArchive(archive, {}, release);
    assert.deepEqual(plan.folders, [folder]); assert.deepEqual(plan.writes, []);
    if (fail) await assert.rejects(service.apply(plan, archive, () => {}, async () => 'overwrite'), /save failed/);
    else await service.apply(plan, archive, () => {}, async () => 'overwrite');
    assert.equal(folders.has(folder), existing || !fail);
    if (existing) assert.equal(files.get(folder + '/local.md'), 'keep');
    if (!fail) assert.equal(data.installed.ownedFiles[release.releaseId][0].type, 'folder');
    files.set(folder, 'file conflict'); folders.delete(folder);
    await assert.rejects(service.apply(plan, archive, () => {}, async () => 'overwrite'), /local file with a folder/);
  }
  const service = new mod.exports.UpdateService({}, '1.2.10', () => ({}), async () => {});
  const empty = await new JSZip().generateAsync({ type: 'arraybuffer' });
  await assert.rejects(service.validateArchive(empty, {}, release), /Missing files/);
  const mixed = new JSZip(); mixed.folder('00 說明/new'); mixed.file('00 說明/new/note.md', 'note');
  const mixedRelease = { ...release, files: [{ path: '00 說明/new', change: '+' }, { path: '00 說明/new/note.md', change: '+' }] };
  const plan = await service.validateArchive(await mixed.generateAsync({ type: 'arraybuffer' }), {}, mixedRelease);
  assert.deepEqual(plan.folders, ['00 說明/new']);
  assert.deepEqual(plan.writes, ['00 說明/new/note.md']);
  console.log('Passed folder creation, existing content preservation, rollback, collisions, missing entries, and folder/file inventory checks.');
})().catch(error => { console.error(error); process.exitCode = 1; });
