import mapboxgl from 'mapbox-gl';
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
import { hasMapboxToken } from '../functions/map.func';
import { processLocationSearch } from '../functions/process-location-search.func';
import {
	LocationBlockConfiguration,
	LocationPluginSettings,
} from '../settings/plugin-settings.types';

export const processInteractiveLocationCodeBlock = async (
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

		// create new element where we append the map
		const divElement = document.createElement('div');
		divElement.classList.add('mapbox-image');
		divElement.classList.add('mapbox-interactive-map');
		divElement.style.width = '100%';
		divElement.style.height = '400px';
		const id = `map-${Math.random().toString(36).substr(2, 9)}`;
		divElement.id = id;
		el.appendChild(divElement);
		setTimeout(() => {
			const lng = parseFloat(extractedData.longitude!);
			const lat = parseFloat(extractedData.latitude!);
			if (isNaN(lng) || isNaN(lat)) return;
			const map = new mapboxgl.Map({
				container: id, // container ID
				style: `mapbox://styles/mapbox/${extractedData.style || settings.mapStyle}`, // style URL
				center: [lng, lat], // starting position [lng, lat]
				zoom: parseInt(extractedData.zoom || settings.mapZoom), // starting zoom
			});
			map.on('load', () => {
				const el = extractedData.makiIcon
					? createMarkerIcon(extractedData.makiIcon, settings.markerColor, settings.mapboxToken)
					: undefined;
				new mapboxgl.Marker({
					color: `#${settings.markerColor}`,
					element: el,
				})
					.setLngLat([lng, lat])
					.addTo(map);
			});
		}, 1500);
	} catch (e) {
		new Notice(
			'Error processing location code block. Please check syntax or missing settings.',
			5000,
		);
	}
};

const createMarkerIcon = (makiIcon: string, color: string, apiToken: string) => {
	const el = document.createElement('div');
	el.className = 'marker';

	// Set the marker's icon
	el.style.backgroundImage = `url(https://api.mapbox.com/v4/marker/pin-m-${makiIcon}+${color}.png?access_token=${apiToken})`;
	el.style.width = '30px';
	el.style.height = '71px';

	return el;
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
