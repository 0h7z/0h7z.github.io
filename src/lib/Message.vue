<script setup>
	defineProps({ msg: String })
</script>

<template>
	<div>
		<h1 regular>{{ msg }}</h1>
	</div>
</template>

<style scoped>
	div {
		margin: 2.72rem;
	}
	h1 {
		line-height: 3.14rem;
	}
</style>
