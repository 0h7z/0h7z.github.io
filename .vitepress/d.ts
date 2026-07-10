// https://github.com/vitejs/vite/blob/master/packages/vite/client.d.ts
/// <reference types="vite/client" />

declare module "*.ce.vue" {
	import type { DefineComponent } from "@vue/runtime-core"

	export const element: DefineComponent
	export default element
}
