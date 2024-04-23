import { Notice, Plugin } from "obsidian";
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
			const locations = source.split("\n");

			const latitude = locations[0]
				.toLowerCase()
				.replace("latitude: ", "")
				.trim();
			const longitude = locations[1]
				.toLowerCase()
				.replace("longitude: ", "")
				.trim();

			const imageUrl = this.getStaticMapImageUrl(latitude, longitude);

			const imageElement = document.createElement("img");
			imageElement.src = imageUrl;
			imageElement.style.display = "block";
			imageElement.style.maxWidth = "100%";
			imageElement.style.margin = "1rem auto";

			el.appendChild(imageElement);
		} catch (e) {
			console.log(e);
		}
	};

	public getStaticMapImageUrl = (
		latitude: string,
		longitude: string,
	): string => {
		const mapboxAccessToken = this.settings.mapboxToken;
		if (!mapboxAccessToken) {
			this.showNotice(
				"Mapbox access token is not set. Please set it in the plugin settings.",
			);
			return "";
		}

		const markerColor = this.settings.markerColor;
		const markerSize = this.settings.markerSize;

		const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-${markerSize}-home+${markerColor}(${longitude},${latitude})/${longitude},${latitude},14/800x400?access_token=${mapboxAccessToken}`;

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
}
