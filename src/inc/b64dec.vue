<script setup>
	import { decode, encode } from "@/lib/Base64/Base64.min"
	import { reactive, watchEffect } from "vue"
	import { useRoute } from "vue-router"

	const route = useRoute()
	const data = reactive({ str: "" })
	const dec = (msg) => {
		try {
			const r = decode(msg)
			if (r) navigator.clipboard.writeText(r)
			return `${r || "> Nothing to do."}`
		} catch (e) {
			console.debug(e)
			return "> Decode failed."
		}
	}
	watchEffect(() => (data.str = dec(route.hash.replace(/^#*/, ""))))
</script>

<template>
	<div font="mono" larger>{{ data.str }}</div>
</template>

<style scoped>
	div {
		margin: 3.14rem;
		white-space: pre-wrap;
		white-space: break-spaces;
	}
</style>
