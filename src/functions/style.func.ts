export type MapboxStyle = {
	mapboxName: string;
	blockName: string;
	settingsName: string;
};

export const mapboxStyles: MapboxStyle[] = [
	{
		mapboxName: 'streets-v12',
		blockName: 'streets',
		settingsName: 'Streets',
	},
	{
		mapboxName: 'outdoors-v12',
		blockName: 'outdoors',
		settingsName: 'Outdoors',
	},
	{
		mapboxName: 'light-v11',
		blockName: 'light',
		settingsName: 'Light',
	},
	{
		mapboxName: 'dark-v11',
		blockName: 'dark',
		settingsName: 'Dark',
	},
	{
		mapboxName: 'satellite-v9',
		blockName: 'satellite',
		settingsName: 'Satellite',
	},
	{
		mapboxName: 'satellite-streets-v12',
		blockName: 'satellite-streets',
		settingsName: 'Satellite Streets',
	},
	{
		mapboxName: 'navigation-day-v1',
		blockName: 'navigation-day',
		settingsName: 'Navigation Day',
	},
	{
		mapboxName: 'navigation-night-v1',
		blockName: 'navigation-night',
		settingsName: 'Navigation Night',
	},
];

/**
 * Get the Mapbox style name from the user-defined style.
 * @param style The user-defined style.
 */
export const getMapboxStyle = (style: string) => {
	const mapboxStyle = mapboxStyles.find((s) => s.blockName === style);
	if (mapboxStyle) return mapboxStyle.mapboxName;
	return 'streets-v12';
};
