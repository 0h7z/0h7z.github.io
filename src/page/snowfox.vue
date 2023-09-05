<script setup>
	import "@/css/md"
	import BasicInfo from "./snowfox/readme.md"
	import BldManual from "./snowfox/manual.md"
	import ChangeLog from "./snowfox/changelog.md"
</script>

<template>
	<div>
		<h1 italic regular>Snowfox</h1>
		<BasicInfo smaller />
	</div>
	<div>
		<h2 center>Snowfox Changelog</h2>
		<ChangeLog smaller />
	</div>
	<div>
		<h2 center>Snowfox Build Guide</h2>
		<BldManual smaller />
	</div>
</template>

<style scoped>
	#main > div {
		margin-top: 2.72rem;
		margin-bottom: 4rem;
		margin-left: 15%;
		margin-right: 15%;

		@media print {
			margin-left: 7%;
			margin-right: 7%;
		}
	}
	div >>> ul {
		line-height: calc(3.14 / 2);
	}
	div >>> a.header-anchor {
		color: unset;
	}
</style>
