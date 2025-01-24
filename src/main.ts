import mapboxgl from 'mapbox-gl';
import { Plugin } from 'obsidian';
import { changeApiTokenCommand } from './commands/api-token.command';
import { changeDefaultMarkerUrlCommand } from './commands/custom-marker.command';
import { changeMapStyleCommand } from './commands/map-style.command';
import { changeDefaultMapZoomLevelCommand } from './commands/map-zoom.command';
import { changeDefaultMarkerColorCommand } from './commands/marker-color.command';
import { changeMarkerSizeCommand } from './commands/marker-size.command';
import { addNewLocationFromClipboard } from './commands/new-from-clipboard.command';
import { toggleReverseCoordinates } from './commands/toggle-reverse.command';
import { checkVersionUpdate } from './functions/version-hint.func';
import { processLocationCodeBlock } from './processors/process-code.func';
import { processInteractiveLocationCodeBlock } from './processors/process-interactive-code.func';
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
		changeMarkerSizeCommand(this);
		changeApiTokenCommand(this);
		changeMapStyleCommand(this);
		changeDefaultMapZoomLevelCommand(this);
		changeDefaultMarkerColorCommand(this);
		changeDefaultMarkerUrlCommand(this);
		toggleReverseCoordinates(this);

		mapboxgl.accessToken = this.settings.mapboxToken;

		// Register the processors for the given code blocks.
		// Code blocks are used in this plugin to render the maps.
		this.registerMarkdownCodeBlockProcessor('location', (source: string, el: HTMLElement) =>
			processLocationCodeBlock(source, el, this.settings),
		);
		this.registerMarkdownCodeBlockProcessor('multi-location', (source: string, el: HTMLElement) =>
			processMultiLocationCodeBlock(source, el, this.settings),
		);
		this.registerMarkdownCodeBlockProcessor(
			'interactive-location',
			(source: string, el: HTMLElement) =>
				processInteractiveLocationCodeBlock(source, el, this.settings),
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
