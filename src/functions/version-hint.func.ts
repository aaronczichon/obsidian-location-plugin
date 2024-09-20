import { Notice, Plugin } from 'obsidian';

export const checkVersionUpdate = async (plugin: Plugin) => {
	const data = await plugin.loadData();
	if (data && data.version === plugin.manifest.version) return;

	new Notice(
		`Mapbox plugin has been updated to version ${plugin.manifest.version}. Check the changelog for more information and new features.`,
		5000,
	);

	data.version = plugin.manifest.version;
	await plugin.saveData(data);
};
