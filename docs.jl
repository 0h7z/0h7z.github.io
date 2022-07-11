# Copyright (C) 2022 Heptazhou <zhou@0h7z.com>
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

@info "Processing..."

using Match

const src = "dist"
const dst = "docs"
const assetdir = "_"
const pagemain = "index.html"
const pagelist = ["$rsc.html" for rsc in [
	400
	401
	402
	403
	404
	405
	406
	407
	408
	409
	410
	411
	412
	413
	414
	415
	416
	417
	418
	421
	422
	423
	424
	425
	426
	428
	429
	431
	451
]]
const keeplist = [
	# file
	"_config.yml"
	"CNAME"
]

try
	isdir(src) || error()
	isdir(dst) || error()
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
	if _up # src
		for f in readdir(src, join = true)
			if isfile(f) && splitext(f)[2] == ".html"
				str = read(f, String)
				str = replace(str, r"\n(?:\s*\n)+"s => "\n")
				while occursin(r"^\t*  "m, str)
					str = replace(str, r"^\t*\K  "m => "\t")
				end
				write(f, str)
			end
			if isdir(f) && basename(f) == assetdir
				for ast in readdir(f, join = true)
					isfile(ast) || continue
					if occursin(r"^(?:index|vendor)\.[a-f\d]{8}\.js$", basename(ast))
						str = read(ast, String)
						str = replace(str, r"/\*!.*?\n.*?\*/"s => "")
						write(ast, str)
					end
				end
			end
		end
	end
	if _rm # dst
		for f in readdir(dst)
			replace(f, '\\' => '/') in keeplist || rm(joinpath(dst, f), recursive = true)
		end
	end
	if _cp # src -> dst
		for f in readdir(src)
			cp(joinpath(src, f), joinpath(dst, f), force = true)
			f == pagemain || continue
			@info "Main access point: /$f"
			cd(dst) do
				for page in pagelist
					symlink(pagemain, page)
				end
			end
		end
	end
catch e
	@info e
end

isempty(ARGS) || exit()
print("> ")
readline()

