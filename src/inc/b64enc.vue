<script setup>
	import { decode, encode } from "@/lib/Base64/Base64.min"
	import { reactive, watchEffect } from "vue"
	import { useRoute } from "vue-router"

	const route = useRoute()
	const data = reactive({ str: "" })
	const enc = (msg) => {
		try {
			const r = encode(msg).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_")
			if (r) navigator.clipboard.writeText(`${location.origin}/dec/#${r}`)
			return `${r || "> Nothing to do."}`
		} catch (e) {
			console.debug(e)
			return "> Encode failed."
		}
	}
	watchEffect(() => (data.str = enc(route.hash.replace(/^#*/, "") || prompt())))
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
