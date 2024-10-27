import { App, Modal, Setting } from 'obsidian';

export class MarkerSizeModal extends Modal {
	constructor(app: App, currentSize: 's' | 'm' | 'l', onSubmit: (result: string) => void) {
		super(app);
		this.titleEl.setText('Change marker size');

		let size: 's' | 'm' | 'l' = currentSize;
		new Setting(this.contentEl)
			.setName('Marker Size')
			.setDesc('Size of the marker on the map. This is ignored if a custom marker url is set.')
			.addDropdown((text) =>
				text
					.addOption('s', 'small')
					.addOption('m', 'medium')
					.addOption('l', 'large')
					.setValue(currentSize)
					.onChange(async (value) => {
						size = value as 's' | 'm' | 'l';
					}),
			);

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
