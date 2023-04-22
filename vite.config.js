import { defineConfig, splitVendorChunkPlugin } from "vite"
import { resolve } from "path"
import cssnano from "cssnano"
import cssnest from "postcss-nested"
import cssvars from "postcss-css-variables"
import mia from "markdown-it-anchor"
import mil from "markdown-it-link-attributes"
import mip from "markdown-it-prism"
import ssl from "@vitejs/plugin-basic-ssl"
import vmd from "vite-plugin-vue-markdown"
import vps from "vite-plugin-pages"
import vue from "@vitejs/plugin-vue"

const mi_init = (markdown) => markdown.use(mia, mia_opt).use(mil, mil_opt).use(mip, mip_opt)
const of_name = (ext = "") => "_/[name].[hash:8]" + (ext ? `.${ext}` : "[extname]")

const cnn_opt = { preset: ["advanced", { autoprefixer: false }] }
const mdi_opt = { breaks: true, html: true, linkify: false, typographer: false }
const mia_opt = { level: [2], permalink: mia.permalink.ariaHidden({ placement: "before", symbol: "" }) }
const mil_opt = { attrs: { target: "_blank" }, matcher: (str) => /^[a-z]+:\/+\w+/i.test(str) }
const mip_opt = { highlightInlineCode: true }
const out_opt = { assetFileNames: of_name(), chunkFileNames: of_name("js"), entryFileNames: of_name("js") }
const vmd_opt = { markdownItOptions: mdi_opt, markdownItSetup: mi_init, wrapperClasses: "md" }
const vps_opt = { dirs: "src/page", extensions: ["vue"], importMode: "async" }
const vue_opt = { include: /\.(vue|md)$/ }

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(vue_opt), vps(vps_opt), vmd(vmd_opt), ssl(), splitVendorChunkPlugin()],
	publicDir: "static", // Default: "public"
	resolve: { alias: { "@": resolve(__dirname, "src") } },
	css: { postcss: { plugins: [cssnest(), cssvars(), cssnano(cnn_opt)] } },
	clearScreen: false,
	optimizeDeps: { force: true },
	server: {
		host: false, // enable by -- --host
		port: 3030,
		strictPort: true,
		https: true,
	},
	preview: {
		port: 3030,
	},
	build: {
		// assetsDir: "_", // Default: "assets"
		cssCodeSplit: false, // Default: true
		rollupOptions: { output: out_opt },
		commonjsOptions: {
			// dynamicRequireTargets: [], // Default: []
			// exclude: [], // Default: null
			// include: [], // Default: null
			extensions: [".mjs", ".cjs", ".js"], // Default: [".js"]
			// ignoreGlobal: true, // Default: false
			sourceMap: false, // Default: true
			// transformMixedEsModules: true, // Default: false
			// ignore: [], // Default: []
			// esmExternals: [], // Default: false
			requireReturnsDefault: "auto", // Default: false
		},
		reportCompressedSize: false, // Default: true
		// minify: "terser", // Default: esbuild
	},
})
