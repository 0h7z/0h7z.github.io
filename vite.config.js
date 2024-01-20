import { createHash } from "crypto"
import { defineConfig, splitVendorChunkPlugin } from "vite"
import { resolve } from "path"
import cssnano from "cssnano"
import cssnest from "postcss-nested"
import cssrepl from "modify-selectors"
import cssvars from "postcss-css-variables"
import mia from "markdown-it-anchor"
import mil from "markdown-it-link-attributes"
import mip from "markdown-it-prism"
import ssl from "@vitejs/plugin-basic-ssl"
import vmd from "vite-plugin-vue-markdown"
import vps from "vite-plugin-pages"
import vue from "@vitejs/plugin-vue"

const dw_hash = (dat = "") => createHash("shake128", { outputLength: 4 }).update(dat).digest("hex")
const id_func = (str = "") => encodeURIComponent(str.replace(/\s+/g, "-").replace(/\.0\.0\b/g, ".0"))
const mi_init = (markdown) => markdown.use(mia, mia_opt).use(mil, mil_opt).use(mip, mip_opt)
const pr_info = (rendered) => rendered.source ?? [rendered.name, ...rendered.exports].join("\n")

const cnn_opt = { preset: ["advanced", { autoprefixer: false }] }
const crp_opt = { modify: [{ match: "*", with: (str = "") => str.replace(">>>", ":deep()") }] }
const lnk_opt = { /* placement: "before", */ symbol: "" }
const mdi_opt = { breaks: true, html: true, linkify: false, typographer: false }
const mia_opt = { level: [2], permalink: mia.permalink.headerLink(lnk_opt), slugify: id_func }
const mil_opt = { attrs: { target: "_blank" }, matcher: (str = "") => /^[a-z]+:\/+\w+/i.test(str) }
const mip_opt = { highlightInlineCode: true }
const vmd_opt = { markdownItOptions: mdi_opt, markdownItSetup: mi_init, wrapperClasses: "md" }
const vps_opt = { dirs: "src/page", extensions: ["vue"], importMode: "async" }
const vue_opt = { include: /\.(vue|md)$/ }

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(vue_opt), vps(vps_opt), vmd(vmd_opt), ssl(), splitVendorChunkPlugin()],
	publicDir: "static", // Default: "public"
	resolve: { alias: { "@": resolve(__dirname, "src") } },
	css: { postcss: { plugins: [cssnest(), cssvars(), cssrepl(crp_opt), cssnano(cnn_opt)] } },
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
		rollupOptions: {
			output: {
				assetFileNames: (asset) => `_/[name].${dw_hash(pr_info(asset))}.[ext]`,
				chunkFileNames: (chunk) => `_/[name].${dw_hash(pr_info(chunk))}.js`,
				entryFileNames: (chunk) => `_/[name].${dw_hash(pr_info(chunk))}.js`,
			},
		},
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
