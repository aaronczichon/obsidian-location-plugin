import { Notice } from 'obsidian';
import MapboxPlugin from '../main';

export const toggleReverseCoordinates = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'toggle-reverse-coordinates',
		name: 'Reverse coordinate order',
		callback: async () => {
			plugin.settings.reverseOrder = !plugin.settings.reverseOrder;
			plugin.saveData(plugin.settings);
			new Notice(
				`Coordinates will now be ${plugin.settings.reverseOrder ? 'reversed' : 'normal'}. Reload your view.`,
			);
		},
	});
};
