import { Setting } from "obsidian";
import MapboxPlugin from "../main";

export const apiTokenSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
) => {
	new Setting(containerEl)
		.setName("Mapbox API Token")
		.setDesc("Please provide your mapbox API token")
		.addText((text) =>
			text
				.setPlaceholder("pk.ey...")
				.setValue(plugin.settings.mapboxToken)
				.onChange(async (value) => {
					plugin.settings.mapboxToken = value;
					await plugin.saveSettings();
				}),
		);
};

export const markerSizeSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
) => {
	new Setting(containerEl)
		.setName("Marker Size")
		.setDesc("size of the marker on the map")
		.addDropdown((text) =>
			text
				.addOption("s", "small")
				.addOption("m", "medium")
				.addOption("l", "large")
				.setValue(plugin.settings.markerSize)
				.onChange(async (value) => {
					plugin.settings.markerSize = value as "s" | "m" | "l";
					await plugin.saveSettings();
				}),
		);
};

export const markerColorSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
) => {
	new Setting(containerEl)
		.setName("Marker Color")
		.setDesc("Color of the marker on the map")
		.addColorPicker((text) =>
			text
				.setValue(`#${plugin.settings.markerColor}`)
				.onChange(async (value) => {
					plugin.settings.markerColor = value.replace("#", "");
					await plugin.saveSettings();
				}),
		);
};
