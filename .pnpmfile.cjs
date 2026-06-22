function readPackage(pkg) {
	for (const x in pkg?.optionalDependencies) {
		if (/(?:-musl|-ppc64|-wasi)$/.test(x)) delete pkg.optionalDependencies[x]
		if (/(?<!darwin)-arm($|-|64)/.test(x)) delete pkg.optionalDependencies[x]
		if (/(?<!linux|win32)\-(x64)/.test(x)) delete pkg.optionalDependencies[x]
		if (/\b(linux|win32)-(?!x64)/.test(x)) delete pkg.optionalDependencies[x]
	}
	return pkg
}

module.exports = { hooks: { readPackage } }
