const assert = require('node:assert/strict');
const fs = require('node:fs');
const { build } = require('esbuild');
const JSZip = require('jszip');

async function load(file) {
  const result = await build({ entryPoints: [file], bundle: true, platform: 'node', format: 'cjs', external: ['obsidian'], write: false });
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(
    (name) => name === 'obsidian' ? { Notice: class {}, Platform: {} } : require(name), mod, mod.exports);
  return mod.exports;
}

(async () => {
  const { parseAndValidateManifest } = await load('src/manifest.ts');
  const { UpdateService } = await load('src/update-service.ts');
  const { initializeBaseRelease } = await load('src/base-release.ts');
  const original = JSON.parse(fs.readFileSync('manifests/zh-tw/reading/standard/V1/latest.json', 'utf8'));
  const raw = structuredClone(original);
  raw.minimumPluginVersion = '1.2.0';
  const a = raw.releases[0].releaseId;
  const b = raw.releases[1].releaseId;
  raw.releases[0].dependsOn = [];
  raw.releases[1].dependsOn = [];
  const third = { ...structuredClone(raw.releases[1]), releaseId: 'zh-tw-reading-standard-2026-12-1.1', releaseVersion: 'zh-tw-reading-standard-2026.12.1', publishedAt: '2026-12-01T08:00:00Z', dependsOn: [b] };
  raw.releases.push(third);
  const manifest = parseAndValidateManifest(raw);
  assert.deepEqual(manifest.releases[1].dependsOn, []);
  let data = { languageCode: 'zh-TW', seriesId: 'reading', editionId: 'standard', tbpedia: 'V1', installed: { ownedFiles: {}, appliedReleaseIds: [], releaseVersion: '2026.9.30' } };
  const baseline = { releaseVersion: '2026.9.30', releaseId: '2026-9-30.1' };
  assert.deepEqual(initializeBaseRelease({ ...data, installed: { ...data.installed, appliedReleaseIds: ['2026-9-30.1', b], releaseVersion: '2026.11.1' } }), baseline);
  assert.deepEqual(initializeBaseRelease({ ...data, installed: { ...data.installed, trackingVersion: 2, appliedReleaseIds: [b], ownedFiles: { [b]: [] } } }), {});
  assert.deepEqual(initializeBaseRelease({ ...data, baseRelease: baseline }), baseline);
  data.baseRelease = baseline;
  const paths = new Map();
  const adapter = {
    exists: async (path) => paths.has(path), mkdir: async (path) => paths.set(path, null),
    write: async (path, text) => paths.set(path, text), writeBinary: async (path, bytes) => paths.set(path, bytes),
    readBinary: async (path) => paths.get(path), remove: async (path) => paths.delete(path),
    rmdir: async (path) => { for (const key of paths.keys()) if (key === path || key.startsWith(path + '/')) paths.delete(key); },
    stat: async (path) => ({ type: paths.get(path) === null ? 'folder' : 'file' }),
  };
  const service = new UpdateService({ vault: { adapter } }, '1.2.0', () => data, async (next) => { data = next; });
  const selected = (...ids) => service.getSelectedBatch(manifest, new Set(ids)).releases.map((release) => release.releaseId);
  assert.deepEqual(selected(b), [b]);
  assert.deepEqual(selected(third.releaseId), [b, third.releaseId]);
  assert.deepEqual(selected(a, third.releaseId), [a, b, third.releaseId]);
  assert.throws(() => selected(), /Select at least/);
  assert.throws(() => selected('unknown'), /Unknown release/);
  const legacyManifest = structuredClone(original);
  for (const release of legacyManifest.releases) delete release.dependsOn;
  const sequential = parseAndValidateManifest(legacyManifest);
  assert.deepEqual(service.getSelectedBatch(sequential, new Set([b])).releases.map((release) => release.releaseId), [a, b]);
  const transitive = structuredClone(raw);
  transitive.releases[1].dependsOn = [a];
  assert.equal(service.getSelectedBatch(parseAndValidateManifest(transitive), new Set([third.releaseId])).releases.length, 3);
  for (const dependency of [[b], ['unknown'], [a, a], 'invalid', null]) {
    const invalid = structuredClone(raw); invalid.releases[0].dependsOn = dependency;
    assert.throws(() => parseAndValidateManifest(invalid), /dependsOn|depends on/);
  }
  const self = structuredClone(raw); self.releases[0].dependsOn = [a];
  assert.throws(() => parseAndValidateManifest(self), /earlier release/);
  const oldVersion = structuredClone(raw); oldVersion.minimumPluginVersion = '1.1.0';
  assert.throws(() => parseAndValidateManifest(oldVersion), /1.2.0/);

  // Exercise real installation persistence with an in-memory vault and ZIP.
  const release = manifest.releases[1];
  const zip = new JSZip(); for (const file of release.files) zip.file(file.path, 'release content');
  const archive = await zip.generateAsync({ type: 'arraybuffer' });
  await service.apply({ manifest, release, writes: release.files.map((file) => file.path), deletions: [] }, archive, () => {}, async () => 'overwrite');
  assert.equal(data.installed.trackingVersion, 2);
  assert.deepEqual(data.baseRelease, baseline);
  assert.deepEqual(data.installed.appliedReleaseIds, [b]);
  assert.equal(new Date(data.installed.downloadedAt[b]).toISOString(), data.installed.downloadedAt[b]);
  assert.equal(data.installed.downloadedAt[a], undefined);
  assert.equal(service.isReleaseInstalled(manifest.releases[0], manifest), false);
  assert.equal(service.isReleaseInstalled(release, manifest), true);
  assert.deepEqual(selected(third.releaseId), [third.releaseId]);
  // A later install of a skipped older release must not hide the newer one.
  data.installed.releaseId = a; data.installed.releaseVersion = manifest.releases[0].releaseVersion;
  data.installed.appliedReleaseIds.push(a);
  assert.equal(service.isReleaseInstalled(release, manifest), true);
  // Legacy sequential state is preserved before switching to individual IDs.
  data.installed = { ownedFiles: {}, appliedReleaseIds: [], releaseVersion: '2026.10.1', releaseId: '2026-10-1.1' };
  await service.apply({ manifest, release, writes: release.files.map((file) => file.path), deletions: [] }, archive, () => {}, async () => 'overwrite');
  assert(data.installed.appliedReleaseIds.includes(a));
  assert(data.installed.appliedReleaseIds.includes(b));
  // Explicit deletion of untracked collection Markdown, and boundary protections.
  const emptyArchive = await new JSZip().generateAsync({ type: 'arraybuffer' });
  const deletionRelease = { ...third, files: [], deletions: [] };
  async function applyDeletion(path, zipArchive = emptyArchive, writes = []) {
    const deleting = { ...deletionRelease, files: [{ path, change: '-' }], deletions: [path] };
    await service.apply({ manifest, release: deleting, writes, deletions: [path] }, zipArchive, () => {}, async () => 'overwrite');
  }
  const baseNote = '01 文集部/測試更新-2026-11-1.md';
  data.installed = { ownedFiles: {}, appliedReleaseIds: [], trackingVersion: 2 };
  paths.set(baseNote, Buffer.from('base content'));
  await applyDeletion(baseNote);
  assert.equal(paths.has(baseNote), false);
  assert.deepEqual(data.installed.ownedFiles[third.releaseId], [{ path: baseNote, change: '-' }]);
  for (const protectedPath of ['01 文集部/image.png', 'personal.md', '.obsidian/app.json', 'Personal/note.md']) {
    paths.set(protectedPath, Buffer.from('keep'));
    await assert.rejects(() => applyDeletion(protectedPath), /not owned|outside the managed boundary/);
    assert.equal(paths.has(protectedPath), true);
  }
  const folder = '01 文集部/folder.md';
  paths.set(folder, null);
  await assert.rejects(() => applyDeletion(folder), /local folder/);
  assert.equal(paths.get(folder), null);
  // Owned files retain their existing deletion behavior.
  const tracked = '01 文集部/tracked.png';
  paths.set(tracked, Buffer.from('tracked'));
  data.installed.ownedFiles.earlier = [{ path: tracked, change: '+' }];
  await applyDeletion(tracked);
  assert.equal(paths.has(tracked), false);
  // A failed write after deletion restores the original untracked note.
  paths.set(baseNote, Buffer.from('restore me'));
  const beforeFailure = structuredClone(data.installed);
  await assert.rejects(() => applyDeletion(baseNote, emptyArchive, ['01 文集部/missing.md']), /Archive entry disappeared/);
  assert.equal(Buffer.from(paths.get(baseNote)).toString(), 'restore me');
  assert.deepEqual(data.installed, beforeFailure);
  console.log('Passed untracked collection deletion, protected files/folders, owned-file deletion, and rollback.');
  console.log('Passed dependency validation, independent and recursive selection, legacy fallback, ZIP installation persistence, skipped-release status, and legacy migration.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
