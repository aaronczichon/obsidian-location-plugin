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

export type MultiLocationBlockConfiguration = BlockSettingsConfiguration & {
	locations: Array<{
		latitude: number;
		longitude: number;
	}>;
};

export type LocationBlockConfiguration = BlockSettingsConfiguration & {
	latitude?: string;
	longitude?: string;
	searchQuery?: string;
};
