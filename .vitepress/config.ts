import { createContentLoader, defineConfig } from "vitepress"
import footnote from "markdown-it-footnote"
import icon from "./octicon.json" with { type: "json" }
import locale from "./locale.json" with { type: "json" }
import type { DefaultTheme, LocaleConfig, MarkdownOptions } from "vitepress"
import type { LocalSearchTranslations } from "vitepress/types/local-search"
import type { Options } from "@vitejs/plugin-vue"

export type Language = keyof typeof locale.language

// https://vitepress.dev/zh/guide/data-loading#createcontentloader
// createContentLoader

const YEAR = new Date().getUTCFullYear()

const LANG = ["en", "zh"] as const satisfies Language[]

const NAVI: Partial<Record<Language | "und", DefaultTheme.NavItem[]>> = {
	en: [
		{ activeMatch: "^/en/blog/", link: "/en/blog/", text: "Blog" },
		{ activeMatch: "^/en/docs/", link: "/en/docs/", text: "Docs" },
		{ activeMatch: "^/en/snowfox/", link: "/en/snowfox/", text: "Snowfox" },
		{ activeMatch: "^/en/about/", link: "/en/about/", text: "About" },
	],
	zh: [
		{ activeMatch: "^/zh/blog/", link: "/zh/blog/", text: "博客" },
		{ activeMatch: "^/zh/docs/", link: "/zh/docs/", text: "文档" },
		{ activeMatch: "^/zh/snowfox/", link: "/zh/snowfox/", text: "雪狐" },
		{ activeMatch: "^/zh/about/", link: "/zh/about/", text: "关于" },
	],
}

const SIDE: Record<string, DefaultTheme.SidebarItem[]> = {
	"/en/blog": [{ link: "/", text: "Blog" }],
	"/zh/blog": [{ link: "/", text: "博客" }],
	"/en/snowfox": [
		{
			link: "/",
			text: "Snowfox",
			items: [
				{ link: "/changelog/", text: "Changelog" },
				{ link: "/manual/", text: "Build Guide" },
			],
		},
	],
	"/zh/snowfox": [{ link: "/", text: "雪狐" }],
}

const SRCH: Partial<Record<Language, LocalSearchTranslations>> = {
	en: {},
	zh: {
		button: { buttonText: "搜索", buttonAriaLabel: undefined },
		modal: {
			// displayDetails: "displayDetails",
			// resetButtonTitle: "resetButtonTitle",
			// backButtonTitle: "backButtonTitle",
			// noResultsText: "noResultsText",
			footer: {
				// selectText: "selectText",
				// selectKeyAriaLabel: "selectKeyAriaLabel",
				// navigateText: "navigateText",
				// navigateUpKeyAriaLabel: "navigateUpKeyAriaLabel",
				// navigateDownKeyAriaLabel: "navigateDownKeyAriaLabel",
				// closeText: "closeText",
				// closeKeyAriaLabel: "closeKeyAriaLabel",
			},
		},
	},
}

const ROOT /* : DefaultTheme.Config */ = {
	// https://vitepress.dev/zh/reference/default-theme-config
	i18nRouting: true,
	logo: "/apple-touch-icon.png",
	siteTitle: undefined,
	nav: NAVI.und?.length ? NAVI.und : undefined,
	sidebar: undefined,
	aside: true,
	outline: { level: "deep" },
	socialLinks: [{ icon: { svg: icon.mark_github }, link: "https://github.com/0h7z/0h7z.github.io" }],
	footer: { copyright: `Copyright &COPY; ${2022}-${Math.max(2025, YEAR)} Heptazhou. All rights reserved.` },
	editLink: { pattern: "https://github.com/0h7z/0h7z.github.io/blob/master/src/:path" },
	lastUpdated: { formatOptions: { forceLocale: "sv", dateStyle: "short", timeStyle: "medium" } },
	docFooter: undefined,
	darkModeSwitchLabel: undefined,
	lightModeSwitchTitle: undefined,
	darkModeSwitchTitle: undefined,
	sidebarMenuLabel: undefined,
	returnToTopLabel: undefined,
	langMenuLabel: undefined,
	externalLinkIcon: true,

	// https://vitepress.dev/zh/reference/default-theme-search
	search: {
		provider: "local",
		options: {
			locales: { zh: { translations: SRCH.zh } },
			miniSearch: undefined,
		},
	},
} as const satisfies DefaultTheme.Config

const I18N: Partial<Record<Language, DefaultTheme.Config>> = {
	en: {
		outline: { level: ROOT.outline.level, label: "Contents" },
		editLink: { pattern: ROOT.editLink.pattern, text: "View source" },
	},
	zh: {
		outline: { level: ROOT.outline.level, label: "目录" },
		editLink: { pattern: ROOT.editLink.pattern, text: "查看源码" },
		lastUpdated: { formatOptions: ROOT.lastUpdated.formatOptions, text: "最后更新" },
		docFooter: { prev: "上一页", next: "下一页" },
		darkModeSwitchLabel: "网站外观",
		lightModeSwitchTitle: "浅色模式",
		darkModeSwitchTitle: "深色模式",
		sidebarMenuLabel: "菜单",
		returnToTopLabel: "回到顶部",
		langMenuLabel: "切换语言",
	},
}

const localeconfig = (lang: Language): LocaleConfig<DefaultTheme.Config> => {
	const label = `${locale.language[lang]} (${lang})`
	const link = `/${lang}/`
	const nav = NAVI[lang]
	const sidebar: typeof SIDE = {}
	for (const [k, v] of Object.entries(SIDE).filter(([k]) => k.startsWith(link))) {
		for (const x of v) x.base = k
		sidebar[k] = v
	}
	return { [lang]: { label, lang, link, themeConfig: { ...I18N[lang], nav, sidebar } } }
}

export default defineConfig({
	// https://vitepress.dev/zh/guide/i18n
	locales: Object.assign({}, ...LANG.map(localeconfig)),

	// https://vitepress.dev/zh/guide/sitemap-generation
	sitemap: {
		hostname: "https://0h7z.com",
		lastmodDateOnly: false,
		xmlns: { news: false, xhtml: !true, image: false, video: false },
		transformItems: (xs) => {
			xs.forEach((x) => x.links && delete x.links)
			return xs
		},
	},

	// https://vitepress.dev/zh/reference/site-config#site-metadata
	title: "0h7z",
	titleTemplate: undefined,
	description: "0h7z",
	head: [
		["meta", { name: "color-scheme", content: "dark light" }],
		["meta", { name: "referrer", content: "no-referrer" }],
		["meta", { name: "robots", content: "noindex, nofollow, noodp, noarchive, nosnippet, noimageindex, nocache" }],
		["meta", { name: "theme-color", content: "#1C1B2200" }],
		["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
		// Icon
		["link", { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
		["link", { rel: "icon", href: "/favicon.png", type: "image/png" }],
		// Apple
		["link", { rel: "apple-touch-icon", href: "/favicon.png", type: "image/png" }],
		["link", { rel: "apple-touch-startup-image", href: "/favicon.png", type: "image/png" }],
		["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
		["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
		["meta", { name: "format-detection", content: "telephone=no" }],
		// Style
		["style", {}, "html { background: #1C1B22; background: light-dark(#FFFFFF, #1C1B22); }"],
	],
	lang: "und",
	base: "/",

	// https://vitepress.dev/zh/reference/site-config#routing
	cleanUrls: true,
	rewrites: {
		// /<000:999>/
		":code(\\d{3}).md": ":code/index.md",
		// /<lang>/[path]/
		":path(.+?)/index@:lang([a-z]{2}).md": ":lang/:path/index.md",
		"index@:lang([a-z]{2}).md": ":lang/index.md",
		// /<lang>/[path]/<name>/
		":name@:lang([a-z]{2}).md": ":lang/:name/index.md",
		":path(.+?)/:name@:lang([a-z]{2}).md": ":lang/:path/:name/index.md",
	},

	// https://vitepress.dev/zh/reference/site-config#build
	srcDir: "src",
	srcExclude: undefined,
	outDir: "docs",
	assetsDir: "@",
	cacheDir: "temp",
	ignoreDeadLinks: true,
	metaChunk: true,
	mpa: false,

	// https://vitepress.dev/zh/reference/site-config#theming
	appearance: { initialValue: "dark", valueDark: "dark", valueLight: "light" },
	lastUpdated: true,

	// https://vitepress.dev/zh/reference/site-config#customization
	// https://github.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts
	markdown: {
		preConfig: undefined,
		config: (md) => md.use(footnote),
		cache: true,
		externalLinks: undefined,
		theme: undefined,
		languages: undefined,
		languageAlias: undefined,
		lineNumbers: true,
		defaultHighlightLang: undefined,
		codeTransformers: undefined,
		shikiSetup: undefined,
		codeCopyButtonTitle: "",
		anchor: undefined,
		attrs: undefined,
		emoji: undefined,
		frontmatter: undefined,
		headers: undefined,
		sfc: undefined,
		toc: undefined,
		component: undefined,
		container: undefined,
		math: true,
		image: undefined,
		gfmAlerts: true,
	} satisfies MarkdownOptions,
	// https://cn.vitejs.dev/config/
	vite: { configFile: "vite.config.js" },
	// https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options
	vue: {
		// include: /\.(vue|md)$/,
		// exclude: undefined,
		template: { compilerOptions: { isCustomElement: (x) => x.startsWith("x-") } },
	} satisfies Options,

	// https://vitepress.dev/zh/reference/site-config#build-hooks
	buildEnd: undefined,
	postRender: undefined,
	transformHead: undefined,
	transformHtml: undefined,
	transformPageData: undefined,

	// https://vitepress.dev/zh/reference/default-theme-config
	themeConfig: ROOT,
})
