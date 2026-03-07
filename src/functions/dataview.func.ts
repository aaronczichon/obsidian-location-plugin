import { App } from 'obsidian';

/**
 * Resolves Dataview inline expressions (e.g. `=this.lat`) in a code block source string.
 * Uses the Dataview plugin API to look up page metadata for the current file.
 *
 * If the Dataview plugin is not installed or the expressions can't be resolved,
 * the original source is returned unchanged.
 */
export const resolveDataviewExpressions = (
	source: string,
	app: App,
	sourcePath: string,
): string => {
	// Quick check: if no Dataview expressions, return early
	if (!source.includes('=this.')) return source;

	// Try to access the Dataview plugin API
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dataviewApi = (app as any).plugins?.plugins?.dataview?.api;
	if (!dataviewApi) return source;

	// Get the page metadata for the current file
	const page = dataviewApi.page(sourcePath);
	if (!page) return source;

	// Replace all =this.fieldName patterns with resolved values
	return source.replace(/=this\.([\w][\w.-]*)/g, (_match, fieldPath: string) => {
		const parts = fieldPath.split('.');
		let value = page;
		for (const part of parts) {
			if (value === undefined || value === null) return _match;
			value = value[part];
		}
		// Only replace if we got a concrete value
		if (value === undefined || value === null) return _match;
		return String(value);
	});
};
