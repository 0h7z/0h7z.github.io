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

const patch(f::Function, file::String) =
	let s = t = read(file, String), s = f(s)::String
		s ≠ t ? (@info write(file, s) => file) : (@info NaN => file)
	end
const patch(f::Function, path::String, file::Regex) =
	let v = filter!(contains(file) ∘ basename, readdir(path, join = true))
		patch.(f, v)
	end

try
	cd("$(@__DIR__)/" * (d = "node_modules/vitepress/")) do
		@info d
		patch("dist/client/theme-default/components/VPDoc.vue") do s
			s = replace(s, r"^(import )(VPDocFooter)( from '\./)\2(\.vue')\n\K\n"m => s"\1VPFooter\3VPFooter\4\n\n")
			s = replace(s, r"=\"doc-after\" />(\n *)(</div>)\K(\n *\2)"m => s"\1<VPFooter v-if=\"hasSidebar\" />\3")
		end
		patch("dist/client/theme-default/components/VPDocFooter.vue") do s
			s = replace(s, r"^\.prev-next \{[^}]*?\K\bpadding-top: 24px;"m => "padding: 24px 0;")
		end
		patch("dist/client/theme-default/components/VPDocFooterLastUpdated.vue") do s
			s = replace(s, ".forceLocale ? lang.value : undefined," => ".forceLocale || lang.value || undefined,")
		end
		patch("dist/client/theme-default/components/VPFooter.vue") do s
			s = replace(s, r"^\n\K(\.VPFooter\.has-sidebar\b)"m => s".Layout >\n\1")
		end
		patch("dist/node/", r"^serve-") do s
			s = replace(s, "(\"hex\")" => "(\"base64url\")")
			s = replace(s, "(\"sha256\")" => "(\"shake128\")")
			s = replace(s, "\"chunks\"" => "\"~\"")
			s = replace(s, ("/chunks/") => ("/~/"))
			s = replace(s, s"/-vue$/" => s"/-vue(?=:|$)/")
		end
		patch("types/default-theme.d.ts") do s
			s = replace(s, "{ forceLocale?: boolean }" => "{ forceLocale?: string }")
		end
	end
catch e
	@info e
end

isempty(ARGS) || exit()
pause(up = 1)

