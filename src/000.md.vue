<!-- import HTTP from "/000.md.vue" -->
<script setup lang="ts">
	import { obj2vec } from "./main"
	import data from "./[status].json"
	import type { Property } from "./main"

	const { r } = defineProps<{ r: RegExp }>()
</script>

<!-- <HTTP :r="/^0/" /> -->
<template>
	<p v-once v-for="[k, v] of obj2vec(data).filter(([k]: Property) => RegExp(r).test(k))">
		<a target="_blank" :href="`/${k}/`">{{ k }} {{ v }}</a>
	</p>
</template>
