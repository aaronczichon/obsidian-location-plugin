import { Notice } from 'obsidian';
import MapboxPlugin from '../main';

export const changeMarkerSizeSmall = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'change-marker-size-small',
		name: 'Change marker size to small',
		callback: async () => {
			plugin.settings.markerSize = 's';
			plugin.saveData(plugin.settings);
			new Notice('Marker size is now small. Reload your view.');
		},
	});
};

export const changeMarkerSizeMedium = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'change-marker-size-medium',
		name: 'Change marker size to medium',
		callback: async () => {
			plugin.settings.markerSize = 'm';
			plugin.saveData(plugin.settings);
			new Notice('Marker size is now medium. Reload your view.');
		},
	});
};

export const changeMarkerSizeLarge = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'change-marker-size-large',
		name: 'Change marker size to large',
		callback: async () => {
			plugin.settings.markerSize = 'l';
			plugin.saveData(plugin.settings);
			new Notice('Marker size is now larger. Reload your view.');
		},
	});
};
