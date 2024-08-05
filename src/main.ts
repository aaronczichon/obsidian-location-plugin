import { Notice, Plugin } from "obsidian";
import { getStaticMapImageUrl } from "./functions/map.func";
import { processCodeBlock } from "./functions/process-code.func";
import { processLocationSearch } from "./functions/process-location-search.func";
import { checkVersionUpdate } from "./functions/version-hint.func";
import { LocationSettingTab } from "./settings/plugin-settings.tab";
import {
	DEFAULT_SETTINGS,
	LocationPluginSettings,
} from "./settings/plugin-settings.types";

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

	public processLocationCodeBlock = async (
		source: string,
		el: HTMLElement,
	) => {
		try {
			const extractedData = processCodeBlock(source);
			let mapboxAccessToken = this.settings.mapboxToken;
			if (!mapboxAccessToken) {
				this.showNotice(
					"Mapbox access token is not set. Please set it in the plugin settings.",
				);
				return;
			}

			if (
				!extractedData.searchQuery &&
				(!extractedData.latitude || !extractedData.longitude)
			) {
				this.showNotice(
					"Error processing location code block. Either Longitude and Latitude are required together, or a search term.",
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
			this.addStaticImageToContainer(
				this.settings,
				extractedData,
				el,
				lat,
				long,
			);
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
			this.showNotice(
				"Error processing location code block. Please check syntax or missing settings.",
			);
		}
	};

	private addStaticImageToContainer = (
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
			this.showNotice(e);
		}
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
}
