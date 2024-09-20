import { Notice } from 'obsidian';
import {
	LocationBlockConfiguration,
	LocationPluginSettings,
} from '../settings/plugin-settings.types';

export const getMarkerUrl = (
	settings: LocationPluginSettings,
	codeMarker?: string,
	makiIcon?: string,
) => {
	// If a marker URL is set in code block use it
	if (codeMarker) return `url-${encodeURIComponent(codeMarker)}`;
	// If a marker URL is set in settings use it
	if (settings.markerUrl) return `url-${encodeURIComponent(settings.markerUrl)}`;

	// if no marker URL is set at all, use the default
	return `pin-${settings.markerSize}-${makiIcon || 'home'}+${settings.markerColor}`;
};

/**
 * With the given parameters a static map with be generated as image and the URL
 * of it will be returned.
 * @param latitude Latitude of the location
 * @param longitude Longitude of the location
 * @param codeMarker URL of the marker
 * @param makiIcon Name of the maki icon which should be used as a marker
 * @param style Mapbox style which should be used
 * @param zoom Level of zoom on the map
 * @returns URL of the static map image
 */
export const getStaticMapImageUrl = (
	settings: LocationPluginSettings,
	config: LocationBlockConfiguration,
): string => {
	const markerUrl = getMarkerUrl(settings, config.markerUrl, config.makiIcon);

	if (config.markerUrl && config.makiIcon) {
		throw 'Both marker URL and Maki icon are set. Setting both is not a valid combination.';
	}

	const mapStyle = config.style || settings.mapStyle;
	const mapZoom = config.zoom || settings.mapZoom;
	const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/${markerUrl}(${config.longitude},${config.latitude})/${config.longitude},${config.latitude},${mapZoom}/800x400?access_token=${settings.mapboxToken}`;

	return imageUrl;
};

/**
 * Checks if mapbox token is available and shows a notice if not.
 * @param settings object of location plugin settings
 * @returns true if a valid mapbox token is configured, false otherwise
 */
export const hasMapboxToken = (settings: LocationPluginSettings) => {
	if (!settings.mapboxToken) {
		new Notice('Mapbox access token is not set. Please set it in the plugin settings.', 5000);
		return false;
	}
	return true;
};
