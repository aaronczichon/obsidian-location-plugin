import { Notice } from 'obsidian';
import {
	LocationBlockConfiguration,
	LocationPluginSettings,
	MultiLocationBlockConfiguration,
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
 * With the given parameters a static map with be generated as image and the URL
 * of it will be returned.
 * @returns URL of the static map image
 */
export const getStaticMultiMapImageUrl = (
	settings: LocationPluginSettings,
	config: MultiLocationBlockConfiguration,
): string => {
	const markerUrl = getMarkerUrl(settings, config.markerUrl, config.makiIcon);

	if (config.markerUrl && config.makiIcon) {
		throw 'Both marker URL and Maki icon are set. Setting both is not a valid combination.';
	}

	const mapStyle = config.style || settings.mapStyle;
	const mapZoom = config.zoom || settings.mapZoom;
	const markerString: string[] = [];
	config.locations.forEach((loc) => {
		markerString.push(`${markerUrl}(${loc.longitude},${loc.latitude})`);
	});
	const markersCombined = markerString.join(',');
	const center = findCenter(config.locations);
	const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/${markersCombined}/${center.longitude},${center.latitude},${mapZoom}/800x400?access_token=${settings.mapboxToken}`;

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

export const addStaticImageToContainer = (
	settings: LocationPluginSettings,
	extractedData: LocationBlockConfiguration,
	el: HTMLElement,
	url: string,
) => {
	try {
		const imageElement = document.createElement('img');
		imageElement.src = url;
		imageElement.classList.add('mapbox-image');

		el.appendChild(imageElement);
	} catch (e) {
		new Notice(e);
	}
};

const getMiddle = (prop: string, markers: { latitude: number; longitude: number }[]) => {
	let values = markers.map((m) => m[prop as keyof typeof m]);
	let min = Math.min(...values);
	let max = Math.max(...values);
	if (prop === 'longitude' && max - min > 180) {
		values = values.map((val) => (val < max - 180 ? val + 360 : val));
		min = Math.min(...values);
		max = Math.max(...values);
	}
	let result = (min + max) / 2;
	if (prop === 'longitude' && result > 180) {
		result -= 360;
	}
	return result;
};

const findCenter = (markers: { latitude: number; longitude: number }[]) => {
	return {
		latitude: getMiddle('latitude', markers),
		longitude: getMiddle('longitude', markers),
	};
};
