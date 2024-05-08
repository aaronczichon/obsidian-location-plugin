export const processCodeBlock = (source: string) => {
	const rows = source.split("\n");

	const latitude = findLatitude(rows);
	const longitude = findLongitude(rows);
	const markerUrl = findMarkerUrl(rows);

	return {
		latitude,
		longitude,
		markerUrl,
	};
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
