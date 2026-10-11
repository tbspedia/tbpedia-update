const assert = require('node:assert/strict');
const fs = require('node:fs');
const {build} = require('esbuild');

(async () => {
  const notices=[],modals=[],settings=[];
  class Element {
    constructor(text='') {this.text=text;this.children=[];this.style={};this.attributes={};this.listeners={};}
    empty(){this.children=[];this.text='';}
    createEl(tag,options={}){const el=new Element(options.text??'');el.tag=tag;el.type=options.type;this.children.push(el);return el;}
    createDiv(){return this.createEl('div');}
    setAttribute(key,value){this.attributes[key]=value;}
    addClass(){}
    addEventListener(event,callback){this.listeners[event]=callback;}
    setText(text){this.text=text;}
    insertBefore(child,before){this.children=this.children.filter(el=>el!==child);this.children.splice(this.children.indexOf(before),0,child);}
    querySelectorAll(selector){return this.children.flatMap(child=>[...(selector.split(',').map(s=>s.trim()).includes(child.tag)?[child]:[]),...child.querySelectorAll(selector)]);}
    querySelector(selector){return this.querySelectorAll(selector)[0];}
    textList(){return [this.text,...this.children.flatMap(child=>child.textList())];}
  }
  class Control {
    constructor(){this.options={};}
    setButtonText(text){this.text=text;return this;}
    setCta(){return this;}
    setDisabled(){return this;}
    setValue(value){this.value=value;return this;}
    onClick(callback){this.click=callback;return this;}
    onChange(callback){this.change=callback;return this;}
    addOption(key,value){this.options[key]=value;return this;}
  }
  const obsidian={
    Plugin:class {
      constructor(){this.app={workspace:{onLayoutReady(){}}};this.manifest={version:'1.2.14',id:'tbpedia-update'};}
      async loadData(){return {languageCode:'en',seriesId:'reading',editionId:'standard',tbpedia:'V1'};}
      async saveData(data){this.saved=data;}
      addSettingTab(tab){this.tab=tab;}
      addRibbonIcon(icon,title){this.ribbon=new Element(title);return this.ribbon;}
      addCommand(command){this.command=command;return command;}
    },
    PluginSettingTab:class {constructor(){this.containerEl=new Element();}},
    Setting:class {
      constructor(parent){this.parent=parent;settings.push(this);this.controls=[];}
      setName(name){this.name=name;return this;}
      setDesc(desc){this.desc=desc;return this;}
      addDropdown(callback){return this.control(callback);}
      addToggle(callback){return this.control(callback);}
      addButton(callback){return this.control(callback);}
      control(callback){const control=new Control();this.controls.push(control);callback(control);return this;}
    },
    Modal:class {constructor(){this.contentEl=new Element();}open(){modals.push(this);this.onOpen();}close(){this.onClose();}},
    Notice:class {constructor(text){notices.push(text);}},
    setTooltip(el,text){el.text=text;}, Platform:{isMobile:false},
  };
  const bundle=await build({entryPoints:['src/main.ts'],bundle:true,platform:'node',format:'cjs',external:['obsidian'],write:false});
  const module={exports:{}};
  new Function('require','module','exports',bundle.outputFiles[0].text)(name=>name==='obsidian'?obsidian:require(name),module,module.exports);
  const plugin=new module.exports.default();await plugin.onload();
  const manifest=JSON.parse(fs.readFileSync('manifests/zh-tw/reading/standard/V1/latest.json','utf8'));
  const release=manifest.releases.at(-1);
  for(const language of ['en','ja','fr','es','de','nl','sv','ko','zh-TW','zh-CN','vi','id','th','bo']) {
    const catalog=JSON.parse(fs.readFileSync(`src/locales/${language}.json`,'utf8'));
    plugin.tab.activeTab='settings';
    await plugin.setInterfaceLanguage(language);
    assert.equal(plugin.saved.languageCode,'en','interface selection must preserve collection routing');
    assert.equal(plugin.command.name,catalog['Check for content update']);
    assert.equal(plugin.ribbon.text,catalog['Check Tbpedia updates']);
    assert.ok(plugin.tab.containerEl.textList().includes(catalog.Settings));
    const dropdown=settings.findLast(setting=>setting.name===catalog['Interface language']).controls[0];
    assert.equal(dropdown.options['zh-TW'],'繁體中文');
    assert.equal(dropdown.options.bo,'བོད་སྐད་');
    plugin.tab.activeTab='downloads';plugin.tab.display();
    assert.ok(plugin.tab.containerEl.textList().includes(catalog['No downloaded releases recorded yet. Open Release information to download your first update. The base collection may have been installed separately.']));
    plugin.data.installed={appliedReleaseIds:[release.releaseId],ownedFiles:{[release.releaseId]:[
      {path:'01 文集部/Example.md',change:'+'},{path:'01 文集部/Folder',change:'~',type:'folder'},
    ]}};
    plugin.tab.display();
    assert.ok(plugin.tab.containerEl.textList().includes(catalog['Downloaded files']));
    const details=plugin.tab.containerEl.querySelector('details');details.open=true;details.listeners.toggle();
    assert.ok(details.textList().includes(catalog['File name']));
    assert.ok(details.textList().includes('Example.md'),'filenames must retain their original value');
    plugin.data.installed={appliedReleaseIds:[],ownedFiles:{}};
    plugin.updater={check:async()=>null};await plugin.checkForUpdate();
    assert.equal(notices.at(-1),catalog['Your Tbpedia content is up to date.']);
    plugin.updater.check=async()=>{throw Error('Update service error.');};await plugin.checkForUpdate();
    assert.equal(notices.at(-1),catalog['Could not check for Tbpedia updates: {0}'].replace('{0}',catalog['Update service error.']));
    plugin.updater.check=async()=>({manifest,releases:[release]});await plugin.checkForUpdate();
    assert.ok(modals.at(-1).contentEl.textList().includes(catalog['New Tbpedia release available']));
    assert.ok(settings.at(-1).controls.some(button=>button.text===catalog['Go to download']));
    // Render the asynchronous release table and its failure notice.
    plugin.getReleaseManifest=async()=>manifest;
    plugin.isReleaseInstalled=()=>false;
    plugin.tab.activeTab='releases';plugin.tab.display();await new Promise(resolve=>setImmediate(resolve));
    assert.ok(plugin.tab.containerEl.textList().includes(catalog['Download selected releases']));
    assert.ok(plugin.tab.containerEl.textList().includes(catalog['Published date']));
    plugin.getReleaseManifest=async()=>{throw Error('Update service error.');};
    plugin.tab.display();await new Promise(resolve=>setImmediate(resolve));
    assert.ok(plugin.tab.containerEl.textList().includes(catalog['Could not load release information: {0}'].replace('{0}',catalog['Update service error.'])));
  }
  console.log('Passed live language switching, native language options, command/ribbon, empty downloads, release tables, dialogs and error notices in all 14 languages.');
})().catch(error=>{console.error(error);process.exitCode=1;});
