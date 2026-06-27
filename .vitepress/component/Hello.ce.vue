<script setup lang="ts">
	import { greeting } from "../locale.json"
	import type { Language } from "../config"
	import type { PropertiesHyphen as CSS } from "csstype"

	const LANG: Language[] = ["en", "zh"]

	const animation_ctime = 5 // second
	const animation_cycle = LANG.length
	const animation_delay = (id: number) => `${id * animation_ctime}s`
	const animation_duration = `${animation_cycle * animation_ctime}s`
	const animation_style = (id: number): CSS => ({
		"animation-delay": animation_delay(id),
		"animation-duration": animation_duration,
	})
</script>

<template>
	<span v-once v-for="(lang, id) in LANG" :lang :style="animation_style(id)">
		{{ greeting[lang] }}
	</span>
	<br />
</template>

<style lang="less">
	@n: 2; // animation_cycle
	@0: (000% / @n), (100% / @n);
	@1: (040% / @n), (060% / @n);

	span[lang] {
		animation: fade ease-in-out infinite normal none;
		opacity: 0;
		position: absolute;

		@media (update: none) {
			animation-name: none;
			&:first-child {
				opacity: 1;
			}
		}
	}

	@keyframes fade {
		@{0} {
			opacity: 0;
		}
		@{1} {
			opacity: 1;
		}
	}
</style>
