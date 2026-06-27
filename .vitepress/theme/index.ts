import { defineCustomElement } from "@vue/runtime-dom"
import { inBrowser } from "vitepress"
import theme from "vitepress/theme"
import type { App, DefineComponent } from "@vue/runtime-core"
import type { CustomElementOptions } from "@vue/runtime-dom"
import type { Ref } from "@vue/reactivity"
import type { Router, SiteData, Theme } from "vitepress"

//! TS2876: This relative import path is unsafe to rewrite because it looks like a file name,
//! but actually resolves to "../component/Hello.ce.vue".
// @ts-ignore
import Hello from "../component/Hello.ce.vue"

// https://cn.vuejs.org/guide/extras/web-components#sfc-as-custom-element
const addCustomElement = (name: string, component: DefineComponent, opt?: CustomElementOptions) => {
	void customElements.define(name, defineCustomElement(component, opt))
}

// https://vitepress.dev/zh/guide/custom-theme
import "./main.pcss"
import "./style.css"
export default {
	extends: theme,
	enhanceApp(_ctx: { app: App<Element>; router: Router; siteData: Ref<SiteData> }) {
		if (inBrowser) {
			addCustomElement("x-hello", Hello)
		}
	},
} as const satisfies Theme
