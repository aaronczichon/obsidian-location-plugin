import { Plugin } from 'obsidian';
import {
	changeMarkerSizeLarge,
	changeMarkerSizeMedium,
	changeMarkerSizeSmall,
} from './commands/marker-size.func';
import { addNewLocationFromClipboard } from './commands/new-from-clipboard.func';
import { toggleReverseCoordinates } from './commands/toggle-reverse.func';
import { checkVersionUpdate } from './functions/version-hint.func';
import { processLocationCodeBlock } from './processors/process-code.func';
import { processMultiLocationCodeBlock } from './processors/process-multi-locations.func';
import { LocationSettingTab } from './settings/plugin-settings.tab';
import { DEFAULT_SETTINGS, LocationPluginSettings } from './settings/plugin-settings.types';

export default class MapboxPlugin extends Plugin {
	settings: LocationPluginSettings;

	async onload() {
		// Load the settings initially and check if this is a new version of the plugin.
		await this.loadSettings();
		await checkVersionUpdate(this);

		// register commands
		addNewLocationFromClipboard(this);
		changeMarkerSizeSmall(this);
		changeMarkerSizeMedium(this);
		changeMarkerSizeLarge(this);
		toggleReverseCoordinates(this);

		// Register the processors for the given code blocks.
		// Code blocks are used in this plugin to render the maps.
		this.registerMarkdownCodeBlockProcessor('location', (source: string, el: HTMLElement) =>
			processLocationCodeBlock(source, el, this.settings),
		);
		this.registerMarkdownCodeBlockProcessor('multi-location', (source: string, el: HTMLElement) =>
			processMultiLocationCodeBlock(source, el, this.settings),
		);

		// Adding the UI settings tab to the Obsidian preferences.
		this.addSettingTab(new LocationSettingTab(this.app, this));
	}

	public loadSettings = async () => {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	};

	public saveSettings = async () => {
		await this.saveData(this.settings);
	};
}
