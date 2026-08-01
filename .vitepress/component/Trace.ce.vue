<script setup lang="ts">
	import { escHtml, getProtocolNot, onMounted, ref, vec2obj } from "../main"
	import type { Properties } from "../main"

	const dict = ref()
	const main = (self?: HTMLElement) =>
		self?.querySelectorAll("& > div > * + *").forEach((x) => {
			x.parentNode?.insertBefore(x.ownerDocument.createTextNode("·"), x)
			x.parentNode?.insertBefore(x.ownerDocument.createTextNode(" "), x)
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
			const head = vec2obj(resp.headers) as { "content-encoding"?: string }
			const data = vec2obj(text.matchAll(/^.+(?==(.+)$)/gm) as Properties) as {
				colo?: string // IATA
				date?: string // MJD
				http?: string
				ip?: string
				kex?: string // key exchange
				loc?: string // location
				sni?: string
				tls?: string
				ts?: string // timestamp
				tz?: string // ISO time
				uag?: string // UA
			}
			const host = location?.hostname ?? ""
			const perf = [head["content-encoding"], getProtocolNot(data.http ?? "")]
			const t = new Date(parseFloat(data.ts ?? "") * 1e3 || 0)
			data.ts = `${t.toLocaleString("sv")} UTC`
			data.tz = `${t.toISOString().slice(0, -".sssZ".length)}Z`

			// https://www.iana.org/assignments/tls-parameters/#tls-parameters-8
			data.kex = escHtml(data.kex ?? "").replace(/^(X25519)(\w)/i, "$1<wbr />$2")
			data.uag = escHtml(data.uag ?? "").replaceAll(/(\w\/)(\d)/g, "$1<wbr />$2")
			host.endsWith(".com") || console.log(location, { resp, head, data })

			//       MJD 40587 == 1970-01-01
			data.date = (40587 + t.getTime() / 86400e3).toFixed(5)
			data.http = data.http?.toUpperCase()
			dict.value = { ...data, info: perf.reverse().filter(Boolean).join("; ") }
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
		<div id="main" :ref="main">
			<div><span v-html="dict.uag"></span></div>
			<div>
				<span>{{ dict.http }} ({{ dict.info }})</span>
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
		// padding: 12px 20px;
		padding: 0.75rem 1.25rem;
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
