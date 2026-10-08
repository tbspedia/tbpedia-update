const assert = require('node:assert/strict');
const { build } = require('esbuild');

async function load(file, obsidian = {}) {
  const result = await build({ entryPoints: [file], bundle: true, platform: 'node', format: 'cjs', external: ['obsidian'], write: false });
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(
    name => name === 'obsidian' ? obsidian : require(name), mod, mod.exports);
  return mod.exports;
}

(async () => {
  const { initializePluginData } = await load('src/plugin-data.ts');
  const expected = {
    languageCode: '', seriesId: '', editionId: '', tbpedia: 'V1',
    baseRelease: { releaseVersion: '2026.9.30', releaseId: '2026-9-30.1' },
    checkForUpdatesOnStartup: true, installed: { ownedFiles: {}, appliedReleaseIds: [] }
  };
  for (const saved of [undefined, null, {}]) {
    assert.equal(JSON.stringify(initializePluginData(saved)), JSON.stringify(expected));
  }
  const original = {
    languageCode: 'zh-TW', seriesId: 'reading', editionId: 'advanced', Collection: 'V2',
    checkForUpdatesOnStartup: false, interfaceLanguage: 'en',
    baseRelease: { releaseVersion: '2025.1.1', releaseId: '2025-1-1.1' },
    installed: { trackingVersion: 2, ownedFiles: {}, appliedReleaseIds: ['completed-update'] }
  };
  const snapshot = structuredClone(original);
  const migrated = initializePluginData(original);
  assert.equal(migrated.tbpedia, 'V2');
  assert.equal(Object.hasOwn(migrated, 'Collection'), false);
  assert.deepEqual(migrated.baseRelease, original.baseRelease);
  assert.deepEqual(migrated.installed, original.installed);
  assert.equal(migrated.languageCode, 'zh-TW');
  assert.equal(migrated.editionId, 'advanced');
  assert.equal(migrated.checkForUpdatesOnStartup, false);
  assert.equal(migrated.interfaceLanguage, 'en');
  assert.deepEqual(original, snapshot);
  assert.equal(initializePluginData({ ...original, tbpedia: 'V3' }).tbpedia, 'V3');
  assert.deepEqual(initializePluginData({ ...original, baseRelease: {} }).baseRelease, {});
  const other = initializePluginData();
  other.installed.appliedReleaseIds.push('temporary');
  other.baseRelease.releaseVersion = 'changed';
  assert.deepEqual(initializePluginData(), expected);

  class Plugin {
    constructor() {
      this.manifest = { version: '1.2.0', id: 'tbpedia-update' };
      this.app = { workspace: { onLayoutReady: fn => { this.onReady = fn; } } };
    }
    async loadData() { return null; }
    async saveData(value) { this.saved = structuredClone(value); }
    addSettingTab() {}
    addRibbonIcon() {}
    addCommand() {}
  }
  const { default: UpdatePlugin } = await load('src/main.ts', {
    Plugin, Modal: class {}, PluginSettingTab: class {}, Setting: class {}, Notice: class {}
  });
  const plugin = new UpdatePlugin();
  await plugin.onload();
  assert.equal(JSON.stringify(plugin.saved), JSON.stringify(expected));
  plugin.onReady(); // Blank identity must not trigger a startup request.
  console.log('Passed exact first-install data.json, legacy version migration, history/baseline preservation and plugin onload persistence.');
})().catch(error => { console.error(error); process.exitCode = 1; });
