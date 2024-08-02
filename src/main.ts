import { Notice, Plugin, requestUrl, SuggestModal } from "obsidian";
import { processCodeBlock } from "./functions/process-code.func";
import { checkVersionUpdate } from "./functions/version-hint.func";
import { LocationSettingTab } from "./settings/plugin-settings.tab";
import {
	DEFAULT_SETTINGS,
	LocationPluginSettings,
} from "./settings/plugin-settings.types";
import { processLocationSearch } from "./functions/process-location-search.func";

export default class MapboxPlugin extends Plugin {
	settings: LocationPluginSettings;

	async onload() {
		// Load the settings initially
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			"location",
			this.processLocationCodeBlock,
		);

		this.addSettingTab(new LocationSettingTab(this.app, this));

		await checkVersionUpdate(this);
	}

	public processLocationCodeBlock = (source: string, el: HTMLElement) => {		
		try {
			const extractedData = processCodeBlock(source);
			let mapboxAccessToken = this.settings.mapboxToken;
			if (!mapboxAccessToken) {
				this.showNotice(
					"Mapbox access token is not set. Please set it in the plugin settings.",
				);
				return;
			}
			
			if ((!extractedData.searchQuery) && (!extractedData.latitude || !extractedData.longitude)) {
				this.showNotice(
					"Error processing location code block. Either Longitude and Latitude are required together, or a search term.",
				);
				return;
			}

			// check if being run as a search then retrieve and render the image
			if (extractedData.searchQuery) {
				const searchUrl = processLocationSearch(
					extractedData.searchQuery,
					mapboxAccessToken,
				).then(properties => {
					const longitude:string = properties.coordinates.longitude;
					const latitude:string = properties.coordinates.latitude;
					const searchImageUrl = this.getStaticMapImageUrl(
						latitude,
						longitude,
						extractedData.markerUrl,
						extractedData.makiIcon,
						extractedData.mapStyle,
						extractedData.mapZoom,
					);
					const searchImageElement = document.createElement("img");
					searchImageElement.src = searchImageUrl;
					searchImageElement.classList.add("mapbox-image");
					el.appendChild(searchImageElement);

					// render in the address of the location as text
					// allows user to confirm the location is the intended one
					const searchInfoElement = document.createElement("p");
					searchInfoElement.innerText = properties.full_address;
					searchInfoElement.classList.add("mapbox-image-info");
					el.appendChild(searchInfoElement);

				});
			// if not a search then use the long-lat coordinates input by user	
			} else {
				const imageUrl = this.getStaticMapImageUrl(
					extractedData.latitude,
					extractedData.longitude,
					extractedData.markerUrl,
					extractedData.makiIcon,
					extractedData.mapStyle,
					extractedData.mapZoom,
				);
	
				const imageElement = document.createElement("img");
				imageElement.src = imageUrl;
				imageElement.classList.add("mapbox-image");
	
				el.appendChild(imageElement);
			}
			
		} catch (e) {
			this.showNotice(
				"Error processing location code block. Please check syntax or missing settings.",
			);
		}
	};

	public getStaticMapImageUrl = (
		latitude: string = "",
		longitude: string = "",
		codeMarker: string = "",
		makiIcon: string = "",
		style: string = "",
		zoom: string = "",
	): string => {
		const mapboxAccessToken = this.settings.mapboxToken;

		const markerUrl = this.getMarkerUrl(codeMarker, makiIcon);

		if (markerUrl && makiIcon) {
			this.showNotice(
				"Both marker URL and Maki icon are set. Setting both is not a valid combination.",
			);
		}

		const mapStyle = style || this.settings.mapStyle;

		const mapZoom = zoom || this.settings.mapZoom;

		const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/${markerUrl}(${longitude},${latitude})/${longitude},${latitude},${mapZoom}/800x400?access_token=${mapboxAccessToken}`;

		return imageUrl;
	};

	public loadSettings = async () => {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	};

	public saveSettings = async () => {
		await this.saveData(this.settings);
	};

	private showNotice = (message: string) => {
		new Notice(message, 5000);
	};

	private getMarkerUrl = (codeMarker: string, makiIcon: string) => {
		// If a marker URL is set in code block use it
		if (codeMarker) return `url-${encodeURIComponent(codeMarker)}`;
		// If a marker URL is set in settings use it
		if (this.settings.markerUrl)
			return `url-${encodeURIComponent(this.settings.markerUrl)}`;

		// if no marker URL is set at all, use the default
		return `pin-${this.settings.markerSize}-${makiIcon || "home"}+${this.settings.markerColor}`;
	};
}
