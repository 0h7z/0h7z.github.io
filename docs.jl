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

# [compat]
# julia = "≥ 1.5"

@info "Processing..."

using JSON5
using XML
using XML: AbstractXMLNode

const Base.string(x::AbstractXMLNode) = XML.write(x, indentsize = 0)

const mjs = raw"""
import { resolveConfig } from "vitepress"
console.log(JSON.stringify(await resolveConfig()))
"""
const cfg = JSON5.parse(readstr(`node --input-type=module -e $mjs`))

const src = relpath(cfg["srcDir"])
const dst = relpath(cfg["outDir"])
const assetdir = cfg["assetsDir"]
const pagemain = "index.html"
const pagelist = ["$pfx.html" for pfx in [
	# response status code
	400 # bad request
	401 # unauthorized
	402 # payment required
	403 # forbidden
	404 # not found
	405 # method not allowed
	406 # not acceptable
	407 # proxy authentication required
	408 # request timeout
	409 # conflict
	410 # gone
	411 # length required
	412 # precondition failed
	413 # payload too large
	414 # URI too long
	415 # unsupported media type
	416 # range not satisfiable
	417 # expectation failed
	418 # I'm a teapot
	421 # misdirected request
	422 # unprocessable entity (WebDAV)
	423 # locked (WebDAV)
	424 # failed dependency (WebDAV)
	425 # too early
	426 # upgrade required
	428 # precondition required
	429 # too many requests
	431 # request header fields too large
	451 # unavailable for legal reasons
]]

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
					str = replace(str, r"^\t<meta name=\"(description|generator)\".+\n"m => "")
					str = replace(str, r"^<html .*\K\bdir=\"ltr\""m => "class=\"dark\"")
					if basename(prefix) ≡ "404" && f ≡ "index.html"
						yml = "permalink: /404.html"
						str = replace(str, r"^(?=<!DOCTYPE html>)"s => "---\n$yml\n---\n")
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

