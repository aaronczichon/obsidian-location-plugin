import { Notice } from "obsidian";
import { getStaticMapImageUrl } from "../functions/map.func";
import { processLocationSearch } from "../functions/process-location-search.func";
import { LocationPluginSettings } from "../settings/plugin-settings.types";

export const processLocationCodeBlock = async (
	source: string,
	el: HTMLElement,
	settings: LocationPluginSettings,
) => {
	try {
		const extractedData = processCodeBlock(source);
		let mapboxAccessToken = settings.mapboxToken;
		if (!mapboxAccessToken) {
			new Notice(
				"Mapbox access token is not set. Please set it in the plugin settings.",
				5000,
			);
			return;
		}

		if (
			!extractedData.searchQuery &&
			(!extractedData.latitude || !extractedData.longitude)
		) {
			new Notice(
				"Error processing location code block. Either Longitude and Latitude are required together, or a search term.",
				5000,
			);
			return;
		}

		// check if being run as a search then retrieve and render the image
		let lat = extractedData.latitude;
		let long = extractedData.longitude;
		let address = "";
		if (extractedData.searchQuery) {
			const [latitude, longitude, fullAddress] =
				await processLocationSearch(
					extractedData.searchQuery,
					mapboxAccessToken,
				);
			lat = latitude.toString();
			long = longitude.toString();
			address = fullAddress;
		}
		// if we need to flip the order of the coordinates
		// then we need to do it before rendering the image
		if (settings.reverseOrder) {
			const temp = lat;
			lat = long;
			long = temp;
		}
		addStaticImageToContainer(settings, extractedData, el, lat, long);
		if (!extractedData.searchQuery) return;

		// if a search query was used, render the address as text
		// render in the address of the location as text
		// allows user to confirm the location is the intended one
		const searchInfoElement = document.createElement("p");
		searchInfoElement.innerText = address;
		searchInfoElement.classList.add("mapbox-image-info");
		el.appendChild(searchInfoElement);
		// if not a search then use the long-lat coordinates input by user
	} catch (e) {
		new Notice(
			"Error processing location code block. Please check syntax or missing settings.",
			5000,
		);
	}
};

export const processCodeBlock = (source: string) => {
	const rows = source.split("\n");

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

	return {
		latitude,
		longitude,
		markerUrl,
		makiIcon,
		mapStyle,
		mapZoom,
		searchQuery,
	};
};

const addStaticImageToContainer = (
	settings: LocationPluginSettings,
	extractedData: any,
	el: HTMLElement,
	latitude?: string,
	longitude?: string,
) => {
	try {
		const imageUrl = getStaticMapImageUrl(
			settings,
			latitude,
			longitude,
			extractedData.markerUrl,
			extractedData.makiIcon,
			extractedData.mapStyle,
			extractedData.mapZoom,
		);

		const imageElement = document.createElement("img");
		imageElement.src = imageUrl;
		imageElement.classList.add("mapbox-image");

		el.appendChild(imageElement);
	} catch (e) {
		new Notice(e);
	}
};

const findLatitudeAndLongitude = (rows: string[]) => {
	const regex = /^\[\s*(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\s*\]$/;
	let latLong = rows.find((l) => regex.test(l.toLowerCase()));
	if (latLong) {
		const match = latLong.match(regex);
		if (match) {
			return [match[1], match[3]];
		}
	}
};

const findLatitude = (rows: string[]) => {
	let latitude = rows.find((l) => l.toLowerCase().startsWith("latitude:"));
	if (latitude)
		latitude = latitude.toLocaleLowerCase().replace("latitude:", "").trim();
	return latitude;
};

const findLongitude = (rows: string[]) => {
	let longitude = rows.find((l) => l.toLowerCase().startsWith("longitude:"));
	if (longitude)
		longitude = longitude
			.toLocaleLowerCase()
			.replace("longitude:", "")
			.trim();
	return longitude;
};

const findMarkerUrl = (rows: string[]) => {
	let markerUrl = rows.find((l) => l.toLowerCase().startsWith("marker-url:"));
	if (markerUrl)
		markerUrl = markerUrl
			.toLocaleLowerCase()
			.replace("marker-url:", "")
			.trim();
	return markerUrl;
};

const findMarkerIcon = (rows: string[]) => {
	let makiIcon = rows.find((l) => l.toLowerCase().startsWith("maki:"));
	if (makiIcon)
		makiIcon = makiIcon.toLocaleLowerCase().replace("maki:", "").trim();
	return makiIcon;
};

const findMapStyle = (rows: string[]) => {
	let mapStyle = rows.find((l) => l.toLowerCase().startsWith("style:"));
	if (mapStyle)
		mapStyle = mapStyle.toLocaleLowerCase().replace("style:", "").trim();
	return mapStyle;
};

const findMapZoom = (rows: string[]) => {
	let mapZoom = rows.find((l) => l.toLowerCase().startsWith("zoom:"));
	if (mapZoom)
		mapZoom = mapZoom.toLocaleLowerCase().replace("zoom:", "").trim();
	return mapZoom;
};

const findSearchQuery = (rows: string[]) => {
	let searchQuery = rows.find((l) => l.toLowerCase().startsWith("search:"));
	if (searchQuery)
		searchQuery = searchQuery
			.toLocaleLowerCase()
			.replace("search:", "")
			.trim();
	return searchQuery;
};