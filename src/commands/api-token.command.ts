import { Notice } from 'obsidian';
import MapboxPlugin from '../main';
import { ApiTokenModal } from '../modals/api-token.modal';

/**
 * Creates a modal based on the API token modal and opens it.
 * Callback function will receive the new selected token of the user and saves it to the settings.
 * @param plugin instance of the MapboxPlugin (required for getting settings and app instance)
 */
const showModalForApiToken = async (plugin: MapboxPlugin) => {
	new ApiTokenModal(plugin, async (result) => {
		plugin.settings.mapboxToken = result;
		plugin.saveData(plugin.settings);
		new Notice('Mapbox API token updated. Reload your view.');
	}).open();
};

/**
 * Used to register a new api token command.
 * @param plugin instance of the MapboxPlugin
 */
export const changeApiTokenCommand = async (plugin: MapboxPlugin) => {
	plugin.addCommand({
		id: 'change-mapbox-api-token',
		name: 'Change Mapbox API token',
		callback: () => showModalForApiToken(plugin),
	});
};
