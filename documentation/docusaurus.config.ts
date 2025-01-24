import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
	title: 'Obsidian Location Plugin',
	tagline: 'Bring locations to your notes',
	favicon: 'img/olp_logo.png',

	// Set the production url of your site here
	url: 'https://obsidian-location.czichon.cloud',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'aaronczichon', // Usually your GitHub org/user name.
	projectName: 'obsidian-location-plugin', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					// 	'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: 'img/social.png',
		navbar: {
			title: 'Obsidian Location Plugin',
			logo: {
				alt: 'Obsidian Location Plugin Logo',
				src: 'img/olp_logo.png',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'docsSidebar',
					position: 'left',
					label: 'Docs',
				},
				{
					href: 'https://github.com/aaronczichon/obsidian-location-plugin',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'light',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Documentation',
							to: '/docs/intro',
						},
					],
				},
				{
					title: 'Aaron Czichon',
					items: [
						{
							label: 'Website',
							href: 'https://aaronczichon.de',
						},
					],
				},
				{
					title: 'Social Media',
					items: [
						{
							label: 'Github',
							href: 'https://github.com/aaronczichon',
						},
						{
							label: 'Mastodon',
							href: 'https://mastodon.social/@czichon',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Aaron Czichon`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
