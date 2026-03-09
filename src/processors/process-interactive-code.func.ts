import mapboxgl from 'mapbox-gl';
import { Notice } from 'obsidian';
import {
	findLatitude,
	findLatitudeAndLongitude,
	findLocationMarkers,
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
	LocationMarker,
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

		if (
			!extractedData.searchQuery &&
			!extractedData.locations?.length &&
			(!extractedData.latitude || !extractedData.longitude)
		) {
			new Notice(
				'Error processing location code block. Either Longitude and Latitude are required together, or a search term.',
				5000,
			);
			return;
		}

		let locations = extractedData.locations || [];

		// check if being run as a search then retrieve and render the image
		if (extractedData.searchQuery) {
			const [latitude, longitude, fullAddress] = await processLocationSearch(
				extractedData.searchQuery,
				settings.mapboxToken,
			);
			extractedData.latitude = latitude.toString();
			extractedData.longitude = longitude.toString();
			locations = [
				{
					latitude,
					longitude,
					name: fullAddress || undefined,
				},
			];
		}

		if (!locations.length && extractedData.latitude && extractedData.longitude) {
			locations = [
				{
					latitude: parseFloat(extractedData.latitude),
					longitude: parseFloat(extractedData.longitude),
				},
			];
		}

		// if we need to flip the order of the coordinates
		// then we need to do it before rendering the image
		if (settings.reverseOrder) {
			locations = locations.map((location) => ({
				...location,
				latitude: location.longitude,
				longitude: location.latitude,
			}));
			if (extractedData.latitude && extractedData.longitude) {
				const temp = extractedData.latitude;
				extractedData.latitude = extractedData.longitude;
				extractedData.longitude = temp;
			}
		}

		if (!locations.length) return;

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
			const initialLocation = locations[0];
			if (!initialLocation) return;

			const configuredZoom = parseInt(extractedData.zoom || settings.mapZoom);
			if (isNaN(initialLocation.longitude) || isNaN(initialLocation.latitude)) return;

			const map = new mapboxgl.Map({
				container: id, // container ID
				style: `mapbox://styles/mapbox/${extractedData.style || settings.mapStyle}`, // style URL
				center: [initialLocation.longitude, initialLocation.latitude], // starting position [lng, lat]
				zoom: configuredZoom, // starting zoom
			});
			map.on('load', () => {
				locations.forEach((location) => {
					addMarkerToMap(map, location, extractedData.makiIcon, settings);
				});

				if (locations.length > 1) {
					const bounds = new mapboxgl.LngLatBounds();
					locations.forEach((location) => {
						bounds.extend([location.longitude, location.latitude]);
					});
					map.fitBounds(bounds, {
						padding: 60,
						maxZoom: configuredZoom,
					});
				}
			});
		}, 1500);
	} catch (e) {
		new Notice(
			'Error processing location code block. Please check syntax or missing settings.',
			5000,
		);
	}
};

const addMarkerToMap = (
	map: mapboxgl.Map,
	location: LocationMarker,
	defaultMakiIcon: string | undefined,
	settings: LocationPluginSettings,
) => {
	const makiIcon = location.makiIcon || defaultMakiIcon;
	const marker = makiIcon
		? new mapboxgl.Marker({
				element: createMarkerElement(
					location.name,
					makiIcon,
					settings.markerColor,
					settings.mapboxToken,
				),
				anchor: 'bottom',
			})
		: new mapboxgl.Marker({
				color: `#${settings.markerColor}`,
			});

	marker.setLngLat([location.longitude, location.latitude]).addTo(map);

	if (location.name && !makiIcon) {
		marker.getElement().classList.add('mapbox-interactive-default-marker');
		marker.getElement().appendChild(createMarkerLabel(location.name));
	}
};

const createMarkerElement = (
	name: string | undefined,
	makiIcon: string,
	color: string,
	apiToken: string,
) => {
	const el = document.createElement('div');
	el.className = 'mapbox-interactive-marker';

	const iconElement = document.createElement('div');
	iconElement.className = 'mapbox-interactive-marker-icon';
	iconElement.style.backgroundImage = `url(https://api.mapbox.com/v4/marker/pin-m-${makiIcon}+${color}.png?access_token=${apiToken})`;
	el.appendChild(iconElement);

	if (name) {
		el.appendChild(createMarkerLabel(name));
	}

	return el;
};

const createMarkerLabel = (name: string) => {
	const label = document.createElement('span');
	label.className = 'mapbox-interactive-marker-label';
	label.textContent = name;

	return label;
};

const processCodeBlock = (source: string) => {
	const rows = source.split('\n');

	let latitude = findLatitude(rows);
	let longitude = findLongitude(rows);
	const locations = findLocationMarkers(rows);
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
		locations,
		markerUrl,
		style: mapStyle,
		zoom: mapZoom,
		searchQuery,
		makiIcon,
	};
	return config;
};
