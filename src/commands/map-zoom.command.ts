import { Notice } from 'obsidian';
import MapboxPlugin from '../main';
import { MapZoomModal } from '../modals/map-zoom.modal';

/**
 * Creates a modal based on the map zoom and opens it.
 * Callback function will receive the new set default map zoom of the user and saves it to the settings.
 * @param plugin instance of the MapboxPlugin (required for getting settings and app instance)
 */
const showModalForDefaultMapZoom = async (plugin: MapboxPlugin) => {
	new MapZoomModal(plugin, async (result) => {
		plugin.settings.mapZoom = result;
		plugin.saveData(plugin.settings);
		new Notice('Default map zoom level updated. Reload your view.');
	}).open();
};

/**
 * Used to register a new map zoom command.
 * @param plugin instance of the MapboxPlugin
 */
export const changeDefaultMapZoomLevelCommand = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'change-default-map-zoom-level',
		name: 'Change default map zoom level',
		callback: () => showModalForDefaultMapZoom(plugin),
	});
};
