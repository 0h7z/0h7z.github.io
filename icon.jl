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
using OrderedCollections: OrderedDict as ODict

try
	cd(@__DIR__) do
		cd("node_modules/@primer/octicons/build/svg/")
		r = r"\Q-24.svg\E$"
		v = map(filter!(contains(r), readdir())) do f
			replace(f, r => "") => readstr(f)
		end
		write("../../svg.json", json(ODict(v), 4))
	end
catch e
	@info e
end

isempty(ARGS) || exit()
pause(up = 1)

