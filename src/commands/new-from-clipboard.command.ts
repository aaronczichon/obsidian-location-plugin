import { Editor, MarkdownView, Plugin } from 'obsidian';

export const addNewLocationFromClipboard = async (plugin: Plugin) => {
	plugin.addCommand({
		id: 'add-new-location-from-clipboard',
		name: 'Add new location block from clipboard',
		editorCallback: async (editor: Editor, view: MarkdownView) => {
			let clipboard = await navigator.clipboard.readText();
			const document = editor.getDoc();
			const vaule = document.getValue();

			// if clipboard contains [] around the coordinates, remove them
			const clipboardMatch = clipboard.match(/\[(.*)\]/);
			clipboard = clipboardMatch ? clipboardMatch[1] : clipboard;

			const locationBlock = `\`\`\`location\n[${clipboard}]\n\`\`\``;
			document.setValue(vaule + locationBlock);
		},
	});
};
