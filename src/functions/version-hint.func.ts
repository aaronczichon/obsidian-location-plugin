import { Notice, Plugin } from 'obsidian';

export const checkVersionUpdate = async (plugin: Plugin) => {
	let data = await plugin.loadData();
	if (data && data.version && plugin.manifest && data.version === plugin.manifest.version) return;

	new Notice(
		`Mapbox plugin has been updated to version ${plugin.manifest.version}. Check the changelog for more information and new features.`,
		5000,
	);

	if (!data) {
		// If data is null, create a new object
		data = {};
	}

	data.version = plugin.manifest.version;
	await plugin.saveData(data);
};
