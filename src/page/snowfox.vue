<script setup>
	import "@/css/md"
	import BldManual from "./snowfox/manual.md"
	import ChangeLog from "./snowfox/changelog.md"
</script>

<template>
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
	div {
		margin-top: 2.72rem;
		margin-bottom: 4rem;
		margin-left: 10%;
		margin-right: 10%;
	}
	div.md {
		line-height: calc(3.14 / 2);
	}
</style>
