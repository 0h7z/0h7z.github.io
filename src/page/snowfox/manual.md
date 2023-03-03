
##	Requirement
*****
+	Platform
	-	x86-64 GNU/Linux
+	Hardware
	-	some good CPU cores
	-	15GB free RAM at least
	-	32GB free disk space or more
+	Software
	-	[`7z`][7z] (7-zip)
	-	[`docker`][dk]
	-	[`julia`][jl]

PS: If build fails due to OOM killer (SIGKILL) or freezes due to OOM, try
+	increase available memory
+	increase/enable [swap] (see also [zram])

<br />

##	Build
*****

###	Source
```shell
git clone https://github.com/Heptazhou/Snowfox.git
# OR
git clone https://github.com/0h7z/Snowfox.git

cd Snowfox/Source
julia make.jl check
julia make.jl all clean
```

###	Arch
```shell
git clone https://github.com/0h7z/Snowfox.git
cd Snowfox/Arch
# WIP
```

###	Windows
```shell
git clone https://github.com/0h7z/Snowfox.git
cd Snowfox/Windows
docker build -t snowfox:win-arch -< win-arch.dockerfile
docker build -t snowfox:win-base -< win-base.dockerfile
docker build -t snowfox:win-make -< win-make.dockerfile
id=$(docker create snowfox:win-make) && docker cp -q $id:pkg . && docker rm $id

# optional
docker images
docker system prune [-af]
```
PS: After successful build, the Docker image could be about 30GB.

<br />

[swap]: https://wiki.archlinux.org/title/Swap
[zram]: https://wiki.archlinux.org/title/Zram

[7z]: https://aur.archlinux.org/packages/7-zip-full
[dk]: https://archlinux.org/packages/community/x86_64/docker/
[jl]: https://archlinux.org/packages/community/x86_64/julia/

