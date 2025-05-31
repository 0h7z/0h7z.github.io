
<script setup lang="ts">
	import { core, extra } from "./index"
	import { VPTeamMembers } from "vitepress/theme"
</script>

<VPTeamMembers size="medium" :members="core('zh')" />
<VPTeamMembers size="small" :members="extra('zh')" />
