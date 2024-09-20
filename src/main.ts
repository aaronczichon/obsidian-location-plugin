import { Plugin } from "obsidian";
import { checkVersionUpdate } from "./functions/version-hint.func";
import { processLocationCodeBlock } from "./processors/process-code.func";
import { LocationSettingTab } from "./settings/plugin-settings.tab";
import {
	DEFAULT_SETTINGS,
	LocationPluginSettings,
} from "./settings/plugin-settings.types";

export default class MapboxPlugin extends Plugin {
	settings: LocationPluginSettings;

	async onload() {
		// Load the settings initially
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			"location",
			(source: string, el: HTMLElement) =>
				processLocationCodeBlock(source, el, this.settings),
		);

		this.addSettingTab(new LocationSettingTab(this.app, this));

		await checkVersionUpdate(this);
	}

	public loadSettings = async () => {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	};

	public saveSettings = async () => {
		await this.saveData(this.settings);
	};
}
