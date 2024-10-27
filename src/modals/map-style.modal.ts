import { Modal, Setting } from 'obsidian';
import MapboxPlugin from '../main';
import { mapStyleSetting } from '../settings/plugin-settings.control';

export class MapStyleModal extends Modal {
	constructor(plugin: MapboxPlugin, onSubmit: (result: string) => void) {
		super(plugin.app);
		this.titleEl.setText('Update default map style');

		let style = plugin.settings.mapStyle;
		mapStyleSetting(this.contentEl, plugin, (value: string) => (style = value));

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText('Submit')
				.setCta()
				.onClick(() => {
					this.close();
					onSubmit(style);
				}),
		);
	}
}
