import { Modal, Setting } from 'obsidian';
import MapboxPlugin from '../main';
import { mapZoomSetting } from '../settings/plugin-settings.control';

export class MapZoomModal extends Modal {
	constructor(plugin: MapboxPlugin, onSubmit: (result: string) => void) {
		super(plugin.app);
		this.titleEl.setText('Update default map zoom level');

		let zoomLevel = plugin.settings.mapZoom;
		mapZoomSetting(this.contentEl, plugin, (value: string) => (zoomLevel = value));

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText('Submit')
				.setCta()
				.onClick(() => {
					this.close();
					onSubmit(zoomLevel);
				}),
		);
	}
}
