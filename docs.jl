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
using XML: XML, Element, Node, nodetype
using YAML: yaml

const Base.sort!(x::Node)  = (sort!(elements(x), by = string); x)
const Base.string(x::Node) = XML.write(x, indentsize = 0)
const bipush!(v, x)        = push!(pushfirst!(v, x), x)
const elements(x::Node)    = @view x.children[@. Element ≡ nodetype(x.children)]

const esb = `esbuild --charset=utf8 --line-limit=$(2^16) --minify`
const mjs = readstr("docs.jl.ts")
const cfg = readstr(`node -e $mjs`) |> JSON.parse

const src = relpath(cfg["srcDir"])
const dst = relpath(cfg["outDir"])
const assetdir = cfg["assetsDir"]

if abspath(PROGRAM_FILE) == @__FILE__
	isempty(ARGS) ?
	for (prefix, ds, fs) in walkdir(src, topdown = false)
		@threads for f in fs
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
		@threads for f in fs
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
				str = JSON.json(JSON.parse(str), 4)
				write(p, str)
			end
			if endswith(".xml")(f)
				str = readstr(p)
				xml = parse(Node, str)
				elm = only(elements(xml))
				sort!.(elements(bipush!(elm, "\n")))
				sort!(elm)["xml:space"] = "preserve"
				str = string(xml)
				str = replace(str, r"(</\w+>){2,}\K(?!\n)|\n{2,}|$"s => "\n")
				write(p, str)
			end
		end
	end
end

