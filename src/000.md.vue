<!-- import HTTP from "/000.md.vue" -->
<script setup lang="ts">
	import { entries } from "./main"
	import data from "./[status].json"
	import type { Property } from "./main"

	const { r } = defineProps<{ r: RegExp }>()
</script>

<template>
	<!-- <HTTP :r="/^0/" /> -->
	<p v-once v-for="[k, v] of entries(data).filter(([k]: Property) => RegExp(r).test(k))">
		<a target="_blank" :href="`/${k}/`">{{ k }} {{ v }}</a>
	</p>
</template>
