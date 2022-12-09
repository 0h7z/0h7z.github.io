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
			Greetings.<br /><br />
			Nothing much here.
		</p>
		<p>
			Check out more on GitHub.<br />
			> <a href="https://github.com/0h7z" target="_blank">github.com/0h7z</a>
		</p>
		<p hidden>
			Also have a look at<br />
			<a href="https://www.heptazhou.com" target="_blank">heptazhou.com</a> .
		</p>
	</div>
</template>

<style scoped>
	div {
		margin-top: 2.72rem;
		margin-bottom: 4rem;
	}
</style>
