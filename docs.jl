# Copyright (C) 2022-2024 Heptazhou <zhou@0h7z.com>
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

@info "Processing..."

using Exts
using JSON5: JSON5
using XML: XML, AbstractXMLNode, Node
using YAML: yaml

const Base.string(x::AbstractXMLNode) = XML.write(x, indentsize = 0)

const mjs = raw"""
import { resolveConfig } from "vitepress"
console.log(JSON.stringify(await resolveConfig()))
"""
const cfg = JSON5.parse(readstr(`node --input-type=module -e $mjs`))

const src = relpath(cfg["srcDir"])
const dst = relpath(cfg["outDir"])
const assetdir = cfg["assetsDir"]

try
	for (prefix, ds, fs) in walkdir(dst, topdown = false)
		cd(prefix) do
			for f in fs
				if endswith(".html")(f)
					str = read(f, String)
					str = replace(str, r"\n\s*\n|\n*$"s => "\n")
					str = replace(str, r"^\s+"m => "\t")
					str = replace(str, r"^\t(?=</?(head|body)>$)"m => "")
					str = replace(str, r"^\t<(meta|link) .*\K(?<! /)>$"m => " />")
					str = replace(str, r"^\t<meta name=\"(?:description|generator)\".+\n"m => "")
					str = replace(str, r"^\t<script id=\"check-dark-mode\">.*</script>\n"m => "")
					str = replace(str, r"^<html .*\K\bdir=\"ltr\""m => "class=\"dark\"")
					if stdpath(prefix, f) ∈ dst .* ["/404.html", "/404/index.html"]
						yml = yaml(Dict(:permalink => "/404.html"))
						str = replace(str, r"^(?=<!DOCTYPE html>)"s => "---\n$yml---\n")
					end
					if stdpath(prefix, f) ∈ dst .* ["/en/snowfox/changelog/index.html"]
						yml = yaml(Dict(:redirect_from => ["/snowfox/"]))
						str = replace(str, r"^(?=<!DOCTYPE html>)"s => "---\n$yml---\n")
					end
					write(f, str)
				end
				if endswith(".js")(f) &&
				   startswith(joinpath(dst, assetdir, "~"))(prefix)
					str = read(pipeline(f, `pnpm esbuild --minify-whitespace`), String)
					str = replace(str, r"/\*[*!]\n.*?@.*?\*/"s => "")
					write(f, str)
				end
				if endswith(".xml")(f) && f ≡ "sitemap.xml"
					str = read(f, String)
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
catch e
	@info e
end

isempty(ARGS) || exit()
pause(up = 1)

