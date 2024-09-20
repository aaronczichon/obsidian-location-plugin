import { LocationPluginSettings } from '../settings/plugin-settings.types';

export const getMarkerUrl = (
	codeMarker: string,
	makiIcon: string,
	settings: LocationPluginSettings,
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
	latitude: string = '',
	longitude: string = '',
	codeMarker: string = '',
	makiIcon: string = '',
	style: string = '',
	zoom: string = '',
): string => {
	const markerUrl = getMarkerUrl(codeMarker, makiIcon, settings);

	if (codeMarker && makiIcon) {
		throw 'Both marker URL and Maki icon are set. Setting both is not a valid combination.';
	}

	const mapStyle = style || settings.mapStyle;
	const mapZoom = zoom || settings.mapZoom;
	const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/${markerUrl}(${longitude},${latitude})/${longitude},${latitude},${mapZoom}/800x400?access_token=${settings.mapboxToken}`;

	return imageUrl;
};
