<script setup lang="ts">
	import { core, extra } from "./index"
	import { VPTeamMembers } from "vitepress/theme"
</script>

<template>
	<VPTeamMembers size="medium" :members="core('en')" />
	<VPTeamMembers size="small" :members="extra('en')" />
</template>
