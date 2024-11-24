# Copyright (C) 2024 Heptazhou <zhou@0h7z.com>
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
using JSON5: json

try
	cd(@__DIR__) do
		d = "node_modules/@primer/octicons/build/svg/"
		f = "node_modules/@primer/octicons/svg.json"
		g = ".vitepress/octicon.json"
		r = r"(-delete\Kd|-fill\Ked)?\Q-16.svg\E$"
		v = map(filter!(contains(r), readdir(d))) do f
			replace(f, r => "", "-" => "_") => readstr(d * f)
		end
		@info write(f, json(LDict(v), 4)) => f
		cp(f, g, force = true)
	end
catch e
	@info e
end

isempty(ARGS) || exit()
pause(up = 1)

