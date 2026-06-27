import { defineConfig } from "vite"
import { resolve } from "path"
import { resolveConfig } from "vitepress"
import ssl from "@vitejs/plugin-basic-ssl"
import type { DefaultTheme, SiteConfig } from "vitepress"
import type { RolldownOptions } from "rolldown"

const config: SiteConfig<DefaultTheme.Config> = await resolveConfig()

console.log(config.dynamicRoutes)
console.log(config.rewrites.map)

// https://cn.vitejs.dev/config/
export default defineConfig({
	plugins: [ssl()],
	publicDir: resolve(__dirname, "static"),
	resolve: { preserveSymlinks: false }, // incompatible w/ pnpm global virtual store
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
		// https://rolldown.rs/reference/
		rolldownOptions: {
			// https://github.com/vuejs/vitepress/issues/5226
			checks: { invalidAnnotation: false },
			output: {
				comments: false,
				externalLiveBindings: false,
				hashCharacters: "base36",
			},
		} as const satisfies RolldownOptions,
	},
})
