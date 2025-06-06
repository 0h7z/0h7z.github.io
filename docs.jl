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
using JSON5: JSON
using XML: XML, AbstractXMLNode, Node
using YAML: yaml

const Base.string(x::AbstractXMLNode) = XML.write(x, indentsize = 0)

const mjs = raw"""
import { resolveConfig } from "vitepress"
console.log(JSON.stringify(await resolveConfig()))
"""
const cfg = JSON.parse(readstr(`node --input-type=module -e $mjs`))

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
					isfile(g) || symlink(f, g)
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
				if endswith(".html")(f) || endswith(".js")(f)
					@assert !contains(readstr(f), r"mailto:\w+@\w+\.md") stdpath(prefix, f)
				end
				if endswith(".html")(f)
					str = readstr(f)
					str = replace(str, r"\n\s*\n|\n*$"s => "\n")
					str = replace(str, r"^\s+"m => "\t")
					str = replace(str, r"^\t(?=</?(head|body)>$)"m => "")
					str = replace(str, r"^\t<(meta|link) .*\K(?<! /)>$"m => " />")
					str = replace(str, r"^\t<link .+ href=\"/vp-icons.css\".+\n"m => "")
					str = replace(str, r"^\t<meta name=\"(?:description|generator)\".+\n"m => "")
					str = replace(str, r"^\t<script id=\"check-dark-mode\">.*</script>\n"m => "")
					str = replace(str, r"^<html .*\K\bdir=\"ltr\""m => "class=\"dark\"")
					if stdpath(prefix, f) ∈ dst .* ["/404.html", "/404/index.html"]
						yml = yaml(LDict(:permalink => "/404.html"))
						str = replace(str, r"^(?=<!DOCTYPE html>)"s => "---\n$yml---\n")
					end
					if stdpath(prefix, f) ∈ dst .* ["/en/snowfox/changelog/index.html"]
						yml = yaml(LDict(:redirect_from => ["/snowfox/"]))
						str = replace(str, r"^(?=<!DOCTYPE html>)"s => "---\n$yml---\n")
					end
					write(f, str)
				end
				if endswith(".js")(f) &&
				   startswith(joinpath(dst, assetdir, "~"))(prefix)
					str = readstr(pipeline(f, `pnpm esbuild --minify-whitespace`))
					str = replace(str, r"/\*[*!]\n.*?@.*?\*/"s => "")
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

