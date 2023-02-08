
##	Requirement
*****
+	Platform
	-	x86-64 GNU/Linux
+	Hardware
	-	4-core CPU at least
	-	1GB+ RAM per logical core
	-	42GB free disk space or more
+	Software
	-	[`7z`][7z] (7-zip)
	-	[`docker`][dk]
	-	[`julia`][jl]

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
time docker build -t snowfox-arch - < Dockerfile
id=$(docker create snowfox-arch) && docker cp $id:/pkg . && docker rm $id

# optional
docker images
docker system prune [-af]
```
PS: After successful build, the Docker image is about 20GB.

<br />

[7z]: https://aur.archlinux.org/packages/7-zip-full
[dk]: https://archlinux.org/packages/community/x86_64/docker/
[jl]: https://archlinux.org/packages/community/x86_64/julia/

