import { Notice } from 'obsidian';
import MapboxPlugin from '../main';
import { CustomMarkerUrlModal } from '../modals/custom-marker.modal';

/**
 * Creates a modal based on the marker URL modal and opens it.
 * Callback function will receive the new set marker URL of the user and saves it to the settings.
 * @param plugin instance of the MapboxPlugin (required for getting settings and app instance)
 */
const showModalForCustomMarkerUrl = async (plugin: MapboxPlugin) => {
	new CustomMarkerUrlModal(plugin, async (result) => {
		plugin.settings.markerUrl = result;
		plugin.saveData(plugin.settings);
		new Notice('Default marker URL updated. Reload your view.');
	}).open();
};

/**
 * Used to register a new marker URL command.
 * @param plugin instance of the MapboxPlugin
 */
export const changeDefaultMarkerUrlCommand = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'change-default-marker-url',
		name: 'Change default marker URL',
		callback: () => showModalForCustomMarkerUrl(plugin),
	});
};
