import { Notice, Setting } from 'obsidian';
import { mapboxStyles } from '../functions/style.func';
import MapboxPlugin from '../main';

export const apiTokenSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
	callback: Function,
) => {
	new Setting(containerEl)
		.setName('Mapbox API token')
		.setDesc('Please provide your mapbox API token.')
		.addText((text) =>
			text
				.setPlaceholder('pk.ey...')
				.setValue(plugin.settings.mapboxToken)
				.onChange(async (value) => callback(value)),
		);
};

export const markerUrlSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
	callback: Function,
) => {
	new Setting(containerEl)
		.setName('Custom marker URL')
		.setDesc(
			'You can define a custom marker icon by providing a URL which will be used as default marker icon.',
		)
		.setTooltip('Recommended size: 50x50px, PNG or JPG format.')
		.addText((text) =>
			text
				.setPlaceholder('https://example.com/icon.png')
				.setValue(plugin.settings.markerUrl)
				.onChange(async (value) => callback(value)),
		);
};

export const markerSizeSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
	callback: Function,
) => {
	new Setting(containerEl)
		.setName('Marker size')
		.setDesc('Size of the marker on the map. This is ignored if a custom marker url is set.')
		.addDropdown((text) =>
			text
				.addOption('s', 'small')
				.addOption('m', 'medium')
				.addOption('l', 'large')
				.setValue(plugin.settings.markerSize)
				.onChange(async (value) => callback(value)),
		);
};

export const mapStyleSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
	callback: Function,
) => {
	const stylesAsRecords = mapboxStyles.reduce(
		(acc, style) => {
			acc[style.mapboxName] = style.settingsName;
			return acc;
		},
		{} as Record<string, string>,
	);
	new Setting(containerEl)
		.setName('Default map style')
		.setDesc('Select the default style which is used for your maps.')
		.addDropdown((text) =>
			text
				.addOptions(stylesAsRecords)
				.setValue(plugin.settings.mapStyle)
				.onChange(async (value) => callback(value)),
		);
};

export const markerColorSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
	callback: Function,
) => {
	new Setting(containerEl)
		.setName('Marker color')
		.setDesc('Color of the marker on the map.')
		.addColorPicker((text) =>
			text.setValue(`#${plugin.settings.markerColor}`).onChange(async (value) => callback(value)),
		);
};

export const mapZoomSetting = (
	containerEl: HTMLElement,
	plugin: MapboxPlugin,
	callback: Function,
) => {
	new Setting(containerEl)
		.setName('Map zoom')
		.setDesc('Set the default zoom for the map image.')
		.addDropdown((text) =>
			text
				.addOption('20', '20 - closest')
				.addOption('15', '15')
				.addOption('10', '10')
				.addOption('5', '5')
				.addOption('1', '1 - furthest')
				.setValue(plugin.settings.mapZoom)
				.onChange(async (value) => callback(value)),
		);
};

export const coordinatesReverseOrder = (containerEl: HTMLElement, plugin: MapboxPlugin) => {
	new Setting(containerEl)
		.setName('Reverse order')
		.setDesc(
			'If you copy coordinates in a different order (e.g. from Google Maps) you can automatically reverse them.',
		)
		.addToggle((reverse) =>
			reverse.setValue(plugin.settings.reverseOrder).onChange(async (value) => {
				plugin.settings.reverseOrder = value;
				await plugin.saveSettings();
				new Notice('Coordinates order reversed. This affects all your location code blocks.');
			}),
		);
};
