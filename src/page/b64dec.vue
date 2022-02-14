<script setup>
	import { decode, encode } from "@/lib/Base64/Base64.min"
	import { reactive, watchEffect } from "vue"
	import { useRoute } from "vue-router"

	const route = useRoute()
	const data = reactive({ str: "" })

	const hashdec = (hash) => {
		let h = hash.replace(/^#*/, "")
		if (h == "") return "> Nothing to do."
		try {
			return decode(h)
		} catch (e) {
			return "> Decode failed."
		}
	}
	watchEffect(async () => {
		data.str = await hashdec(route.hash)
	})
</script>

<template>
	<div font="mono" larger>{{ data.str }}</div>
</template>

<style scoped>
	div {
		margin: 3.14rem;
	}
</style>
