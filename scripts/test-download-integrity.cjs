const assert = require('node:assert/strict');
const { build } = require('esbuild');
(async () => {
 const b=await build({entryPoints:['src/update-service.ts'],bundle:true,platform:'node',format:'cjs',external:['obsidian'],write:false});
 const m={exports:{}};new Function('require','module','exports',b.outputFiles[0].text)(n=>n==='obsidian'?{}:require(n),m,m.exports);
 const service=new m.exports.UpdateService({},'1.2.0',()=>({}),async()=>{});
 const zip=new (require('jszip'))();zip.file('test.md','test');
 const bytes=await zip.generateAsync({type:'uint8array'});
 const release={releaseId:'test',files:[{path:'test.md',change:'+'}],deletions:[]};
 await service.validateArchive(bytes.buffer,{},release);
 await assert.rejects(service.validateArchive(bytes.slice(0,30).buffer,{},release),/ZIP is incomplete or corrupt/);
 global.fetch=async()=>new Response(bytes.slice(0,30),{headers:{'Content-Length':String(bytes.length)}});
 await assert.rejects(service.downloadPackage({name:'Test'},{id:'test',token:'test'},'test.zip'),/Incomplete ZIP.*received 30/);
 global.fetch=async()=>new Response(bytes,{headers:{'Content-Length':String(bytes.length)}});
 assert.deepEqual(new Uint8Array(await service.downloadPackage({name:'Test'},{id:'test',token:'test'},'test.zip')),bytes);
 console.log('Passed valid ZIP, missing central directory, and truncated content-length regression checks.');
})().catch(e=>{console.error(e);process.exitCode=1});