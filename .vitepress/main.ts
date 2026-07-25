/*
 * Copyright (C) 2024-2026 Heptazhou <zhou@0h7z.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export { onMounted } from "@vue/runtime-core"
export { ref } from "@vue/reactivity"
export * from "../src/main"
export type { App } from "@vue/runtime-core"
export type { CompilerOptions as VueCompilerOptions } from "@vue/compiler-core"
export type { Options as VueOptions } from "@vitejs/plugin-vue"
export type { PropertiesHyphen as CSS } from "csstype"
export type { Ref } from "@vue/reactivity"
import { defineCustomElement } from "@vue/runtime-dom"
import { useTemplateRef } from "@vue/runtime-core"
import locale from "./locale.json"
import type { CustomElementOptions } from "@vue/runtime-dom"
import type { DefineComponent } from "@vue/runtime-core"
import type { ShallowRef } from "@vue/reactivity"

export type Language = keyof typeof locale.language
export type TemplateRef = Readonly<ShallowRef<HTMLElement>>

export interface PerformanceEntries {
	// PerformanceObserver.supportedEntryTypes
	// event | first-input | largest-contentful-paint | mark | measure | paint
	navigation: PerformanceNavigationTiming[]
	resource: PerformanceResourceTiming[]
}

export const refTemplate = (ref: string) => useTemplateRef(ref) as TemplateRef

export const addCustomElement = (name: string, component: DefineComponent, opt?: CustomElementOptions) => {
	// https://cn.vuejs.org/guide/extras/web-components#sfc-as-custom-element
	void customElements.define(name, defineCustomElement(component, opt))
}

export const getPerformance = <T extends keyof PerformanceEntries>(type: T) => {
	const ret = performance?.getEntriesByType(type) ?? []
	return ret as PerformanceEntries[T]
}

export const fixHtml = (html: string) => {
	html = html.replaceAll(/( *)(?<=(?<!div|-)>)(?=<(pre|svg|x-[a-z]+)\b)/gm, `\n\t`)
	html = html.replaceAll(/( *)(?<=<\/(pre|svg)>)(?=<[^!])/gm, `\n\t`)
	html = html.replaceAll(/( *)(?=<math>|<mjx-\w+|<time datetime=)/gm, `\n\t`)
	html = html.replaceAll(/( +)(style|title)=""(?=[ >])/gm, ``)
	html = html.replaceAll(/( target="_blank" rel="[^"]+")/gm, ``)
	html = html.replaceAll(/(?<!"_blank")(?= href="([a-z]+:)?\/\/)/gm, ` target="_blank"`)
	html = html.replaceAll(/(?<=\,\{)(?=href:`([a-z]+:)?\/\/)/gm, `target:\`_blank\`,`)
	html = html.replaceAll(/(?<=^\s*<(meta|link) .*?[^/>])(>$)/gm, ` />`)
	html = html.replaceAll(/(?<=^<html\b[^>]*)(?=>)/gm, ` class="dark"`)
	html = html.replaceAll(/(?<=<[hb]r|<img [^>]*[^/>])(>)/gm, ` />`)
	html = html.replaceAll(/(?<=<\/?(div)>)\n(?=<\/?\1>)/gm, ``)
	html = html.replaceAll(/(?<=<button\b)(?![^>]* aria-label=)/gm, ` aria-label="button"`)
	html = html.replaceAll(/(?<=<button\b)(?![^>]* type=)/gm, ` type="button"`)
	html = html.replaceAll(/(?<=<div )(style="position:relative;)"/gm, ``)
	html = html.replaceAll(/(^\s*)(?=<\/?(head|body)>$)/gm, ``)
	html = html.replaceAll(/(^\s*<meta name=\x22(description|generator)\x22.*?\n)/gm, ``)
	html = html.replaceAll(/(^\s*<script id=\x22(check-dark-mode)\x22>.*?<\/script>\n)/gm, ``)
	html = html.replaceAll(/(^\s+)/gm, `\t`)
	html = html.replaceAll(/(="" )/gm, `\ `)
	return html.replaceAll(/(\n*$)/gs, `\n`)
}
