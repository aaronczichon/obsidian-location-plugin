import { Modal, Setting } from 'obsidian';
import MapboxPlugin from '../main';
import { apiTokenSetting } from '../settings/plugin-settings.control';

export class ApiTokenModal extends Modal {
	constructor(plugin: MapboxPlugin, onSubmit: (result: string) => void) {
		super(plugin.app);
		this.titleEl.setText('Update Mapbox API Token');

		let token = plugin.settings.mapboxToken;
		apiTokenSetting(this.contentEl, plugin, (value: string) => (token = value));

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText('Submit')
				.setCta()
				.onClick(() => {
					this.close();
					onSubmit(token);
				}),
		);
	}
}
