<script setup lang="ts">
	import { onMounted, ref } from "vue"
	import { sdict } from "../main"
	import type { Pairs } from "../main"

	const dict = ref()
	const main = (self: HTMLElement) =>
		self.querySelectorAll("& > div > * + *").forEach((x) => {
			x.parentNode?.insertBefore(document.createTextNode("·"), x)
			x.parentNode?.insertBefore(document.createTextNode(" "), x)
		})
	const show = (evnt: PointerEvent) => {
		const elem = evnt.target as HTMLElement
		const next = elem.nextElementSibling as HTMLElement
		elem.hidden = true
		next.hidden = false
	}

	onMounted(async () => {
		try {
			const resp = await fetch("/cdn-cgi/trace", { referrer: "" })
			const text = await resp.text()
			const head = sdict(resp.headers) as { "content-encoding": string }
			const data = sdict(text.matchAll(/^.+(?==(.+)$)/gm) as Pairs) as {
				colo: string // IATA
				date: string // MJD
				http: string
				ip: string
				kex: string // key exchange
				loc: string // location
				sni: string
				tls: string
				ts: string // timestamp
				tz: string // ISO time
				uag: string // UA
			}
			const t = new Date(parseFloat(data.ts) * 1e3 || 0)
			data.ts = `${t.toLocaleString("sv")} UTC`
			data.tz = `${t.toISOString().slice(0, -".sssZ".length)}Z`
			if (location.hostname == "localhost") console.log(resp, head, data)

			// https://www.iana.org/assignments/tls-parameters/#tls-parameters-8
			const esc = (s: string) => s.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
			data.kex = esc(data.kex).replace(/^(X25519)(\w)/i, "$1<wbr />$2")
			data.uag = esc(data.uag).replaceAll(/(\w\/)(\d)/g, "$1<wbr />$2")

			//       MJD 40587 == 1970-01-01
			data.date = (40587 + t.getTime() / 86400e3).toFixed(5)
			data.http = data.http.toUpperCase()
			dict.value = { ...data, encode: head["content-encoding"] }
		} catch (_e) {
			const e = _e as Error
			console.warn(`${e.name}: ${e.message}`)
		}
	})
</script>

<template>
	<div id="body" v-if="dict">
		<br />
		<hr />
		<div id="main" :ref="(_) => _ && main(_)">
			<div><span v-html="dict.uag"></span></div>
			<div>
				<span>{{ dict.http }} ({{ dict.encode }})</span>
				<span>
					{{ dict.tls }}
					<span v-html="dict.kex"></span>
				</span>
				<span nobr>SNI: {{ dict.sni }}</span>
				<span nobr>
					IP:
					<a href="javascript:;" @click.self.prevent="show">click to reveal</a>
					<span id="ip" hidden>{{ dict.ip }} ({{ dict.loc }})</span>
				</span>
			</div>
			<div>
				<span>Cloudflare {{ dict.colo }}</span>
				<time :datetime="dict.tz">{{ dict.ts }}</time>
				<span>MJD {{ dict.date }}</span>
			</div>
		</div>
		<hr />
		<br />
	</div>
</template>

<style lang="less">
	:host {
		margin: var(--vp-nav-height) 0;
		min-height: 180px;
	}
	#body {
		animation: fade 240ms ease-in normal both;
		opacity: 0;

		@media (update: none) {
			animation-name: none;
			opacity: 1;
		}
	}
	#main {
		padding: 12px 20px;
		word-break: normal;
	}

	@keyframes fade {
		000% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
