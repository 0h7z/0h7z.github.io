import { defineConfig } from "vite"
import { obj2vec } from "./src/main"
import { resolve } from "node:path"
import { resolveConfig } from "vitepress"
import ssl from "@vitejs/plugin-basic-ssl"
import type { DefaultTheme, SiteConfig } from "vitepress"
import type { Plugin, RolldownOptions } from "rolldown"

const config: SiteConfig<DefaultTheme.Config> = await resolveConfig()
const port: number = 3030

// console.log(config.dynamicRoutes)
// console.log(config.rewrites.map)

// https://rolldown.rs/apis/plugin-api/hook-filters
const rpo = (): Plugin[] => [
	{
		name: `rolldown-plugin-generate`,
		generateBundle: (_option, bundle) => {
			for (const [_, v] of obj2vec(bundle)) {
				if (v.type == `chunk`) {
					v.code = v.code.replaceAll(/ target="_blank" rel="[^"]+"/gs, ``)
					v.code = v.code.replaceAll(/,target:`_blank`,rel:`[^`]+`/gs, ``)
					v.code = v.code.replaceAll(/;(?=((async )?function) |(ex|im)port\{)/gs, `\n`)
					v.code = v.code.replaceAll(/(?<!"_blank")(?= href="([a-z]+:)?\/\/)/gs, ` target="_blank"`)
					v.code = v.code.replaceAll(/(?<=\,\{)(?=href:`([a-z]+:)?\/\/)/gs, `target:\`_blank\`,`)
					v.code = v.code.replaceAll(/(?<=\)\})(?=var \w=\w\()/gs, `\n`)
					v.code = v.code.replaceAll(/(?<=\b(from\x22[^\x22]+\x22|return));|;\n*$/gs, `\n`)
					v.code = v.code.replaceAll(/(?<=^(var )\w=JSON\.parse\(`[^`]+`\)),(?=\w=)/gm, `\n$1`)
					v.code = v.code.replaceAll(/[\t ]+(?=\n)|(?<=\n)[\t ]+/gm, `\t`)
					v.code = v.code.replaceAll(/\?\?\(\w\.value\?`noreferrer`:void 0\)/gm, ``)
					v.code = v.code.replaceAll(/\t+ (?=`\),\w\(`a`,\{class:`header-anchor`,href:`#)/gm, ``)
					v.code = v.code.replaceAll(/\t+ (?=<a class="header-anchor" href="#)/gm, ``)
				}
			}
		},
	},
]

// https://cn.vitejs.dev/config/
export default defineConfig({
	plugins: [rpo(), ssl()],
	publicDir: resolve(__dirname, "static"),
	resolve: { preserveSymlinks: false }, // incompatible w/ pnpm global virtual store
	clearScreen: false,
	server: {
		host: false,
		port,
		strictPort: true,
		proxy: {
			"/cdn-cgi/": { changeOrigin: true, target: "https://cloudflare.com" },
		},
	},
	build: {
		outDir: config.outDir,
		assetsDir: config.assetsDir,
		// https://rolldown.rs/reference/
		rolldownOptions: {
			checks: { invalidAnnotation: false },
			plugins: rpo(),
			output: {
				comments: false,
				externalLiveBindings: false,
				hashCharacters: "base36",
				postFooter: () => "",
			},
		} as const satisfies RolldownOptions,
	},
	preview: {
		port,
	},
})
