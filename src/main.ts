import { Notice, Plugin } from "obsidian";
import { processCodeBlock } from "./functions/process-code.func";
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
	}

	public processLocationCodeBlock = (source: string, el: HTMLElement) => {
		try {
			const extractedData = processCodeBlock(source);

			if (!extractedData.latitude || !extractedData.longitude) {
				this.showNotice(
					"Error processing location code block. Latitude and Longitude are required.",
				);
				return;
			}

			const imageUrl = this.getStaticMapImageUrl(
				extractedData.latitude,
				extractedData.longitude,
				extractedData.markerUrl,
			);

			const imageElement = document.createElement("img");
			imageElement.src = imageUrl;
			imageElement.classList.add("mapbox-image");

			el.appendChild(imageElement);
		} catch (e) {
			this.showNotice(
				"Error processing location code block. Please check syntax or missing settings.",
			);
		}
	};

	public getStaticMapImageUrl = (
		latitude: string,
		longitude: string,
		codeMarker: string = "",
	): string => {
		const mapboxAccessToken = this.settings.mapboxToken;
		if (!mapboxAccessToken) {
			this.showNotice(
				"Mapbox access token is not set. Please set it in the plugin settings.",
			);
			return "";
		}
		const markerUrl = this.getMarkerUrl(codeMarker);

		const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${markerUrl}(${longitude},${latitude})/${longitude},${latitude},14/800x400?access_token=${mapboxAccessToken}`;

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

	private getMarkerUrl = (codeMarker: string) => {
		// If a marker URL is set in code block use it
		if (codeMarker) return `url-${encodeURIComponent(codeMarker)}`;
		// If a marker URL is set in settings use it
		if (this.settings.markerUrl)
			return `url-${encodeURIComponent(this.settings.markerUrl)}`;

		// if no marker URL is set at all, use the default
		return `pin-${this.settings.markerSize}-home+${this.settings.markerColor}`;
	};
}
