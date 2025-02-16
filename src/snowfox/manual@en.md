#	Snowfox Build Guide

##	Requirement
*****
+	Platform
	-	x86-64 GNU/Linux
+	Hardware
	-	some CPU cores (typically 4 or more)
	-	24GB RAM at least (due to the notorious `gkrust`)
	-	32GB RAM recommended (no need for swap space)
	-	30GB disk space (SSD recommended)
+	Software
	-	[`7zip`][7z]
	-	[`docker`][dk]
	-	[`julia`][jl]
	-	[`sha3sum`][s3]

Note: Make sure the [Docker storage driver] is `overlay2` rather than `vfs`, otherwise, you better have unlimited disk space.
(Check it with command `docker info`. Other storage drivers like `btrfs` or `zfs` have not been tested, practicality unknown.)

PS: If you have less than 24GB RAM and the build fails due to OOM killer (9 SIGKILL), try to
+	increase available memory
+	increase/enable [swap] (see also [zram])

<br />

##	Build
*****

###	Source
```sh
git clone https://github.com/Heptazhou/Snowfox.git
cd Snowfox/Source
julia l10n.jl fetch unpack patch build clean
julia make.jl fetch unpack patch build clean
```

###	Arch
```sh
git clone https://github.com/0h7z/Snowfox.git
cd Snowfox/Arch
# WIP
```

###	Windows
```sh
git clone https://github.com/0h7z/Snowfox.git
cd Snowfox/Windows
docker build -t snowfox:win-arch -< win-arch.dockerfile
docker build -t snowfox:win-base -< win-base.dockerfile
docker build -t snowfox:win-make -< win-make.dockerfile
id=`docker create snowfox:win-make` && docker cp $id:pkg . -q && docker rm $id

# optionally
docker images
docker system prune [-af]
```

<br />

[Docker storage driver]: https://docs.docker.com/storage/storagedriver/select-storage-driver/

[swap]: https://wiki.archlinux.org/title/Swap
[zram]: https://wiki.archlinux.org/title/Zram

[7z]: https://archlinux.org/packages/extra/x86_64/7zip/
[dk]: https://archlinux.org/packages/extra/x86_64/docker/
[jl]: https://archlinux.org/packages/extra/x86_64/julia/
[s3]: https://archlinux.org/packages/extra/x86_64/sha3sum/

