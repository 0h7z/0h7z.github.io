<!-- import About from "./index.md.vue" -->
<script setup lang="ts">
	import { mail, mark_github } from "@primer/octicons/svg"
	import { VPTeamMembers } from "vitepress/theme"
	import ico_seele from "./@seele.png"
	import ico_zhou from "./@zhou.png"
	import type { DefaultTheme } from "vitepress/theme"

	const title = {
		bot: (_) => ({ zh: "    " })[_]?.trim() || "Bot",
		dev: (_) => ({ zh: "开发" })[_]?.trim() || "Developer",
	} as const satisfies Record<string, (lang: string) => string>

	const core = (lang: string): DefaultTheme.TeamMember[] => [
		{
			avatar: ico_zhou,
			name: "Heptazhou",
			title: title.dev(lang),
			links: [
				{ icon: { svg: mark_github }, link: "https://github.com/Heptazhou" },
				{ icon: { svg: mail }, link: "mailto:zhou@0h7z.com" },
			],
		},
		{
			avatar: ico_seele,
			name: "Seele",
			title: title.bot(lang),
			links: [
				{ icon: { svg: mark_github }, link: "https://github.com/seelebot" },
				// { icon: { svg: mail }, link: "mailto:seele@0h7z.com" },
			],
		},
	]

	const more = (_: string): DefaultTheme.TeamMember[] => []

	const { lang } = defineProps<{ lang: string }>()
</script>

<!-- <About lang="und" /> -->
<template>
	<VPTeamMembers :members="core(lang)" size="medium" />
	<VPTeamMembers :members="more(lang)" size="small" />
</template>
