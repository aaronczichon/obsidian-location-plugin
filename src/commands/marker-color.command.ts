import { Notice } from 'obsidian';
import MapboxPlugin from '../main';
import { MarkerColorModal } from '../modals/marker-color.modal';

/**
 * Creates a modal based on the marker color modal and opens it.
 * Callback function will receive the new set marker color of the user and saves it to the settings.
 * @param plugin instance of the MapboxPlugin (required for getting settings and app instance)
 */
const showModalForDefaultMarkerColor = async (plugin: MapboxPlugin) => {
	new MarkerColorModal(plugin, async (result) => {
		plugin.settings.markerColor = result.replace('#', '');
		plugin.saveData(plugin.settings);
		new Notice('Default marker color updated. Reload your view.');
	}).open();
};

/**
 * Used to register a new marker color command.
 * @param plugin instance of the MapboxPlugin
 */
export const changeDefaultMarkerColorCommand = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'change-default-marker-color',
		name: 'Change default marker color',
		callback: () => showModalForDefaultMarkerColor(plugin),
	});
};
