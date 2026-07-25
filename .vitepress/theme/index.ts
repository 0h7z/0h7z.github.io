import { addCustomElement } from "../main"
import { inBrowser } from "vitepress"
import theme from "vitepress/theme"
import type { App, Ref } from "../main"
import type { Router, SiteData, Theme } from "vitepress"

//! TS2876: This relative import path is unsafe to rewrite because it looks like a file name,
//! but actually resolves to "../component/Hello.ce.vue".
// @ts-ignore TS2876
import Hello from "../component/Hello.ce.vue"
// @ts-ignore TS2876
import Trace from "../component/Trace.ce.vue"

// https://vitepress.dev/zh/guide/custom-theme
import "./main.pcss"
import "./style.css"
export default {
	extends: theme,
	enhanceApp(_ctx: { app: App<HTMLElement>; router: Router; siteData: Ref<SiteData> }) {
		if (inBrowser) {
			addCustomElement("x-hello", Hello)
			addCustomElement("x-trace", Trace)
		}
	},
} as const satisfies Theme
