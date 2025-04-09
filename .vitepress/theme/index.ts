import { defineClientComponent } from "vitepress"
import { defineCustomElement, h } from "vue"
import Hello from "../component/Hello.ce.vue"
import theme from "vitepress/theme"
import type { Theme } from "vitepress"

if (typeof customElements != "undefined")
	// https://cn.vuejs.org/guide/extras/web-components#sfc-as-custom-element
	try {
		const x_hello = defineCustomElement(Hello)
		customElements?.define("x-hello", x_hello)
	} catch (e) {
		console.error(e)
	}
else {
	// https://vitepress.dev/zh/guide/ssr-compat#defineclientcomponent
	// defineClientComponent
}

// https://vitepress.dev/zh/guide/custom-theme
import "./main.pcss"
import "./style.css"
export default {
	extends: theme,
	Layout: () => {
		return h(theme.Layout, null, {
			// https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
		})
	},
	enhanceApp({ app, router, siteData }) {
		// https://cn.vuejs.org/guide/components/registration#global-registration
		app.component("Hello", Hello)
	},
} as const satisfies Theme
