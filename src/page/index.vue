<script setup>
	import HelloWorld from "@/lib/HelloWorld.vue"
</script>

<template>
	<div center>
		<img alt="logo" src="@/bin/logo.png" />
		<HelloWorld msg="Hello World." />
	</div>
	<div center italic>
		<p>
			Greetings. This site is still under<br />
			very-early construction.
		</p>
		<p>
			The old site is at <a href="https://www.heptazhou.com/" target="_blank">heptazhou.com</a>, just<br />
			take a look if you are looking for<br />
			something other than here.
		</p>
	</div>
</template>

<style scoped>
	div {
		margin-top: 2.72rem;
		margin-bottom: 4rem;
	}
</style>
