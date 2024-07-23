export const processCodeBlock = (source: string) => {
	const rows = source.split("\n");

	const latitude = findLatitude(rows);
	const longitude = findLongitude(rows);
	const markerUrl = findMarkerUrl(rows);
	const makiIcon = findMarkerIcon(rows);
	const mapStyle = findMapStyle(rows);
	const mapZoom = findMapZoom(rows);

	return {
		latitude,
		longitude,
		markerUrl,
		makiIcon,
		mapStyle,
		mapZoom
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
