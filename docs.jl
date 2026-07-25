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
		for f in fs
			p = stdpath(prefix, f)
			if p == src * "/link/http/index@en.md"
				q = src * "/000.md"
				write(q, replace(readstr(p), "/en-US/" => "/"))
			end
			if endswith("@en.md")(f)
				q = replace(p, "@en.md" => "@zh.md")
				islink(q) && rm(q)
				isfile(q) || write(q, "<!-- @include: ./$f -->\n\n")
			end
		end
	end :
	for (prefix, ds, fs) in walkdir(dst, topdown = false)
		for f in fs
			p = stdpath(prefix, f)
			if endswith(".css")(f)
				str = readchomp(p) * "\n"
				write(p, str)
			end
			if endswith(".html")(f)
				str = readstr(p)
				if p ∈ dst .* ["/404.html", "/404/index.html"]
					yml = yaml(LDict(:permalink => "/404.html"))
					str = replace(str, r"^(?=<!DOCTYPE html>)"s => "---\n$yml---\n")
				end
				if p ∈ dst .* ["/en/proj/snowfox/changelog/index.html"]
					yml = yaml(LDict(:redirect_from => ["/snowfox/"]))
					str = replace(str, r"^(?=<!DOCTYPE html>)"s => "---\n$yml---\n")
				end
				write(p, str)
			end
			if endswith(".js")(f) && startswith("metadata.")(f) &&
			   startswith(joinpath(dst, assetdir, "~"))(prefix)
				str = readstr(pipeline(p, `pnpm $esb`))
				str = replace(str, r",\K(?=window\.__\w+__=JSON\.parse\()"m => "\n")
				str = replace(str, r"^window\.__\w+__=\K(?=JSON\.parse\()"m => "\n")
				write(p, str)
			end
			if endswith(".json")(f)
				str = readstr(p)
				str = replace(str, r""":"[\w-]+?",\K""" => "\n")
				str = replace(str, r"""^\{\K|(?=\}$)""" => "\n")
				write(p, str)
			end
			if endswith(".xml")(f) && f == "sitemap.xml"
				str = readstr(p)
				xml = parse(Node, str)
				for url ∈ xml[end].children
					sort!(url.children, by = x -> x.tag)
				end
				sort!(xml[end].children, by = string)
				str = string(xml)
				str = replace(str, r"\n(?=<(lastmod|loc)>)|</(lastmod|loc)>\K\n" => "")
				write(p, str)
			end
		end
	end
end

