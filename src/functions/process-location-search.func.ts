import { requestUrl } from "obsidian";

export const processLocationSearch = async (
	query: string = "",
	accessToken: string,
) => {
	const mapbox_id: string = await hitSuggestAPI(query, accessToken);
	const result: any = await hitRetrieveAPI(mapbox_id, accessToken);
	const properties = result.json.features[0].properties;
	const latitude = properties.coordinates.latitude;
	const longitude = properties.coordinates.longitude;
	return [latitude, longitude, properties.full_address];
};

// query the /suggest search API endpoint and retrieve the first result from the suggested locations
// returns the mapbox_id
const hitSuggestAPI = async (query: string, accessToken: string) => {
	const suggestUrl = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&language=en&limit=1&session_token=00000000-0000-0000-0000-000000000000&access_token=${accessToken}`;
	const suggestObject = await requestUrl(suggestUrl);
	const result = await suggestObject.json;
	const mapbox_id = result.suggestions[0].mapbox_id;
	console.log("***mapbox_id found***" + mapbox_id);
	return mapbox_id;
};

// use the mapbox_id to query the /retrieve API endpoint for the location
// returns object for the location
const hitRetrieveAPI = async (mapbox_id: string, accessToken: string) => {
	const retrieveUrl = `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapbox_id}?session_token=00000000-0000-0000-0000-000000000000&access_token=${accessToken}`;
	const retrieveObject = await requestUrl(retrieveUrl);
	return retrieveObject;
};
