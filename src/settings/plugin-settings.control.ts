import { Setting } from "obsidian";
import MapboxPlugin from "../main";

export const apiTokenSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
) => {
	new Setting(containerEl)
		.setName("Mapbox API token")
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

export const markerUrlSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
) => {
	new Setting(containerEl)
		.setName("Custom Marker Icon URL")
		.setDesc(
			"You can define a custom marker icon by providing a URL which will be used as default marker icon",
		)
		.setTooltip("Recommended size: 50x50px, PNG or JPG format.")
		.addText((text) =>
			text
				.setPlaceholder("https://example.com/icon.png")
				.setValue(plugin.settings.markerUrl)
				.onChange(async (value) => {
					plugin.settings.markerUrl = value;
					await plugin.saveSettings();
				}),
		);
};

export const markerSizeSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
) => {
	new Setting(containerEl)
		.setName("Marker size")
		.setDesc(
			"Size of the marker on the map. This is ignored if a custom marker url is set.",
		)
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
		.setName("Marker color")
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
