# Copyright (C) 2022-2026 Heptazhou <zhou@0h7z.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, version 3.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

using Exts

const verbose = isinteractive() || ARGS ∋ "-v"

const patch(f::Function, file::String, _warn::Bool = verbose) =
	let s = t = readstr(file), s = f(s)::String
		s ≠ t ? @info(write(file, s) => file) : _warn && @warn(NaN => file,
			_module = nothing, _file = nothing, _line = nothing)
	end
const patch(f::Function, path::String, file::Regex) =
	let x = filter!(contains(file), readdir(path))
		@. patch(f, stdpath(path, x))
	end
const substitution(xs...) = SubstitutionString(string(xs...))

if abspath(PROGRAM_FILE) == @__FILE__
	cd(@__DIR__) do
	#! format: noindent
	patch("node_modules/prettier/plugins/", r"^html\.m?js$") do s
		p = """="<!DOCTYPE";"""
		s = replace(s, Regex(p, "i") => uppercase(p))
	end
	patch("node_modules/vite/dist/node/chunks/node.js") do s
		p = """process.env.VITE_CONFIG_NATIVE_IGNORE_WARNING"""
		s = replace(s, r"\b" * p * r"\b" => true)
	end
	patch("node_modules/vitepress/dist/client/app/components/Content.js") do s
		s = replace(s, "\'404 Page Not Found\'" => "\'\'")
		s = replace(s, "\"404 Page Not Found\"" => "\"\"")
	end
	patch("node_modules/vitepress/dist/client/app/devtools.js") do s
		p = """export const setupDevtools = (_app, _router, _data) => {};"""
		s = replace(s, r"^(.+;\n)$"s => substitution(p, s"\n/*\n\1 */\n"))
	end
	patch("node_modules/vitepress/dist/client/app/index.js") do s
		s = replace(s, "(import.meta.env.DEV || __VUE_PROD_DEVTOOLS__)" => "(false)")
		s = replace(s, "if (isInitialPageLoad)" => "if (false)")
		s = replace(s, r"^.+isInitialPageLoad =[^;]+;\n"m => "")
		s = replace(s, r"^\s+if \([^()]+\) \{[ \n]+\}\n"m => "")
	end
	patch("node_modules/vitepress/dist/client/app/router.js") do s
		p = """await loadPage("/404/"); return;"""
		s = replace(s, r"^\s*\Kroute\.component = fallbackComponent\b.*;$"m => p)
	end
	patch("node_modules/vitepress/dist/client/shared.js") do s
		s = replace(s, r"\b(description|title): \K\'[^\']+\'"m => "\'\'")
		s = replace(s, r"\b(description|title): \K\"[^\"]+\""m => "\"\"")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPContent.vue") do s
		s = replace(s, " v-if=\"page.isNotFound\">" => " v-if=\"false\">")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPDoc.vue") do s
		s = replace(s, r" name=\"doc-after\" />(\n *)(</div>)\K(\n *\2)"m => s"\1<VPFooter v-if=\"hasSidebar\" />\3")
		s = replace(s, r"^(import )(VPDocFooter)( from \"\./)\2(\.vue\";?\n)\K(?!i)"m => s"\1VPFooter\3VPFooter\4\n")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPDocFooter.vue") do s
		s = replace(s, r"^\.prev-next \{[^}]*?\K\bpadding-top: (24px|1\.5rem);"m => s"padding: \1 0;")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue") do s
		s = replace(s, r" = \K(\S+\?\.forceLocale)\b"m => s"\"string\" === typeof \1 ? \1 : \1")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPFeature.vue") do s
		_ = ".vitepress/component/Trace.ce.vue" # p: 12px 20px
		s = replace(s, "padding: 24px;" => "padding: 24px 20px;")
		s = replace(s, "padding: 1.5rem;" => "padding: 1.5rem 1.25rem;")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPFeatures.vue") do s
		s = replace(s, "\'grid-6\'" => "\'grid-4\'")
		s = replace(s, "\"grid-6\"" => "\"grid-4\"")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue") do s
		s = replace(s, r"^\n\K(\.VPFooter\.has-sidebar\b)"m => s".Layout >\n\1")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPHero.vue") do s
		s = replace(s, r"^ *\.name,\n *\.text \{[^}]*?\n\K *max-width: [\d.]+?px;\n"m => "")
		s = replace(s, r"^ *\.name,\n *\.text \{[^}]*?\n\K *max-width: [\d.]+rem;\n"m => "")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPSidebarItem.vue") do s
		s = replace(s, r"^ *class=\"link\"\n"m => "")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPSocialLink.vue") do s
		s = replace(s, "=\"qualifiedIcon\"" => s"=\"props.icon\"")
		s = replace(s, r"^ *\K(await nextTick)"m => s"return; \1")
	end
	patch("node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css") do s
		s = replace(s, r"\{[^{]*\b" * "content: attr(data-copied);" * r"[^}]*\}"s => "{}")
	end
	patch("node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css") do s
		o = match(":not(.no-icon" * r"\b.*"m * ")", s).match
		p = ".vp-external-link-icon"
		q = "$p.no-icon > .box > .title"
		s = replace(s, "$o::after {\n" => "$o::after,\n:is($q)::after {\n")
		s = replace(s, "$p::after {\n" => "$p:not(.no-icon)::after {\n")
	end
	patch("node_modules/vitepress/dist/client/theme-default/styles/docsearch.css") do s
		s = replace(s, r"^.*@docsearch/css\b.*\n"m => "")
	end
	patch("node_modules/vitepress/dist/client/theme-default/support/utils.js") do s
		s = replace(s, "(external !== undefined)" => "(external)")
		s = replace(s, "(external !== void $(0))" => "(external)")
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		r = r"^\t*\K {2}"m
		while contains(s, r)
			s = replace(s, r => "\t")
		end
		s = replace(s, r"\b(description|title): \K\"[^\"]+\""m => "\"\"")
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		s = replace(s, ".[hash]." => ".[hash:10].")
		s = replace(s, ".lean.js\"" => ".js\"")
		s = replace(s, ".lean.js\`" => ".js\`")
		s = replace(s, "“\${title}”" => "\\`\${title}\\`")
		s = replace(s, "(\"hex\")" => "(\"base64url\")")
		s = replace(s, "(\"sha256\")" => "(\"shake256\")")
		s = replace(s, "(siteConfig.outDir, \"vp-icons.css\")" => "(APP_PATH, \"vp-icons.css\")")
		s = replace(s, "/\${APP_PATH}/" => "/\${slash(APP_PATH)}/")
		s = replace(s, "\"-lean\"" => "\"\"")
		s = replace(s, "\"chunks\"" => "\"~\"")
		s = replace(s, ("/chunks/") => ("/~/"))
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		# https://github.com/vuejs/vitepress/commit/a8a1800ae578be88027aa4ec7561ada4d055b888
		s = replace(s, r"(&#8203;)"i => "") # \u200b
		s = replace(s, r"\"@iconify-json/simple-icons/[^\"]+\"" => "\"@primer/octicons/svg.js\"")
		s = replace(s, r"\(staticStripRE, \S+\)" => "(staticRestoreRE, \"\")")
		s = replace(s, r"\\u2018|\\u2019"i => "\\\'") # ‘’
		s = replace(s, r"\\u201c|\\u201d"i => "\\\"") # “”
		s = replace(s, r"\`Permalink to \K(\Q\\\"\E)(\Q${title}\E)\1" => s"\\`\2\\`")
		s = replace(s, r"\t+\K(await .+\"vp-icons\b)"m => s"if (iconsCss) \1")
		s = replace(s, r"\t+\K(this\.emitFile\(\{\n)"m => s"if (false) \1")
		s = replace(s, r"\t+<link .+\}vp-icons\b.+\n"m => s"")
		s = replace(s, r"^.+\@vue/devtools-api\b.+\n"m => s"")
		s = replace(s, r"<button\K title=\"[^\"]*\" data-copied=\"[^\"]*\"" => s"")
		s = replace(s, r"catch \(error\) \{(\n\t+)\K(throw new Error)" => s"throw error;\1\2")
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		o = """function getIconData(data, name) {"""
		p = """if (data[name]) data = { icons: { [name]: { body: data[name] } } };"""
		q = """if (data.icons[name]) return internalGetIconData(data, name, []);"""
		s = replace(s, r"\b" * o * r"(\n\t+)\K" * q => substitution(p, s"\1", q))
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		o = """permalink: (slug, _, state, idx) => {"""
		p = """if (idx <= 1) slug &&= "";"""
		q = """let title = """ # const title
		s = replace(s, r"\b" * o * r"(\n\t+)\K" * q => substitution(p, s"\1", q))
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		o = s"${config.assetsDir}" * "/~/"
		p = s"[name].[hash:10].js"
		q = s"[name].js"
		s = replace(s, "`$o$p`" => """`$o\${chunk.name.startsWith("@") ? "$q" : "$p"}`""")
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		l = s"""var f = `${req.originalUrl}`.replace(/^\\/@fs\\//, ``);"""
		m = s"""res.statusCode = 200,"""
		n = s"""res.setHeader("Content-Type", "text/html");"""
		o = s"""res.setHeader("Content-Type", lookup(f) || "text/html");"""
		p = s"""if (f.startsWith(`${slash(DEFAULT_THEME_PATH)}/fonts/`) && fs.existsSync(f))"""
		q = s"""	return send(req, res, f, fs.statSync(f), {});"""
		s = replace(s, r"(\n\t+)\K" * "$m $n" => substitution(join([l, m, o, p, q], s"\1")))
	end
	patch("node_modules/vitepress/dist/node/index.d.ts", false) do s
		s = replace(s, "{ forceLocale?: boolean }" => "{ forceLocale?: boolean | string }")
	end
	patch("node_modules/vitepress/types/default-theme.d.ts") do s
		s = replace(s, "{ forceLocale?: boolean }" => "{ forceLocale?: boolean | string }")
	end
	patch("pnpm-lock.yaml", false) do s
		return s
		s = replace(s, r"\n {0}\S+:\K\n {2}(\S+: \S+)(?=\n {0}\S+:|\n\n)" => s" {\1}")
		s = replace(s, r"\n {2}\S+:\K\n {4}(\S+: \S+)(?=\n {2}\S+:|\n\n)" => s" {\1}")
		s = replace(s, r"\n {4}\S+:\K\n {6}(\S+: \S+)(?=\n {4}\S+:|\n\n)" => s" {\1}")
		s = replace(s, r"\n {6}\S+:\K\n {8}(\S+: \S+)(?=\n {6}\S+:|\n\n)" => s" {\1}")
	end
	end
end

