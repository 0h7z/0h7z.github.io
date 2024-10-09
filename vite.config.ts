import { defineConfig } from "vite"
import { resolve } from "path"
import { resolveConfig } from "vitepress"
import ssl from "@vitejs/plugin-basic-ssl"
import type { DefaultTheme, SiteConfig } from "vitepress"

const config: SiteConfig<DefaultTheme.Config> = await resolveConfig()

console.log(config.dynamicRoutes.routes)
console.log(config.rewrites.map)

// https://cn.vitejs.dev/config/
export default defineConfig({
	plugins: [ssl()],
	publicDir: resolve(__dirname, "static"),
	resolve: { preserveSymlinks: true },
	clearScreen: false,
	server: {
		host: false,
		port: 3030,
		strictPort: true,
	},
	preview: {
		port: 3030,
	},
	build: {
		outDir: config.outDir,
		assetsDir: config.assetsDir,
	},
})
