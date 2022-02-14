@info "Processing..."

using Match

const src = "dist"
const dst = "docs"
const assetdir = "_"
const pagemain = "index.html"
const pagelist = [
	"400.html"
	"401.html"
	"402.html"
	"403.html"
	"404.html"
	"405.html"
	"406.html"
	"407.html"
	"408.html"
	"409.html"
	"410.html"
	"411.html"
	"412.html"
	"413.html"
	"414.html"
	"415.html"
	"416.html"
	"417.html"
	"418.html"
	"421.html"
	"422.html"
	"423.html"
	"424.html"
	"425.html"
	"426.html"
	"428.html"
	"429.html"
	"431.html"
	"451.html"
]
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

