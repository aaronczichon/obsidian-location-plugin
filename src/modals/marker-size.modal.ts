import { Modal, Setting } from 'obsidian';
import MapboxPlugin from '../main';
import { markerSizeSetting } from '../settings/plugin-settings.control';

export class MarkerSizeModal extends Modal {
	constructor(plugin: MapboxPlugin, onSubmit: (result: string) => void) {
		super(plugin.app);
		this.titleEl.setText('Change marker size');

		let size: 's' | 'm' | 'l' = plugin.settings.markerSize;
		markerSizeSetting(this.contentEl, plugin, async (value: string) => {
			size = value as 's' | 'm' | 'l';
		});

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText('Submit')
				.setCta()
				.onClick(() => {
					this.close();
					onSubmit(size);
				}),
		);
	}
}
