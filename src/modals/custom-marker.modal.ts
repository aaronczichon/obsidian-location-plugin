import { Modal, Setting } from 'obsidian';
import MapboxPlugin from '../main';
import { markerUrlSetting } from '../settings/plugin-settings.control';

export class CustomMarkerUrlModal extends Modal {
	constructor(plugin: MapboxPlugin, onSubmit: (result: string) => void) {
		super(plugin.app);
		this.titleEl.setText('Set default custom marker URL');

		let markerUrl = plugin.settings.markerUrl;
		markerUrlSetting(this.contentEl, plugin, (value: string) => (markerUrl = value));

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText('Submit')
				.setCta()
				.onClick(() => {
					this.close();
					onSubmit(markerUrl);
				}),
		);
	}
}
