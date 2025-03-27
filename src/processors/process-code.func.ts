import { Notice } from 'obsidian';
import {
	findLatitude,
	findLatitudeAndLongitude,
	findLongitude,
	findMapStyle,
	findMapZoom,
	findMarkerIcon,
	findMarkerUrl,
	findSearchQuery,
} from '../exctractors/row-extractor.func';
import {
	addStaticImageToContainer,
	getStaticMapImageUrl,
	hasMapboxToken,
} from '../functions/map.func';
import { processLocationSearch } from '../functions/process-location-search.func';
import {
	LocationBlockConfiguration,
	LocationPluginSettings,
} from '../settings/plugin-settings.types';

export const processLocationCodeBlock = async (
	source: string,
	el: HTMLElement,
	settings: LocationPluginSettings,
) => {
	try {
		const extractedData = processCodeBlock(source);

		// If no Mapbox token is set, we don't need to process the code block.
		if (!hasMapboxToken(settings)) return;

		if (!extractedData.searchQuery && (!extractedData.latitude || !extractedData.longitude)) {
			new Notice(
				'Error processing location code block. Either Longitude and Latitude are required together, or a search term.',
				5000,
			);
			return;
		}

		// check if being run as a search then retrieve and render the image
		let address = '';
		if (extractedData.searchQuery) {
			const [latitude, longitude, fullAddress] = await processLocationSearch(
				extractedData.searchQuery,
				settings.mapboxToken,
			);
			extractedData.latitude = latitude.toString();
			extractedData.longitude = longitude.toString();
			address = fullAddress;
		}
		// if we need to flip the order of the coordinates
		// then we need to do it before rendering the image
		if (settings.reverseOrder) {
			const temp = extractedData.latitude;
			extractedData.latitude = extractedData.longitude;
			extractedData.longitude = temp;
		}
		const imageUrl = getStaticMapImageUrl(settings, extractedData);
		addStaticImageToContainer(el, imageUrl);
		if (!extractedData.searchQuery) return;

		// if a search query was used, render the address as text
		// render in the address of the location as text
		// allows user to confirm the location is the intended one
		const searchInfoElement = document.createElement('p');
		searchInfoElement.innerText = address;
		searchInfoElement.classList.add('mapbox-image-info');
		el.appendChild(searchInfoElement);
		// if not a search then use the long-lat coordinates input by user
	} catch (e) {
		new Notice(
			'Error processing location code block. Please check syntax or missing settings.',
			5000,
		);
	}
};

const processCodeBlock = (source: string) => {
	const rows = source.split('\n');

	let latitude = findLatitude(rows);
	let longitude = findLongitude(rows);
	const markerUrl = findMarkerUrl(rows);
	const makiIcon = findMarkerIcon(rows);
	const mapStyle = findMapStyle(rows);
	const mapZoom = findMapZoom(rows);
	const searchQuery = findSearchQuery(rows);
	const latLong = findLatitudeAndLongitude(rows);
	latitude = latLong ? latLong[0] : latitude;
	longitude = latLong ? latLong[1] : longitude;

	const config: LocationBlockConfiguration = {
		latitude,
		longitude,
		markerUrl,
		style: mapStyle,
		zoom: mapZoom,
		searchQuery,
		makiIcon,
	};
	return config;
};
