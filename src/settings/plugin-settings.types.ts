export interface LocationPluginSettings {
	mapboxToken: string;
	markerSize: "s" | "m" | "l";
	markerColor: string;
	markerUrl: string;
	mapStyle: string;
}

export const DEFAULT_SETTINGS: Partial<LocationPluginSettings> = {
	mapboxToken: "",
	markerSize: "l",
	markerColor: "ff0000",
	markerUrl: "",
	mapStyle: "streets-v12",
};
