import { App, PluginSettingTab } from "obsidian";
import MapboxPlugin from "../main";
import {
	apiTokenSetting,
	mapStyleSetting,
	markerColorSetting,
	markerSizeSetting,
	markerUrlSetting,
	mapZoomSetting,
} from "./plugin-settings.control";

export class LocationSettingTab extends PluginSettingTab {
	plugin: MapboxPlugin;

	constructor(app: App, plugin: MapboxPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		apiTokenSetting(containerEl, this.plugin);
		mapStyleSetting(containerEl, this.plugin);
		markerSizeSetting(containerEl, this.plugin);
		markerColorSetting(containerEl, this.plugin);
		markerUrlSetting(containerEl, this.plugin);
		mapZoomSetting(containerEl, this.plugin);
	}
}
