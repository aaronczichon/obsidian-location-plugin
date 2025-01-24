import { App, PluginSettingTab } from 'obsidian';
import MapboxPlugin from '../main';
import {
	apiTokenSetting,
	coordinatesReverseOrder,
	mapStyleSetting,
	mapZoomSetting,
	markerColorSetting,
	markerSizeSetting,
	markerUrlSetting,
} from './plugin-settings.control';

export class LocationSettingTab extends PluginSettingTab {
	plugin: MapboxPlugin;

	constructor(app: App, plugin: MapboxPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		apiTokenSetting(containerEl, this.plugin, async (value: string) => {
			this.plugin.settings.mapboxToken = value;
			await this.plugin.saveSettings();
		});
		mapStyleSetting(containerEl, this.plugin, async (value: string) => {
			this.plugin.settings.mapStyle = value;
			await this.plugin.saveSettings();
		});
		markerSizeSetting(containerEl, this.plugin, async (value: string) => {
			this.plugin.settings.markerSize = value as 's' | 'm' | 'l';
			await this.plugin.saveSettings();
		});
		markerColorSetting(containerEl, this.plugin, async (value: string) => {
			this.plugin.settings.markerColor = value.replace('#', '');
			await this.plugin.saveSettings();
		});
		markerUrlSetting(containerEl, this.plugin, async (value: string) => {
			this.plugin.settings.markerUrl = value;
			await this.plugin.saveSettings();
		});
		mapZoomSetting(containerEl, this.plugin, async (value: string) => {
			this.plugin.settings.mapZoom = value;
			await this.plugin.saveSettings();
		});
		coordinatesReverseOrder(containerEl, this.plugin);
	}
}
