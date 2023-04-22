# Copyright (C) 2022-2023 Heptazhou <zhou@0h7z.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
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

using Match

const src = "dist"
const dst = "docs"
const assetdir = "_"
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
	# page
	"dec/index"
	"enc/index"
	"snowfox/index"
]]
const keeplist = [
	# file
	"_config.yml"
	"CNAME"
]

try
	_up = _rm = _cp = isempty(ARGS)
	for i in ARGS
		@match i begin
			"/"   => (_up = _rm = _cp = true; break)
			"+up" => (_up = true)
			"+rm" => (_rm = true)
			"+cp" => (_cp = true)
			Any   => error("Invalid argument")
		end
	end
	_up && # src
		for (prefix, ds, fs) in walkdir(src)
			cd(prefix) do
				for f in fs
					if endswith(".html")(f)
						str = read(f, String)
						str = replace(str, r"\n(?:\s*\n)+"s => "\n")
						while occursin(r"^\t*  "m, str)
							str = replace(str, r"^\t*\K  "m => "\t")
						end
						str = replace(str, r"^\t+<(meta|link) .*\K(?<! /)>$"m => " />")
						write(f, str)
					end
					# vite < v4
					if startswith(joinpath(src, assetdir))(prefix) && occursin(r"^(index|vendor)[\.-][a-f\d]{8}\.js$", f)
						str = read(f, String)
						str = replace(str, r"/\*!.*?\n.*?\*/"s => "")
						write(f, str)
					end
				end
			end
		end
	_rm && # dst
		for f in readdir(dst)
			replace(f, '\\' => '/') ∈ keeplist || rm(joinpath(dst, f), recursive = true)
		end
	_cp && # src -> dst
		for f in readdir(src)
			cp(joinpath.([src, dst], f)..., force = true)
			f ≠ pagemain || cd(dst) do
				pagelist .|> dirname .|> mkpath
				pagelist .|> p -> symlink("../"^count(∈("/"), p) * f, p)
				@info "Main access point: /$f"
			end
		end
catch e
	@info e
end

isempty(ARGS) || exit()
pause(up = 1)

