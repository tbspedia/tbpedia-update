const assert = require('node:assert/strict');
const fs = require('node:fs');
const { build } = require('esbuild');
(async () => {
  const requests = [], notices = [];
  let opened = 0;
  const manifest = JSON.parse(fs.readFileSync('manifests/zh-tw/reading/standard/V1/latest.json', 'utf8'));
  const obsidian = {
    Plugin: class { async saveData() {} }, PluginSettingTab: class {}, Setting: class {},
    Modal: class { open() { opened++; } }, Notice: class { constructor(text) { notices.push(text); } },
    requestUrl: async options => { requests.push(options); return { status: 200, json: manifest }; }
  };
  async function load(file) {
    const result = await build({ entryPoints: [file], bundle: true, platform: 'node', format: 'cjs', external: ['obsidian'], write: false });
    const mod = { exports: {} };
    new Function('require', 'module', 'exports', result.outputFiles[0].text)(name => name === 'obsidian' ? obsidian : require(name), mod, mod.exports);
    return mod.exports;
  }
  const { UpdateService } = await load('src/update-service.ts');
  const data = { languageCode: 'zh-TW', seriesId: 'reading', editionId: 'standard', tbpedia: 'V1' };
  const service = new UpdateService({}, '1.2.0', () => data, async () => {});
  await service.getReleaseManifest();
  await service.getReleaseManifest();
  assert.equal(requests.length, 2);
  assert.notEqual(requests[0].url, requests[1].url);
  for (const request of requests) {
    assert.equal(new URL(request.url).hostname, 'raw.githubusercontent.com');
    assert.equal(request.headers['Cache-Control'], 'no-cache');
  }
  const { default: Plugin } = await load('src/main.ts');
  const plugin = new Plugin();
  const latest = manifest.releases.at(-1);
  const key = `${manifest.tbpedia.language.code}/${manifest.tbpedia.series.id}/${manifest.tbpedia.edition.id}/${manifest.Collection}/${latest.releaseId}`;
  plugin.data = { ...data, notifiedReleaseIds: [key] };
  let checks = 0;
  plugin.updater = { check: async () => { checks++; return { manifest, releases: [latest] }; } };
  await plugin.checkForUpdate();
  await plugin.checkForUpdate();
  assert.equal(checks, 2);
  assert.equal(opened, 2);
  await plugin.checkForUpdate(true);
  assert.equal(checks, 3);
  assert.equal(opened, 2);
  plugin.updater.check = async () => null;
  await plugin.checkForUpdate();
  assert.equal(notices.at(-1), 'Your Tbpedia content is up to date.');
  plugin.updater.check = async () => { throw new Error('GitHub unavailable'); };
  await plugin.checkForUpdate();
  assert.match(notices.at(-1), /GitHub unavailable/);
  console.log('Passed fresh GitHub requests, repeated manual announcements, startup deduplication, current and error feedback.');
})().catch(error => { console.error(error); process.exitCode = 1; });