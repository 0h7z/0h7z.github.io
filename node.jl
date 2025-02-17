# Copyright (C) 2022-2025 Heptazhou <zhou@0h7z.com>
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

const patch(f::Function, file::String) =
	let s = t = readstr(file), s = f(s)::String
		s ≠ t ? @info(write(file, s) => file) : @warn(NaN => file,
			_module = nothing, _file = nothing, _line = nothing)
	end
const patch(f::Function, path::String, file::Regex) =
	let x = filter!(contains(file), readdir(path))
		@. patch(f, stdpath(path, x))
	end

if abspath(PROGRAM_FILE) == @__FILE__
	cd(@__DIR__) do
	#! format: noindent
	patch("node_modules/vitepress/dist/client/app/components/Content.js") do s
		s = replace(s, "'404 Page Not Found'" => "''")
	end
	patch("node_modules/vitepress/dist/client/app/devtools.js") do s
		p = """export const setupDevtools = (_app, _router, _data) => {};"""
		s = replace(s, r"^(.+;\n)$"s => SubstitutionString("$p\n/*\n\\1 */\n"))
	end
	patch("node_modules/vitepress/dist/client/app/index.js") do s
		s = replace(s, "(import.meta.env.DEV || __VUE_PROD_DEVTOOLS__)" => "(false)")
	end
	patch("node_modules/vitepress/dist/client/app/router.js") do s
		p = """await loadPage("/404/"); return;"""
		s = replace(s, r"^\s*\Kroute\.component = fallbackComponent\b.*;$"m => p)
	end
	patch("node_modules/vitepress/dist/client/shared.js") do s
		s = replace(s, r"\b(description|title): \K'[^']+'"m => "''")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPContent.vue") do s
		s = replace(s, " v-if=\"page.isNotFound\">" => " v-if=\"false\">")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPDoc.vue") do s
		s = replace(s, r"^(import )(VPDocFooter)( from '\./)\2(\.vue')\n\K\n"m => s"\1VPFooter\3VPFooter\4\n\n")
		s = replace(s, r"=\"doc-after\" />(\n *)(</div>)\K(\n *\2)"m => s"\1<VPFooter v-if=\"hasSidebar\" />\3")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPDocFooter.vue") do s
		s = replace(s, r"^\.prev-next \{[^}]*?\K\bpadding-top: 24px;"m => "padding: 24px 0;")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue") do s
		s = replace(s, ".forceLocale ? lang.value : undefined," => ".forceLocale || lang.value || undefined,")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue") do s
		s = replace(s, r"^\n\K(\.VPFooter\.has-sidebar\b)"m => s".Layout >\n\1")
	end
	patch("node_modules/vitepress/dist/client/theme-default/components/VPHero.vue") do s
		s = replace(s, r"^ *\.name,\n *\.text \{[^}]*?\n\K *max-width: \d+px;\n"m => "")
	end
	patch("node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css") do s
		o = match(":not(:is(.no-icon," * r".+?"m * "))::after", s).match
		p = ".vp-external-link-icon"
		q = "$p.no-icon > .box > .title"
		s = replace(s, "$o {\n" => "$o,\n:is($q)::after {\n")
		s = replace(s, "$p::after {\n" => "$p::after,\n$q::after {\n")
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		r = r"^\t*\K {2}"m
		while contains(s, r)
			s = replace(s, r => "\t")
		end
		s = replace(s, r"\b(description|title): \K\"[^\"]+\""m => "\"\"")
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		s = replace(s, ".codeCopyButtonTitle ||" => ".codeCopyButtonTitle ??")
		s = replace(s, "(\"hex\")" => "(\"base64url\")")
		s = replace(s, "(\"sha256\")" => "(\"shake256\")")
		s = replace(s, "\"chunks\"" => "\"~\"")
		s = replace(s, ("/chunks/") => ("/~/"))
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		o = "@iconify-json/simple-icons/icons.json"
		p = "\\S+\\Q(\"$o\")\\E;"
		q = "if (usedIcons.size == 0) return;"
		s = replace(s, Regex("^\\s*\\K.*(const icons = $p)", "m") => SubstitutionString("$q \\1"))
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		o = s"${config.assetsDir}" * "/~/"
		p = s"[name].[hash].js"
		q = s"[name].js"
		s = replace(s, Regex("`\\Q$o\\E\\K\\Q$p\\E(?=`)") => """\${chunk.name.startsWith("@") ? "$q" : "$p"}""")
	end
	patch("node_modules/vitepress/dist/node/", r"^(chunk|serve)-.+\.js$") do s
		p = "concurrency: siteConfig.buildConcurrency"
		q = "concurrency: 1"
		s = replace(s, r"^\s*\K"m * p * r"$"m => q)
	end
	patch("node_modules/vitepress/types/default-theme.d.ts") do s
		s = replace(s, "{ forceLocale?: boolean }" => "{ forceLocale?: string }")
	end
	end
end

