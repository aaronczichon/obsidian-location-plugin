export interface LocationPluginSettings {
	mapboxToken: string;
	markerSize: 's' | 'm' | 'l';
	markerColor: string;
	markerUrl: string;
	mapStyle: string;
	mapZoom: string;
	reverseOrder: boolean;
}

export const DEFAULT_SETTINGS: Partial<LocationPluginSettings> = {
	mapboxToken: '',
	markerSize: 'l',
	markerColor: 'ff0000',
	markerUrl: '',
	mapStyle: 'streets-v12',
	mapZoom: '15',
	reverseOrder: false,
};

export type BlockSettingsConfiguration = {
	makiIcon?: string;
	markerUrl?: string;
	style?: string;
	zoom?: string;
};

export type LocationMarker = {
	latitude: number;
	longitude: number;
	name?: string;
	makiIcon?: string;
};

export type MultiLocationBlockConfiguration = BlockSettingsConfiguration & {
	locations: LocationMarker[];
};

export type LocationBlockConfiguration = BlockSettingsConfiguration & {
	latitude?: string;
	longitude?: string;
	searchQuery?: string;
	locations?: LocationMarker[];
};
