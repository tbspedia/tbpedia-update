import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from "obsidian";
import { OverwriteDecision, UpdateService } from "./update-service";
import { PluginData, SUPPORTED_LANGUAGES, UpdateBatch } from "./types";
import { migrateOwnedFiles } from "./ownership";

const DEFAULT_DATA: PluginData = { seriesId: "reading", editionId: "standard", installed: { ownedFiles: {}, appliedReleaseIds: [] } };

export default class TbpediaUpdatePlugin extends Plugin {
  private data: PluginData = DEFAULT_DATA;
  private updater!: UpdateService;

  async onload(): Promise<void> {
    const saved = await this.loadData() ?? {};
    this.data = { ...DEFAULT_DATA, ...saved, installed: { ownedFiles: {}, appliedReleaseIds: [], ...saved.installed } };
    this.data.installed.ownedFiles = migrateOwnedFiles(this.data.installed.ownedFiles, this.data.installed);
    await this.persistData(this.data);
    this.updater = new UpdateService(this.app, this.manifest.version, () => this.data, (data) => this.persistData(data));
    this.addSettingTab(new TbpediaUpdateSettingsTab(this.app, this));
    this.addRibbonIcon("download", "Check Tbpedia updates", () => void this.checkForUpdate());
    this.addCommand({ id: "check-for-content-update", name: "Check for content update", callback: () => void this.checkForUpdate() });
  }

  private async checkForUpdate(): Promise<void> {
    try {
      const manifest = await this.updater.check();
      if (!manifest) { new Notice("Your Tbpedia content is up to date."); return; }
      new UpdateModal(this.app, manifest, (progress) => this.updater.install(manifest, progress,
        (path) => new Promise<OverwriteDecision>((resolve) => new OverwriteModal(this.app, path, resolve).open()))).open();
    } catch (error) { new Notice(`Could not check for Tbpedia updates: ${message(error)}`); }
  }

  async setLanguageCode(languageCode: PluginData["languageCode"]): Promise<void> {
    await this.persistData({ ...this.data, languageCode });
  }

  async setEditionId(editionId: string): Promise<void> {
    if (editionId !== "standard" && editionId !== "advanced") throw new Error("Unsupported Tbpedia edition.");
    await this.persistData({ ...this.data, editionId });
  }

  private async persistData(data: PluginData): Promise<void> {
    const { languageCode, seriesId, editionId, ...rest } = data;
    this.data = { languageCode, seriesId, editionId, ...rest };
    await this.saveData(this.data);
  }

  get languageCode(): PluginData["languageCode"] { return this.data.languageCode; }
  get editionId(): string { return this.data.editionId; }
}

class TbpediaUpdateSettingsTab extends PluginSettingTab {
  constructor(app: App, private readonly plugin: TbpediaUpdatePlugin) { super(app, plugin); }
  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Tbpedia Update" });
    new Setting(containerEl)
      .setName("Vault language")
      .setDesc("Select the language of this installed Tbpedia collection. It determines which release history is used.")
      .addDropdown((dropdown) => {
        dropdown.addOption("", "Choose language…");
        for (const code of SUPPORTED_LANGUAGES) dropdown.addOption(code, code);
        dropdown.setValue(this.plugin.languageCode ?? "");
        dropdown.onChange(async (value) => { await this.plugin.setLanguageCode(value as PluginData["languageCode"]); });
      });
    new Setting(containerEl)
      .setName("Vault edition")
      .setDesc("Choose Standard or Advanced to use that edition’s release history. Existing release records are preserved.")
      .addDropdown((dropdown) => {
        dropdown.addOption("standard", "Standard (標準版本)");
        dropdown.addOption("advanced", "Advanced (高級版本)");
        dropdown.setValue(this.plugin.editionId);
        dropdown.onChange(async (value) => { await this.plugin.setEditionId(value); });
      });
  }
}

class OverwriteModal extends Modal {
  private decision: OverwriteDecision = "cancel";
  constructor(app: App, private readonly path: string, private readonly resolve: (decision: OverwriteDecision) => void) { super(app); }
  onOpen(): void {
    this.contentEl.createEl("h2", { text: "Overwrite existing file?" });
    this.contentEl.createEl("p", { text: "This local file was not installed by Tbpedia Update. Overwriting replaces its contents with the release version." });
    this.contentEl.createEl("p", { text: this.path });
    this.contentEl.createEl("p", { text: "Overwrite all applies to all remaining conflicting files in this update, including subsequent releases. Cancel stops the current release; earlier completed releases remain installed." });
    new Setting(this.contentEl)
      .addButton((button) => button.setButtonText("Cancel update").onClick(() => this.close()))
      .addButton((button) => button.setButtonText("Overwrite this file").onClick(() => this.choose("overwrite")))
      .addButton((button) => button.setButtonText("Overwrite all").setCta().onClick(() => this.choose("overwrite-all")));
  }
  private choose(decision: OverwriteDecision): void { this.decision = decision; this.close(); }
  onClose(): void { this.contentEl.empty(); this.resolve(this.decision); }
}

class UpdateModal extends Modal {
  constructor(app: App, private readonly batch: UpdateBatch, private readonly install: (progress: (message: string) => void) => Promise<void>) { super(app); }
  onOpen(): void {
    const { contentEl } = this;
    const first = this.batch.releases[0]; const last = this.batch.releases.at(-1)!;
    contentEl.createEl("h2", { text: `Install ${this.batch.releases.length} Tbpedia release${this.batch.releases.length === 1 ? "" : "s"}` });
    contentEl.createEl("p", { text: `${first.releaseVersion} → ${last.releaseVersion}` });
    const list = contentEl.createEl("ul");
    for (const release of this.batch.releases) list.createEl("li", { text: `${release.releaseVersion} — ${release.releaseNotes.summary}` });
    const status = contentEl.createEl("p");
    new Setting(contentEl)
      .addButton((button) => button.setButtonText("Cancel").onClick(() => this.close()))
      .addButton((button) => button.setCta().setButtonText("Update now").onClick(async () => {
        button.setDisabled(true); status.setText("Starting update…");
        try { await this.install((text) => status.setText(text)); this.close(); }
        catch (error) {
          console.error("Tbpedia update installation failed", error);
          status.setText(`Update failed: ${message(error)}`);
          button.setDisabled(false);
        }
      }));
  }
  onClose(): void { this.contentEl.empty(); }
}
function message(error: unknown): string { return error instanceof Error ? error.message : "Unknown error"; }
