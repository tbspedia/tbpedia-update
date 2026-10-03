import { App, Modal, Notice, Plugin, Setting } from "obsidian";
import { UpdateService } from "./update-service";
import { PluginData, UpdateBatch } from "./types";

const DEFAULT_DATA: PluginData = { installed: { ownedFiles: [], appliedReleaseIds: [] } };

export default class TbpediaUpdatePlugin extends Plugin {
  private data: PluginData = DEFAULT_DATA;
  private updater!: UpdateService;

  async onload(): Promise<void> {
    const saved = await this.loadData() ?? {};
    this.data = { ...DEFAULT_DATA, ...saved, installed: { ownedFiles: [], appliedReleaseIds: [], ...saved.installed } };
    this.updater = new UpdateService(this.app, this.manifest.version, () => this.data, async (data) => { this.data = data; await this.saveData(data); });
    this.addRibbonIcon("download", "Check Tbpedia updates", () => void this.checkForUpdate());
    this.addCommand({ id: "check-for-content-update", name: "Check for content update", callback: () => void this.checkForUpdate() });
  }

  private async checkForUpdate(): Promise<void> {
    try {
      const manifest = await this.updater.check();
      if (!manifest) { new Notice("Your Tbpedia content is up to date."); return; }
      new UpdateModal(this.app, manifest, (progress) => this.updater.install(manifest, progress)).open();
    } catch (error) { new Notice(`Could not check for Tbpedia updates: ${message(error)}`); }
  }
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
        catch (error) { status.setText(`Update failed: ${message(error)}`); button.setDisabled(false); }
      }));
  }
  onClose(): void { this.contentEl.empty(); }
}
function message(error: unknown): string { return error instanceof Error ? error.message : "Unknown error"; }
