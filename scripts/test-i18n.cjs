const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { build } = require('esbuild');

(async () => {
  const bundle = await build({entryPoints:['src/i18n.ts'],bundle:true,platform:'node',format:'cjs',write:false});
  const module = {exports:{}};
  new Function('module','exports',bundle.outputFiles[0].text)(module,module.exports);
  const {catalogs,translate,localizedError,resolveLanguage,LANGUAGE_NAMES} = module.exports;
  const languages = ['en','ja','fr','es','de','nl','sv','ko','zh-TW','zh-CN','vi','id','th','bo'];
  assert.deepEqual(Object.keys(catalogs),languages);
  const placeholders = value => [...value.matchAll(/\{\d+\}/g)].map(m=>m[0]).sort();
  const keys = Object.keys(catalogs.en).sort();
  for (const language of languages) {
    const catalog = catalogs[language];
    assert.deepEqual(Object.keys(catalog).sort(),keys,`${language}: complete catalog`);
    assert.ok(LANGUAGE_NAMES[language]);
    const propertiesKey=keys.find(key=>key.startsWith('Preserved properties:'));
    const propertyNames=propertiesKey.split(': ')[1].split('. ')[0];
    assert.ok(catalog[propertiesKey].includes(propertyNames),`${language}: saved property names must remain verbatim`);
    for (const key of keys) {
      assert.ok(catalog[key].trim(),`${language}: ${key}`);
      assert.deepEqual(placeholders(catalog[key]),placeholders(key),`${language}: ${key}`);
      assert.ok(!/ZXQ|XQZ|ZZKEY/.test(catalog[key]),`${language}: no translation markers`);
    }
    const path = '01 文集部/$& {1} article.md';
    const output = translate(language,'Writing {0}…',[path]);
    assert.ok(output.includes(path),'interpolation must preserve paths verbatim');
    assert.equal(localizedError(language,Error('Download failed from Mirror (HTTP 503).')),
      translate(language,'Download failed from {0} (HTTP {1}).',['Mirror',503]));
    assert.equal(localizedError(language,Error('Request body must be JSON.')),translate(language,'Request body must be JSON.'));
    assert.equal(localizedError(language,Error('Unsafe path: ../outside')),translate(language,'Unsafe path: {0}',['../outside']));
    assert.equal(localizedError(language,Error('Unknown release dependency: r1.')),translate(language,'Unknown release dependency: {0}.',['r1']));
    if(language!=='en') {
      assert.notEqual(translate(language,'Choose language…'),'Choose language…');
      const original=console.error; console.error=()=>{};
      try { assert.equal(localizedError(language,Error('Unrecognized upstream failure')),translate(language,'An unexpected error occurred. Please retry.')); }
      finally {console.error=original;}
    }
  }
  assert.equal(resolveLanguage('unsupported'),'en');
  assert.equal(translate(undefined,'Settings'),'Settings');
  // Exercise the installation orchestration with in-memory storage and stubbed network/archive operations.
  const notices=[];
  const serviceBundle=await build({entryPoints:['src/update-service.ts'],bundle:true,platform:'node',format:'cjs',external:['obsidian'],write:false});
  const serviceModule={exports:{}};
  new Function('require','module','exports',serviceBundle.outputFiles[0].text)(name=>name==='obsidian'?{
    Notice:class{constructor(text){notices.push(text);}},Platform:{isMobile:false},
  }:require(name),serviceModule,serviceModule.exports);
  const originalManifest=JSON.parse(fs.readFileSync('manifests/zh-tw/reading/standard/V1/latest.json','utf8'));
  const release={...originalManifest.releases.at(-1),dependsOn:[]};
  const manifest={...originalManifest,releases:[release]};
  for(const language of languages) {
    const data={interfaceLanguage:language,languageCode:'zh-TW',seriesId:'reading',editionId:'standard',tbpedia:'V1',installed:{trackingVersion:2,appliedReleaseIds:[],ownedFiles:{}}};
    const archive=new ArrayBuffer(1);
    const adapter={exists:async()=>false,mkdir:async()=>{},writeBinary:async()=>{},readBinary:async()=>archive};
    const service=new serviceModule.exports.UpdateService({vault:{adapter}},'1.2.14',()=>data,async()=>{});
    service.createTransaction=async()=>({id:'test',token:'test'});
    service.getSources=async()=>[{sourceId:'test',name:'Mirror',priority:1,supportsRange:false}];
    service.probe=async()=>({healthy:true,latencyMs:1});
    service.downloadPackage=async()=>archive;
    service.validateArchive=async()=>({manifest,release,writes:[],deletions:[]});
    service.apply=async()=>{};
    service.report=async()=>{};
    const progress=[];
    await service.install({manifest,releases:[release]},text=>progress.push(text));
    assert.deepEqual(progress,[
      translate(language,'Release {0} of {1}: {2}',[1,1,release.releaseVersion]),
      translate(language,'Creating update transaction…'),translate(language,'Discovering update sources…'),
      translate(language,'Testing update sources…'),translate(language,'Downloading from {0}…',['Mirror']),
      translate(language,'Validating release archive…'),translate(language,'Applying managed files…'),
    ]);
    assert.equal(notices.at(-1),translate(language,'Installed {0} Tbpedia release(s).',[1]));
  }
  // Audit translation calls and all known validation/backend errors, including interpolated templates.
  for (const file of ['src/main.ts','src/update-service.ts','src/manifest.ts','src/path-policy.ts','src/reading-frontmatter.ts','worker/src/index.ts']) {
    const tree=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
    function template(node) {
      if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node))return node.text;
      if(ts.isTemplateExpression(node))return node.head.text+node.templateSpans.map((span,i)=>`{${i}}`+span.literal.text).join('');
    }
    function walk(node) {
      let key;
      if(ts.isCallExpression(node)&&node.expression.getText()==='this.t')key=template(node.arguments[0]);
      if(ts.isNewExpression(node)&&['Error','HttpError'].includes(node.expression.getText())) {
        key=template(node.arguments?.[node.expression.getText()==='HttpError'?1:0]??node);
      }
      if(key)assert.ok(Object.hasOwn(catalogs.en,key),`${file}: missing ${key}`);
      ts.forEachChild(node,walk);
    }
    walk(tree);
  }
  console.log(`Passed ${languages.length} catalogs, ${keys.length} messages, placeholders, validation/backend diagnostics and source coverage.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
