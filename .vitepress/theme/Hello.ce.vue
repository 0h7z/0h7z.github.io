<script setup lang="ts">
	const list = {
		en: "Hello",
		zh: "你好",
	}

	const animation_ctime = 5 // second
	const animation_cycle = 2 // length(list)
	const animation_delay = (id: number) => id * animation_ctime + "s"
	const animation_duration = animation_cycle * animation_ctime + "s"
</script>

<template>
	<span>
		<span
			v-for="(v, k, i) in list"
			:lang="k"
			:style="{
				'animation-delay': animation_delay(i),
				'animation-duration': animation_duration,
			}">
			{{ v }}
		</span>
		<br />
	</span>
</template>

<style scoped lang="less">
	@n: 2; // animation_cycle
	@0: (000% / @n), (100% / @n);
	@1: (040% / @n), (060% / @n);

	span[lang] {
		animation: fade ease-in-out infinite normal none;
		opacity: 0;
		position: absolute;
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
