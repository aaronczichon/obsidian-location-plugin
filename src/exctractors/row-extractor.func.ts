// This file is used to define functions which extracting specific information from the rows
// of a code block. The extracted information is then used to configure the map settings.

export const findLatitudeAndLongitude = (rows: string[]) => {
	const regex = /^\[\s*(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\s*\]$/;
	let latLong = rows.find((l) => regex.test(l.toLowerCase()));
	if (latLong) {
		const match = latLong.match(regex);
		if (match) {
			return [match[1], match[3]];
		}
	}
};

export const findLatitude = (rows: string[]) => {
	let latitude = rows.find((l) => l.toLowerCase().startsWith('latitude:'));
	if (latitude) latitude = latitude.toLocaleLowerCase().replace('latitude:', '').trim();
	return latitude;
};

export const findLongitude = (rows: string[]) => {
	let longitude = rows.find((l) => l.toLowerCase().startsWith('longitude:'));
	if (longitude) longitude = longitude.toLocaleLowerCase().replace('longitude:', '').trim();
	return longitude;
};

export const findMarkerUrl = (rows: string[]) => {
	let markerUrl = rows.find((l) => l.toLowerCase().startsWith('marker-url:'));
	if (markerUrl) markerUrl = markerUrl.toLocaleLowerCase().replace('marker-url:', '').trim();
	return markerUrl;
};

export const findMarkerIcon = (rows: string[]) => {
	let makiIcon = rows.find((l) => l.toLowerCase().startsWith('maki:'));
	if (makiIcon) makiIcon = makiIcon.toLocaleLowerCase().replace('maki:', '').trim();
	return makiIcon;
};

export const findMapStyle = (rows: string[]) => {
	let mapStyle = rows.find((l) => l.toLowerCase().startsWith('style:'));
	if (mapStyle) mapStyle = mapStyle.toLocaleLowerCase().replace('style:', '').trim();
	return mapStyle;
};

export const findMapZoom = (rows: string[]) => {
	let mapZoom = rows.find((l) => l.toLowerCase().startsWith('zoom:'));
	if (mapZoom) mapZoom = mapZoom.toLocaleLowerCase().replace('zoom:', '').trim();
	return mapZoom;
};

export const findSearchQuery = (rows: string[]) => {
	let searchQuery = rows.find((l) => l.toLowerCase().startsWith('search:'));
	if (searchQuery) searchQuery = searchQuery.toLocaleLowerCase().replace('search:', '').trim();
	return searchQuery;
};

/**
 * Extracts multiple coordinates from the rows of a code block.
 * The coordinates are expected to be in the format [latitude, longitude].
 * @example
 * // returns [['1.234', '2.345'], ['3.456', '4.567']]
 * @param rows every row of the code block
 * @returns an array of multiple coordinates
 */
export const findMultipleCoordinates = (rows: string[]): string[][] => {
	const regex = /^\[\s*(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\s*\]$/;
	const filteredRows = rows.filter((l) => regex.test(l.toLowerCase()));
	return filteredRows
		.map((l) => {
			const match = l.match(regex);
			if (!match) return;
			return [match[1], match[3]];
		})
		.filter((coordinates) => coordinates !== undefined) as string[][];
};
