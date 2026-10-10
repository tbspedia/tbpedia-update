const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { build } = require('esbuild');
const JSZip = require('jszip');

// Exercise real YAML parsing, including flow maps, aliases and block scalars.
const yamlCache = new Map();
function yaml(mode, value) {
  const cacheKey = JSON.stringify([mode, value]);
  if (yamlCache.has(cacheKey)) return structuredClone(yamlCache.get(cacheKey));
  const script = mode === 'parse'
    ? 'import sys,json,yaml; print(json.dumps(yaml.safe_load(sys.stdin.read()),ensure_ascii=False,default=str))'
    : 'import sys,json,yaml; print(yaml.safe_dump(json.load(sys.stdin),allow_unicode=True,sort_keys=False),end="")';
  const result = execFileSync('python', ['-c', script], { input: mode === 'parse' ? value : JSON.stringify(value), encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' }, stdio: ['pipe', 'pipe', 'pipe'] });
  const parsed = mode === 'parse' ? JSON.parse(result) : result;
  yamlCache.set(cacheKey, parsed);
  return structuredClone(parsed);
}
async function load(file) {
  const bundle = await build({ entryPoints: [file], bundle: true, platform: 'node', format: 'cjs', external: ['obsidian'], write: false });
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(name => name === 'obsidian'
    ? { parseYaml: value => yaml('parse', value), stringifyYaml: value => yaml('dump', value) } : require(name), mod, mod.exports);
  return mod.exports;
}
(async () => {
  const { preserveReadingFrontmatter: preserve, READING_PROPERTIES: keys } = await load('src/reading-frontmatter.ts');
  const saved = '計劃閱讀: FALSE\n閱讀狀態: 在讀\n閱讀層次: 分析閱讀\n閱讀次數: 4\n想讀日期: \n在讀日期: "2026-10-09"\n已讀日期: \n不讀日期: \n棄讀日期: \n閱讀感想: |\n  我的第一行感想\n  第二行感想\n閱讀推薦: [朋友, 學生]\n評分: 5\n文章評分: \n文章推薦: \n';
  const old = `---\ntitle: 舊標題\n${saved}---\nOld body`;
  const replacement = `---\ntitle: 新標題\n${keys.map(key => `${key}: reset\n`).join('')}new: true\n---\nNew body`;
  const result = preserve(old, replacement);
  const parsed = text => yaml('parse', /^\uFEFF?---\r?\n([\s\S]*?)\r?\n(?:---|\.\.\.)/.exec(text)[1]);
  for (const key of keys) assert.deepEqual(parsed(result)[key], parsed(old)[key]);
  assert.equal(parsed(result).title, '新標題');
  assert.equal(parsed(result).new, true);
  assert.ok(result.endsWith('New body'));
  assert.ok(result.includes(saved));
  for (const rating of [0, 4]) {
    const article = parsed(preserve(`---\n文章評分: ${rating}\n文章推薦: [朋友, 學生]\n---\nOld`, replacement));
    assert.equal(article.文章評分, rating);
    assert.deepEqual(article.文章推薦, ['朋友', '學生']);
  }
  assert.ok(preserve(old, 'Body without frontmatter').includes(saved));
  assert.ok(preserve(old, 'Body without frontmatter').endsWith('Body without frontmatter'));
  assert.equal(preserve('No frontmatter', replacement), replacement);
  assert.equal(preserve('---\ntitle: old\n---\nold', replacement), replacement);
  assert.ok(preserve(old.replace(/\n/g, '\r\n'), replacement.replace(/\n/g, '\r\n')).includes(saved.replace(/\n/g, '\r\n')));
  assert.ok(preserve('\uFEFF' + old, '\uFEFF' + replacement).startsWith('\uFEFF---\n'));
  assert.equal(parsed(preserve('---\n{評分: 3, title: old}\n---\nOld', '---\n{評分: 0, title: new}\n---\nNew')).評分, 3);
  assert.equal(parsed(preserve('---\n"評分": 2 # comment\n---\nOld', '---\n評分: 0\n---\nNew')).評分, 2);
  const alias = preserve('---\nshared: &value [a, b]\n閱讀推薦: *value\n---\nOld', '---\ntitle: new\n---\nNew');
  assert.deepEqual(parsed(alias).閱讀推薦, ['a', 'b']);
  assert.throws(() => preserve('---\n評分: 2', replacement), /closing delimiter/);
  assert.throws(() => preserve('---\n評分: [invalid\n---\nOld', replacement));

  const { UpdateService } = await load('src/update-service.ts');
  const path = '01 文集部/note.MD';
  for (const tracked of [false, true]) for (const outcome of ['approve', 'cancel', 'fail']) {
    const files = new Map([[path, old]]);
    const adapter = {
      exists: async p => files.has(p), stat: async () => ({ type: 'file' }),
      readBinary: async p => new TextEncoder().encode(files.get(p)).buffer,
      writeBinary: async (p, value) => files.set(p, new TextDecoder().decode(value)),
      write: async (p, value) => files.set(p, value), mkdir: async () => {},
      remove: async p => files.delete(p), rmdir: async () => {},
    };
    let data = { installed: { trackingVersion: 2, appliedReleaseIds: [], ownedFiles: tracked ? { prior: [{ path, change: '+' }] } : {} } };
    const originalData = structuredClone(data);
    const service = new UpdateService({ vault: { adapter } }, '1.2.12', () => data, async next => {
      if (outcome === 'fail') throw new Error('save failed');
      data = next;
    });
    const zip = new JSZip(); zip.file(path, replacement);
    const release = { releaseId: 'new', releaseVersion: '1', files: [{ path, change: '~' }] };
    const approvals = [];
    const install = service.apply({ manifest: {}, release, writes: [path], deletions: [] }, await zip.generateAsync({ type: 'arraybuffer' }), () => {}, async p => {
      approvals.push(p); return outcome === 'cancel' ? 'cancel' : 'overwrite';
    });
    if (outcome === 'approve') { await install; assert.equal(files.get(path), result); }
    else {
      await assert.rejects(install, outcome === 'cancel' ? /cancelled/ : /save failed/);
      assert.equal(files.get(path), old);
      assert.deepEqual(data, originalData);
    }
    assert.deepEqual(approvals, [path]);
  }
  console.log('Passed reading property preservation, formatting, complex YAML, permission, cancellation and rollback checks.');
})().catch(error => { console.error(error); process.exitCode = 1; });
