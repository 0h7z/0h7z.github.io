# Copyright (C) 2024-2026 Heptazhou <zhou@0h7z.com>
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

using Downloads: download
using Exts
using JSON5: json

const conststr((k, v)::Pair) = "export const $k = $(quotestr(v))\n"
const quotestr(s::AbstractString) = '`' * escape_string(s, '`') * '`'
const reserved(s::AbstractString) = replace(s, r"^(package)$" => s"\1$")

if abspath(PROGRAM_FILE) == @__FILE__
	cd(@__DIR__) do
		d = "node_modules/@primer/octicons/build/svg/"
		f = "node_modules/@primer/octicons/svg.js"
		g = ".vitepress/theme/octicon.ts"
		r = r"(-delete\Kd|-fill\Ked)?\Q-16.svg\E$"
		u = map(filter!(contains(r), readdir(d))) do f
			reserved(replace(f, r => "", "-" => "_")) => readchomp(d * f)
		end
		@info write(f, conststr.(u)...) => f
		cp(f, g, force = true)
		let d = dirname(f), f = basename(f), g = replace(f, ".js" => ".ts")
			cd(() -> (rm(g, force = true); symlink(f, g)), d) # stupid Node.js :(
		end
		((k, v)::Pair -> write("$d/$k.json", json(v, 4))).(u)
		((u, o)::Pair -> isfile(o) || download(u, o)).([
			"https://github.com/Heptazhou.png" => "src/about/@zhou.png",
			"https://github.com/seelebot.png"  => "src/about/@seele.png",
		])
	end
end

