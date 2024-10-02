import { defineClientComponent } from "vitepress"
import { defineCustomElement, h } from "vue"
import DefaultTheme from "vitepress/theme"
import Hello from "../component/Hello.ce.vue"
import type { Theme } from "vitepress"

if ("undefined" != typeof customElements) {
	// https://cn.vuejs.org/guide/extras/web-components#sfc-as-custom-element
	const x_hello = defineCustomElement(Hello)
	customElements?.define("x-hello", x_hello)
} else {
	// https://vitepress.dev/zh/guide/ssr-compat#defineclientcomponent
	// defineClientComponent
}

// https://vitepress.dev/zh/guide/custom-theme
import "./main.pcss"
import "./style.css"
export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
		})
	},
	enhanceApp({ app, router, siteData }) {
		// https://cn.vuejs.org/guide/components/registration#global-registration
		app.component("Hello", Hello)
	},
} satisfies Theme
