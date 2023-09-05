
##	Requirement
*****
+	Platform
	-	x86-64 GNU/Linux
+	Hardware
	-	some good CPU cores
	-	15GB free RAM at least (due to the notorious `gkrust`)
	-	30GB free disk space or more
+	Software
	-	[`7z`][7z] (7-zip)
	-	[`docker`][dk]
	-	[`julia`][jl]

Note: Make sure the [Docker storage driver] is `overlay2` rather than `vfs`, otherwise, you better have unlimited disk space.
(Check it with command `docker info`. Other storage drivers like `btrfs` or `zfs` have not been tested, practicality unknown.)

PS: If build fails due to OOM killer (SIGKILL) or freezes due to OOM, try to
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
id=$(docker create snowfox:win-make) && docker cp $id:pkg . -q && docker rm $id && julia move.jl /

# optional
docker images
docker system prune [-af]
```
PS: After successful build, the Docker image could be over 23GB.

<br />

[Docker storage driver]: https://docs.docker.com/storage/storagedriver/select-storage-driver/

[swap]: https://wiki.archlinux.org/title/Swap
[zram]: https://wiki.archlinux.org/title/Zram

[7z]: https://aur.archlinux.org/packages/7-zip-full
[dk]: https://archlinux.org/packages/extra/x86_64/docker/
[jl]: https://archlinux.org/packages/extra/x86_64/julia/

