import { translate, localizedError, LANGUAGE_NAMES } from "./i18n";
import { App, Command, Modal, Notice, Plugin, PluginSettingTab, Setting, setTooltip } from "obsidian";
import { OverwriteDecision, UpdateService } from "./update-service";
import { PluginData, ReleaseEntry, ReleaseManifest, SUPPORTED_LANGUAGES, UpdateBatch } from "./types";
import { initializePluginData } from "./plugin-data";

export default class TbpediaUpdatePlugin extends Plugin {
  private data: PluginData = initializePluginData();
  private updater!: UpdateService;
  private settingsTab!: TbpediaUpdateSettingsTab;
  private checkCommand?: Command;
  private checkRibbon?: HTMLElement;
  private t = (key: string, values?: readonly unknown[]): string => translate(this.interfaceLanguage, key, values);
  private checking = false;
  private installing = false;

  async onload(): Promise<void> {
    this.data = initializePluginData(await this.loadData());
    await this.persistData(this.data);
    this.updater = new UpdateService(this.app, this.manifest.version, () => this.data, (data) => this.persistData(data));
    this.settingsTab = new TbpediaUpdateSettingsTab(this.app, this);
    this.addSettingTab(this.settingsTab);
    this.checkRibbon = this.addRibbonIcon("download", this.t("Check Tbpedia updates"), () => void this.checkForUpdate());
    this.checkCommand = this.addCommand({ id: "check-for-content-update", name: this.t("Check for content update"), callback: () => void this.checkForUpdate() });
    this.app.workspace.onLayoutReady(() => {
      if (this.data.checkForUpdatesOnStartup && this.data.languageCode && this.data.seriesId && this.data.editionId) void this.checkForUpdate(true);
    });
  }

  private async checkForUpdate(silentWhenCurrent = false): Promise<void> {
    if (this.checking) return;
    this.checking = true;
    try {
      const batch = await this.updater.check();
      if (!batch) { if (!silentWhenCurrent) new Notice(this.t("Your Tbpedia content is up to date.")); return; }
      const latest = batch.releases.at(-1)!;
      const key = `${batch.manifest.tbpedia.language.code}/${batch.manifest.tbpedia.series.id}/${batch.manifest.tbpedia.edition.id}/${batch.manifest.Collection}/${latest.releaseId}`;
      if (silentWhenCurrent && this.data.notifiedReleaseIds?.includes(key)) return;
      if (!this.data.notifiedReleaseIds?.includes(key)) await this.persistData({ ...this.data, notifiedReleaseIds: [...(this.data.notifiedReleaseIds ?? []), key] });
      new ReleaseNoticeModal(this.app, batch.manifest, latest, () => this.openReleaseInformation(), () => this.interfaceLanguage).open();
    } catch (error) { new Notice(this.t("Could not check for Tbpedia updates: {0}", [localizedError(this.interfaceLanguage, error)])); }
    finally { this.checking = false; }
  }

  private openReleaseInformation(): void {
    const settings = (this.app as App & { setting?: { open(): void; openTabById(id: string): void } }).setting;
    this.settingsTab.selectReleases();
    if (settings) { settings.open(); settings.openTabById(this.manifest.id); }
    else new Notice(this.t("Open Settings → True Buddha Pedia Update → Release information to select releases."));
  }

  getSelectedBatch(manifest: ReleaseManifest, selectedIds: Set<string>): UpdateBatch { return this.updater.getSelectedBatch(manifest, selectedIds); }

  async installSelected(batch: UpdateBatch, progress: (message: string) => void): Promise<void> {
    if (this.installing) throw new Error("A Tbpedia update is already in progress.");
    this.installing = true;
    try {
      const current = await this.updater.getReleaseManifest(true);
      if (JSON.stringify(current) !== JSON.stringify(batch.manifest)) throw new Error("Release information has changed. Refresh and select releases again.");
      const selected = this.updater.getSelectedBatch(current, new Set(batch.releases.map((release) => release.releaseId)));
      await this.updater.install(selected, progress,
        (path) => new Promise<OverwriteDecision>((resolve) => new OverwriteModal(this.app, path, resolve, () => this.interfaceLanguage).open()));
      this.settingsTab.display();
    } finally { this.installing = false; }
  }

  async setInterfaceLanguage(interfaceLanguage: PluginData["interfaceLanguage"]): Promise<void> {
    await this.persistData({ ...this.data, interfaceLanguage });
    if (this.checkRibbon) setTooltip(this.checkRibbon, this.t("Check Tbpedia updates"));
    if (this.checkCommand) this.checkCommand.name = this.t("Check for content update");
    this.settingsTab.display();
  }

  async setCheckForUpdatesOnStartup(checkForUpdatesOnStartup: boolean): Promise<void> {
    await this.persistData({ ...this.data, checkForUpdatesOnStartup });
  }

  getReleaseManifest(forceRefresh = false): Promise<ReleaseManifest> { return this.updater.getReleaseManifest(forceRefresh); }
  isReleaseInstalled(release: ReleaseEntry, manifest: ReleaseManifest): boolean { return this.updater.isReleaseInstalled(release, manifest); }

  private async persistData(data: PluginData): Promise<void> {
    const { languageCode, seriesId, editionId, tbpedia, baseRelease, ...rest } = data;
    this.data = { languageCode, seriesId, editionId, tbpedia, baseRelease, ...rest };
    await this.saveData(this.data);
  }

  get downloadData(): PluginData { return this.data; }

  get interfaceLanguage(): PluginData["interfaceLanguage"] { return this.data.interfaceLanguage ?? (this.data.languageCode || undefined); }
  get checkForUpdatesOnStartup(): boolean { return this.data.checkForUpdatesOnStartup; }
  get baseRelease(): NonNullable<PluginData["baseRelease"]> { return this.data.baseRelease ?? {}; }
}

class TbpediaUpdateSettingsTab extends PluginSettingTab {
  private activeTab: "settings" | "releases" | "downloads" = "settings";
  private t = (key: string, values?: readonly unknown[]): string => translate(this.plugin.interfaceLanguage, key, values);
  private renderId = 0;
  constructor(app: App, private readonly plugin: TbpediaUpdatePlugin) { super(app, plugin); }
  selectReleases(): void { this.activeTab = "releases"; }
  display(forceRefresh = false): void {
    const { containerEl } = this;
    containerEl.empty();
    const renderId = ++this.renderId;
    containerEl.createEl("h2", { text: "True Buddha Pedia Update" });
    const tabs = containerEl.createDiv();
    tabs.setAttribute("role", "tablist");
    tabs.style.display = "flex";
    tabs.style.gap = "8px";
    tabs.style.marginBottom = "16px";
    for (const [id, label] of [["settings", this.t("Settings")], ["releases", this.t("Release information")], ["downloads", this.t("My Download")]] as const) {
      const button = tabs.createEl("button", { text: label });
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(this.activeTab === id));
      button.id = `tbpedia-tab-${id}`;
      button.setAttribute("aria-controls", "tbpedia-settings-panel");
      if (this.activeTab === id) button.addClass("mod-cta");
      button.addEventListener("click", () => { this.activeTab = id; this.display(); });
    }
    const panel = containerEl.createDiv();
    panel.id = "tbpedia-settings-panel";
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", `tbpedia-tab-${this.activeTab}`);
    if (this.activeTab === "releases") {
      void this.displayReleases(panel, renderId, forceRefresh);
      return;
    }
    if (this.activeTab === "downloads") { this.displayDownloads(panel); return; }
    new Setting(panel)
      .setName(this.t("Interface language"))
      .setDesc(this.t("Select your preferred interface language. Content updates use the collection language configured in data.json."))
      .addDropdown((dropdown) => {
        dropdown.addOption("", this.t("Choose language…"));
        for (const code of SUPPORTED_LANGUAGES) dropdown.addOption(code, LANGUAGE_NAMES[code]);
        dropdown.setValue(this.plugin.interfaceLanguage ?? "");
        dropdown.onChange(async (value) => { await this.plugin.setInterfaceLanguage(value ? value as PluginData["interfaceLanguage"] : undefined); });
      });
    new Setting(panel)
      .setName(this.t("Check for content updates on startup"))
      .setDesc(this.t("Check for Tbpedia content updates when Obsidian starts. Enabled by default."))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.checkForUpdatesOnStartup);
        toggle.onChange(async (value) => { await this.plugin.setCheckForUpdatesOnStartup(value); });
      });
  }

  private displayDownloads(panel: HTMLElement): void {
    panel.createEl("h3", { text: this.t("My Download") });
    panel.createEl("p", { text: this.t("Your locally recorded releases and file changes from the plugin’s data.json. Removed files are changes, not downloads. File lists reflect recorded changes, not the current contents of your vault.") });
    const data = this.plugin.downloadData;
    const metadata = panel.createEl("dl");
    metadata.style.display = "grid";
    metadata.style.gridTemplateColumns = "max-content 1fr";
    metadata.style.gap = "8px 16px";
    for (const [label, value] of [
      [this.t("Title"), data.title || this.t("Not configured")],
      [this.t("Language"), data.languageCode || this.t("Not configured")], [this.t("Series"), data.seriesId || this.t("Not configured")],
      [this.t("Edition"), data.editionId || this.t("Not configured")], [this.t("Collection"), data.tbpedia],
      [this.t("Base release"), data.baseRelease?.releaseVersion ?? data.baseRelease?.releaseId ?? this.t("Not recorded")],
      [this.t("Latest installed release"), data.installed.releaseVersion ?? data.installed.releaseId ?? this.t("Not recorded")],
    ]) {
      metadata.createEl("dt", { text: label });
      metadata.createEl("dd", { text: value }).style.margin = "0";
    }
    const installed = data.installed;
    const ids = [...new Set([...Object.keys(installed.ownedFiles), ...installed.appliedReleaseIds,
      ...(installed.releaseId ? [installed.releaseId] : [])])].reverse();
    if (!ids.length) {
      panel.createEl("p", { text: this.t("No downloaded releases recorded yet. Open Release information to download your first update. The base collection may have been installed separately.") });
      return;
    }
    const makeTable = (parent: HTMLElement, caption: string, headers: string[]): HTMLTableSectionElement => {
      const wrapper = parent.createDiv();
      wrapper.style.overflowX = "auto";
      wrapper.style.maxWidth = "100%";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", this.t("{0} — scroll horizontally to view all columns", [caption]));
      const table = wrapper.createEl("table");
      table.style.width = "max-content";
      table.style.tableLayout = "auto";
      table.style.whiteSpace = "nowrap";
      table.style.borderCollapse = "collapse";
      table.createEl("caption", { text: caption });
      const head = table.createEl("thead").createEl("tr");
      for (const label of headers) head.createEl("th", { text: label }).setAttribute("scope", "col");
      return table.createEl("tbody");
    };
    const body = makeTable(panel, this.t("Recorded releases (most recently applied first)"), [this.t("Release ID"), this.t("Status"), this.t("Download date"), this.t("File details"), this.t("Downloaded files"), this.t("Added"), this.t("Updated"), this.t("Removed")]);
    for (const id of ids) {
      const files = installed.ownedFiles[id] ?? [];
      const recorded = Object.prototype.hasOwnProperty.call(installed.ownedFiles, id);
      const completed = installed.appliedReleaseIds.includes(id) || installed.releaseId === id;
      const added = files.filter(file => file.change === "+").length;
      const updated = files.filter(file => file.change === "~").length;
      const removed = files.filter(file => file.change === "-").length;
      const timestamp = installed.downloadedAt?.[id];
      const downloadedAt = timestamp ? new Date(timestamp) : undefined;
      const downloadDate = downloadedAt && Number.isFinite(downloadedAt.getTime())
        ? downloadedAt.toLocaleString(this.plugin.interfaceLanguage ?? "en") : this.t("Not recorded");
      const row = body.createEl("tr");
      for (const value of [id, completed ? this.t("Installed") : this.t("File records only"), downloadDate, recorded ? String(added + updated) : this.t("Not recorded"),
        recorded ? String(added) : "—", recorded ? String(updated) : "—", recorded ? String(removed) : "—"]) row.createEl("td", { text: value });
      const cell = row.createEl("td");
      row.insertBefore(cell, row.children[3]);
      if (!files.length) { cell.setText(recorded ? this.t("No file changes recorded") : this.t("File details were not saved for this release")); continue; }
      const details = cell.createEl("details");
      details.createEl("summary", { text: this.t("View {0} file changes", [files.length]) });
      details.addEventListener("toggle", () => {
        if (!details.open || details.querySelector("table")) return;
        const fileBody = makeTable(details, this.t("Files for {0}", [id]), [this.t("File name"), this.t("Folder"), this.t("Change")]);
        for (const file of files) {
          const fileRow = fileBody.createEl("tr");
          const split = file.path.lastIndexOf("/");
          const name = fileRow.createEl("td", { text: file.path.slice(split + 1) });
          name.title = file.path;
          fileRow.createEl("td", { text: split < 0 ? this.t("Vault root") : file.path.slice(0, split) }).style.overflowWrap = "anywhere";
          fileRow.createEl("td", { text: (file.type === "folder" ? this.t("Folder: ") : "") + (file.change === "+" ? this.t("Added") : file.change === "~" ? this.t("Updated") : this.t("Removed")) });
        }
        styleCells(details);
      });
    }
    function styleCells(root: HTMLElement): void {
      for (const cell of Array.from(root.querySelectorAll<HTMLElement>("th, td"))) {
        cell.style.padding = "10px";
        cell.style.textAlign = "left";
        cell.style.verticalAlign = "top";
        cell.style.borderBottom = "1px solid var(--background-modifier-border)";
        cell.style.overflowWrap = "anywhere";
      }
    }
    styleCells(panel);
  }

  hide(): void { this.renderId++; }

  private async displayReleases(panel: HTMLElement, renderId: number, forceRefresh: boolean): Promise<void> {
    new Setting(panel)
      .setName(this.t("Release information"))
      .setDesc(this.t("Releases for this vault’s configured collection. Downloaded status indicates a completed installation recorded by the plugin."))
      .addButton((button) => button.setButtonText(this.t("Refresh")).onClick(() => this.display(true)));
    const content = panel.createDiv();
    content.setAttribute("aria-live", "polite");
    content.createEl("p", { text: this.t("Loading release information…") });
    try {
      const manifest = await this.plugin.getReleaseManifest(forceRefresh);
      if (renderId !== this.renderId) return;
      content.empty();
      content.createEl("h3", { text: manifest.title });
      const metadata = content.createEl("dl");
      metadata.style.display = "grid";
      metadata.style.gridTemplateColumns = "max-content 1fr";
      metadata.style.columnGap = "16px";
      for (const [label, value] of [
        [this.t("Language Code"), manifest.tbpedia.language.code],
        [this.t("Series"), manifest.tbpedia.series.id],
        [this.t("Edition"), manifest.tbpedia.edition.id],
        [this.t("Collection"), manifest.Collection],
        [this.t("Base Release"), this.plugin.baseRelease.releaseVersion ?? this.plugin.baseRelease.releaseId ?? this.t("Not configured")],
        [this.t("Base Release ID"), this.plugin.baseRelease.releaseId ?? this.t("Not configured")],
      ]) {
        metadata.createEl("dt", { text: label });
        const detail = metadata.createEl("dd", { text: value });
        detail.style.margin = "0";
      }
      const wrapper = content.createDiv();
      wrapper.style.overflowX = "auto";
      const table = wrapper.createEl("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.createEl("caption", { text: this.t("Available releases (newest first)") });
      const header = table.createEl("thead").createEl("tr");
      for (const label of [this.t("Select"), this.t("ReleaseVersion"), this.t("Published date"), this.t("Downloaded"), this.t("ReleaseNote: Summary"), this.t("Added"), this.t("Updated"), this.t("Removed"), this.t("Dependencies")]) {
        const cell = header.createEl("th", { text: label });
        cell.setAttribute("scope", "col");
      }
      const body = table.createEl("tbody");
      const selectedIds = new Set<string>();
      const checkboxes = new Map<string, HTMLInputElement>();
      const selectionStatus = content.createEl("p", { text: this.t("Select releases to download. Required dependencies are included automatically; independent releases can be selected on their own.") });
      const download = content.createEl("button", { text: this.t("Download selected releases") });
      download.addClass("mod-cta");
      download.disabled = true;
      const updateSelection = (): void => {
        download.disabled = selectedIds.size === 0;
        if (!selectedIds.size) { selectionStatus.setText(this.t("Select releases to download. Required dependencies are included automatically; independent releases can be selected on their own.")); return; }
        const batch = this.plugin.getSelectedBatch(manifest, selectedIds);
        const included = new Set(batch.releases.map((release) => release.releaseId));
        for (const [id, checkbox] of checkboxes) checkbox.checked = included.has(id);
        selectionStatus.setText(this.t("{0} release(s) will be downloaded and installed in order, including required dependencies.", [batch.releases.length]));
      };
      download.addEventListener("click", () => {
        if (!selectedIds.size) return;
        const batch = this.plugin.getSelectedBatch(manifest, selectedIds);
        new UpdateModal(this.app, batch, (progress) => this.plugin.installSelected(batch, progress), () => this.plugin.interfaceLanguage).open();
      });
      for (const release of [...manifest.releases].reverse()) {
        const row = body.createEl("tr");
        const installed = this.plugin.isReleaseInstalled(release, manifest);
        const checkbox = row.createEl("td").createEl("input", { type: "checkbox" });
        checkbox.disabled = installed;
        checkbox.setAttribute("aria-label", this.t("Select {0}", [release.releaseVersion]));
        if (!installed) checkboxes.set(release.releaseId, checkbox);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) selectedIds.add(release.releaseId);
          else {
            for (const id of [...selectedIds]) {
              if (this.plugin.getSelectedBatch(manifest, new Set([id])).releases.some((entry) => entry.releaseId === release.releaseId)) selectedIds.delete(id);
            }
          }
          for (const item of checkboxes.values()) item.checked = false;
          updateSelection();
        });
        const values = [release.releaseVersion, release.publishedAt.slice(0, 10),
          installed ? this.t("Yes (installed)") : this.t("No"),
          release.releaseNotes.summary, String(release.releaseNotes.added), String(release.releaseNotes.updated), String(release.releaseNotes.removed),
          release.dependsOn === undefined ? this.t("All earlier releases") : release.dependsOn.length ? release.dependsOn.join(", ") : this.t("None (independent)")];
        for (const [index, value] of values.entries()) {
          const cell = row.createEl("td", { text: value });
          if (index === 1) cell.title = release.publishedAt;
        }
      }
      for (const cell of Array.from(table.querySelectorAll("th, td"))) {
        const element = cell as HTMLElement;
        element.style.padding = "8px";
        element.style.textAlign = "left";
        element.style.verticalAlign = "top";
        element.style.borderBottom = "1px solid var(--background-modifier-border)";
      }
    } catch (error) {
      if (renderId !== this.renderId) return;
      content.empty();
      content.createEl("p", { text: this.t("Could not load release information: {0}", [localizedError(this.plugin.interfaceLanguage, error)]) });
    }
  }
}

class ReleaseNoticeModal extends Modal {
  private t = (key: string, values?: readonly unknown[]): string => translate(this.language(), key, values);
  constructor(app: App, private readonly manifest: ReleaseManifest, private readonly release: ReleaseEntry, private readonly goToDownload: () => void, private readonly language: () => PluginData["interfaceLanguage"]) { super(app); }
  onOpen(): void {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: this.t("New Tbpedia release available") });
    contentEl.createEl("h3", { text: this.manifest.title });
    contentEl.createEl("p", { text: this.release.releaseVersion });
    contentEl.createEl("p", { text: this.t("Published: {0}", [this.release.publishedAt.slice(0, 10)]) });
    contentEl.createEl("p", { text: this.release.releaseNotes.summary });
    contentEl.createEl("p", { text: this.t("Added: {0} · Updated: {1} · Removed: {2}", [this.release.releaseNotes.added, this.release.releaseNotes.updated, this.release.releaseNotes.removed]) });
    contentEl.createEl("p", { text: this.t("Go to Settings → Release information to select releases for download. This announcement will appear again when a new release is available.") });
    new Setting(contentEl)
      .addButton((button) => button.setButtonText(this.t("Acknowledge")).onClick(() => this.close()))
      .addButton((button) => button.setButtonText(this.t("Go to download")).setCta().onClick(() => { this.close(); this.goToDownload(); }));
  }
  onClose(): void { this.contentEl.empty(); }
}

class OverwriteModal extends Modal {
  private t = (key: string, values?: readonly unknown[]): string => translate(this.language(), key, values);
  private decision: OverwriteDecision = "cancel";
  constructor(app: App, private readonly path: string, private readonly resolve: (decision: OverwriteDecision) => void, private readonly language: () => PluginData["interfaceLanguage"]) { super(app); }
  onOpen(): void {
    this.contentEl.createEl("h2", { text: this.t("Overwrite existing file?") });
    this.contentEl.createEl("p", { text: this.t("With your permission, this update will replace the existing file with the release version. For Markdown files with frontmatter, your existing reading properties will be preserved; other properties and the article content may change.") });
    if (this.path.toLowerCase().endsWith(".md")) this.contentEl.createEl("p", { text: this.t("Preserved properties: 計劃閱讀、閱讀狀態、閱讀層次、閱讀次數、想讀日期、在讀日期、已讀日期、不讀日期、棄讀日期、閱讀感想、閱讀推薦、評分、文章評分、文章推薦. Saved values, including blank values, are kept rather than reset to defaults.") });
    this.contentEl.createEl("p", { text: this.path });
    this.contentEl.createEl("p", { text: this.t("Overwrite all applies to all remaining conflicting files in this update, including subsequent releases. Cancel stops the current release; earlier completed releases remain installed.") });
    new Setting(this.contentEl)
      .addButton((button) => button.setButtonText(this.t("Cancel update")).onClick(() => this.close()))
      .addButton((button) => button.setButtonText(this.t("Overwrite this file")).onClick(() => this.choose("overwrite")))
      .addButton((button) => button.setButtonText(this.t("Overwrite all")).setCta().onClick(() => this.choose("overwrite-all")));
  }
  private choose(decision: OverwriteDecision): void { this.decision = decision; this.close(); }
  onClose(): void { this.contentEl.empty(); this.resolve(this.decision); }
}

class UpdateModal extends Modal {
  private t = (key: string, values?: readonly unknown[]): string => translate(this.language(), key, values);
  constructor(app: App, private readonly batch: UpdateBatch, private readonly install: (progress: (message: string) => void) => Promise<void>, private readonly language: () => PluginData["interfaceLanguage"]) { super(app); }
  onOpen(): void {
    const { contentEl } = this;
    const first = this.batch.releases[0]; const last = this.batch.releases.at(-1)!;
    contentEl.createEl("h2", { text: this.t("Install {0} Tbpedia release(s)", [this.batch.releases.length]) });
    contentEl.createEl("p", { text: `${first.releaseVersion} → ${last.releaseVersion}` });
    contentEl.createEl("p", { text: this.t("The list below includes selected releases and their required dependencies.") });
    const list = contentEl.createEl("ul");
    for (const release of this.batch.releases) list.createEl("li", { text: `${release.releaseVersion} — ${release.releaseNotes.summary}` });
    const status = contentEl.createEl("p");
    new Setting(contentEl)
      .addButton((button) => button.setButtonText(this.t("Cancel")).onClick(() => this.close()))
      .addButton((button) => button.setCta().setButtonText(this.t("Update now")).onClick(async () => {
        button.setDisabled(true); status.setText(this.t("Starting update…"));
        try { await this.install((text) => status.setText(text)); this.close(); }
        catch (error) {
          console.error("Tbpedia update installation failed", error);
          status.setText(this.t("Update failed: {0}", [localizedError(this.language(), error)]));
          button.setDisabled(false);
        }
      }));
  }
  onClose(): void { this.contentEl.empty(); }
}
