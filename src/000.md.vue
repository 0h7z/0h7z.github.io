<!--  -->
<script setup lang="ts">
	import { entriesof } from "./main"
	import data from "./[status].json"
</script>

<template>
	<!-- TS7031: Binding element "k" implicitly has an "any" type. -->
	<!-- @vue-expect-error TS7031 -->
	<div v-once v-for="[k, v] of entriesof(data).filter(([k]) => /^0/.test(k))">
		<a :href="`/${k}/`">
			<p>{{ k }} {{ v }}</p>
		</a>
	</div>
</template>
