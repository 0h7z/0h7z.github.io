import { defineConfig, splitVendorChunkPlugin } from "vite"
import { resolve } from "path"
import postcssNano from "cssnano"
import postcssNest from "postcss-nested"
import postcssVars from "postcss-css-variables"
import ssl from "@vitejs/plugin-basic-ssl"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), ssl(), splitVendorChunkPlugin()],
	publicDir: "static",
	resolve: { alias: { "@": resolve(__dirname, "src") } },
	css: { postcss: { plugins: [postcssNest(), postcssVars(), postcssNano()] } },
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
		assetsDir: "_",
		cssCodeSplit: false, // Default: true
		// rollupOptions: { output: { indent: "\t" } },
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
		reportCompressedSize: false,
		// minify: "terser", // Default: esbuild
	},
})
