import { Notice } from 'obsidian';
import {
	findMapStyle,
	findMapZoom,
	findMarkerIcon,
	findMarkerUrl,
	findMultipleCoordinates,
} from '../exctractors/row-extractor.func';
import {
	addStaticImageToContainer,
	getStaticMultiMapImageUrl,
	hasMapboxToken,
} from '../functions/map.func';
import {
	LocationPluginSettings,
	MultiLocationBlockConfiguration,
} from '../settings/plugin-settings.types';

export const processMultiLocationCodeBlock = async (
	source: string,
	el: HTMLElement,
	settings: LocationPluginSettings,
) => {
	try {
		const extractedData = processCodeBlock(source);

		// If no Mapbox token is set, we don't need to process the code block.
		if (!hasMapboxToken(settings)) return;

		if (extractedData.locations.length < 1) {
			new Notice(
				'Error processing location code block. Either Longitude and Latitude are required together, or a search term.',
				5000,
			);
			return;
		}

		// if we need to flip the order of the coordinates
		// then we need to do it before rendering the image
		if (settings.reverseOrder) {
			extractedData.locations = extractedData.locations.map(({ latitude, longitude }) => ({
				latitude: longitude,
				longitude: latitude,
			}));
		}
		const imageUrl = getStaticMultiMapImageUrl(settings, extractedData);
		addStaticImageToContainer(settings, extractedData, el, imageUrl);
	} catch (e) {
		new Notice(
			'Error processing location code block. Please check syntax or missing settings.',
			5000,
		);
	}
};

const processCodeBlock = (source: string) => {
	const rows = source.split('\n');

	const coordinates = findMultipleCoordinates(rows);
	const markerUrl = findMarkerUrl(rows);
	const makiIcon = findMarkerIcon(rows);
	const mapStyle = findMapStyle(rows);
	const mapZoom = findMapZoom(rows);

	const config: MultiLocationBlockConfiguration = {
		locations: coordinates.map(([latitude, longitude]) => ({
			latitude: parseFloat(latitude),
			longitude: parseFloat(longitude),
		})),
		markerUrl,
		style: mapStyle,
		zoom: mapZoom,
		makiIcon,
	};
	return config;
};
