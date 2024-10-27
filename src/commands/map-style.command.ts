import { Notice } from 'obsidian';
import MapboxPlugin from '../main';
import { MapStyleModal } from '../modals/map-style.modal';

/**
 * Creates a modal based on the map style modal and opens it.
 * Callback function will receive the new selected style and saves it to the settings.
 * @param plugin instance of the MapboxPlugin (required for getting settings and app instance)
 */
const showModalForMapStyle = async (plugin: MapboxPlugin) => {
	new MapStyleModal(plugin, async (result) => {
		plugin.settings.mapStyle = result;
		plugin.saveData(plugin.settings);
		new Notice('Default map style updated. Reload your view.');
	}).open();
};

/**
 * Used to register a new map style command.
 * @param plugin instance of the MapboxPlugin
 */
export const changeMapStyleCommand = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'change-map-style',
		name: 'Change default map style',
		callback: () => showModalForMapStyle(plugin),
	});
};
