import { Modal, Setting } from 'obsidian';
import MapboxPlugin from '../main';
import { markerColorSetting } from '../settings/plugin-settings.control';

export class MarkerColorModal extends Modal {
	constructor(plugin: MapboxPlugin, onSubmit: (result: string) => void) {
		super(plugin.app);
		this.titleEl.setText('Update default marker color');

		let color = plugin.settings.markerColor;
		markerColorSetting(this.contentEl, plugin, (value: string) => (color = value));

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText('Submit')
				.setCta()
				.onClick(() => {
					this.close();
					onSubmit(color);
				}),
		);
	}
}
