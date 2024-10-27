import { Notice } from 'obsidian';
import MapboxPlugin from '../main';
import { MarkerSizeModal } from '../modals/marker-size.modal';

/**
 * Creates a modal based on the marker size modal and opens it.
 * Callback function will receive the new selected marker size of the user and saves it to the settings.
 * @param plugin instance of the MapboxPlugin (required for getting settings and app instance)
 */
const showModalForMarkerSize = async (plugin: MapboxPlugin) => {
	new MarkerSizeModal(plugin, async (result) => {
		plugin.settings.markerSize = result as 's' | 'm' | 'l';
		plugin.saveData(plugin.settings);
		new Notice('Marker size changed. Reload your view.');
	}).open();
};

/**
 * Used to register a new marker size command.
 * @param plugin instance of the MapboxPlugin
 */
export const changeMarkerSizeCommand = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'change-marker-size',
		name: 'Change marker size',
		callback: () => showModalForMarkerSize(plugin),
	});
};
