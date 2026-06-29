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
using JSON5: JSON
using XML: XML, AbstractXMLNode, Node
using YAML: yaml

const Base.string(x::AbstractXMLNode) = XML.write(x, indentsize = 0)

const esb = `esbuild --charset=utf8 --line-limit=$(2^16) --minify`
const mjs = readstr("docs.jl.ts")
const cfg = readstr(`node -e $mjs`) |> JSON.parse

const src = relpath(cfg["srcDir"])
const dst = relpath(cfg["outDir"])
const assetdir = cfg["assetsDir"]

if abspath(PROGRAM_FILE) == @__FILE__
	isempty(ARGS) ?
	for (prefix, ds, fs) in walkdir(src, topdown = false)
		cd(prefix) do
			for f in fs
				if endswith("@en.md")(f)
					g = replace(f, "@en.md" => "@zh.md")
					islink(g) && rm(g)
					isfile(g) || write(g, "<!-- @include: ./$f -->\n\n")
				end
			end
		end
	end :
	for (prefix, ds, fs) in walkdir(dst, topdown = false)
		cd(prefix) do
			for f in fs
				if f == "vp-icons.css"
					rm(f)
					continue
				end
				if endswith(".html")(f) || endswith(".js")(f) || endswith(".css")(f)
					str = startswith(joinpath(dst, assetdir, "~"))(prefix) ?
						  readstr(pipeline(f, `pnpm $esb`)) : readstr(f) * "\n"
					write(f, str)
					@assert !contains((f), r"[\S\s]*\.lean\.js$") stdpath(prefix, f)
					@assert !contains(str, r"mailto:\w+@\w+\.md") stdpath(prefix, f)
				end
				if endswith(".html")(f)
					str = readstr(f)
					str = replace(str, r" (crossorigin|hidden|open)\K=\"\"(?=[ >])" => "")
					str = replace(str, r" (style)=\"\"(?=[ >])" => "")
					str = replace(str, r" *(?=<math>|<mjx-\w+|<time datetime=)" => "\n\t")
					str = replace(str, r"[^-]>\K(?=<pre[ >])|</pre>\K(?=<[^!])" => "\n\t")
					str = replace(str, r"[^-]>\K(?=<svg style=\"[^\"]*?\" xml)" => "\n\t")
					str = replace(str, r"[^-]>\K(?=<svg xml)|</svg>\K(?=<[^!])" => "\n\t")
					str = replace(str, r"\n\s*\n|\n*$"s => "\n")
					str = replace(str, r"^\s+"m => "\t")
					str = replace(str, r"^\t(?=</?(head|body)>$)"m => "")
					str = replace(str, r"^\t<(meta|link) .*\K(?<! /)>$"m => " />")
					str = replace(str, r"^\t<link .+ href=\"/vp-icons.css\".+\n"m => "")
					str = replace(str, r"^\t<meta name=\"(?:description|generator)\".+\n"m => "")
					str = replace(str, r"^\t<script id=\"check-dark-mode\">.*</script>\n"m => "")
					str = replace(str, r"^<html .*\K\bdir=\"ltr\""m => "class=\"dark\"")
					str = replace(str, r"<[hb]r\K>" => " />")
					str = replace(str, r"<button (?!type=)" => "<button type=\"button\" ")
					str = replace(str, r"<button type=\"button\" ([^>]+ type=)" => s"<button \1")
					str = replace(str, r"<div [^>]*\K\b(data-v-\w+) \1" => s"\1")
					str = replace(str, r"<img [^>]+[^ />]\K>" => " />")
					if stdpath(prefix, f) ∈ dst .* ["/404.html", "/404/index.html"]
						yml = yaml(LDict(:permalink => "/404.html"))
						str = replace(str, r"^(?=<!DOCTYPE html>)"s => "---\n$yml---\n")
					end
					if stdpath(prefix, f) ∈ dst .* ["/en/proj/snowfox/changelog/index.html"]
						yml = yaml(LDict(:redirect_from => ["/snowfox/"]))
						str = replace(str, r"^(?=<!DOCTYPE html>)"s => "---\n$yml---\n")
					end
					write(f, str)
				end
				if endswith(".js")(f)
					str = readstr(f)
					str = replace(str, r",\K(?=window\.__\w+__=JSON\.parse\()" => "\n")
					str = replace(str, r";(?=((async )?function) |(ex|im)port\{)" => "\n")
					str = replace(str, r";\n*$|\b(from\"[^\"]+\"|return)\K;" => "\n")
					write(f, str)
				end
				if endswith(".json")(f)
					str = readstr(f)
					str = replace(str, r""":"[\w-]+?",\K""" => "\n")
					str = replace(str, r"""^\{\K|(?=\}$)""" => "\n")
					write(f, str)
				end
				if endswith(".xml")(f) && f ≡ "sitemap.xml"
					str = readstr(f)
					xml = parse(Node, str)
					for url ∈ xml[end].children
						sort!(url.children, by = x -> x.tag)
					end
					sort!(xml[end].children, by = string)
					str = string(xml)
					str = replace(str, r"\n(?=<(lastmod|loc)>)|</(lastmod|loc)>\K\n" => "")
					write(f, str)
				end
			end
		end
	end
end

