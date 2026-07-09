<script setup lang="ts">
	import { onMounted, ref } from "vue"

	const dict = ref()

	onMounted(async () => {
		try {
			const resp = await fetch("/cdn-cgi/trace", { referrer: "" })
			const text = await resp.text()
			const head = Object.fromEntries(resp.headers) as { "content-encoding": string }
			const data = Object.fromEntries(text.matchAll(/^.+(?==(.+)$)/gm)) as {
				colo: string // IATA
				date: string // MJD
				http: string
				ip: string
				kex: string // key exchange
				loc: string // location
				sni: string
				tls: string
				ts: string // timestamp
				tz?: string // ISO time
				uag: string // UA
			}
			const t = new Date(parseFloat(data.ts) * 1e3)
			data.ts = `${t.toLocaleString("sv")} UTC`
			data.tz = `${t.toISOString().slice(0, -".sssZ".length)}Z`
			if (location.hostname == "localhost") console.log(resp, head, data)

			data.date = (t.getTime() / 86400_000 + 40587).toFixed(5)
			data.http = data.http.toUpperCase()
			dict.value = { encoding: head["content-encoding"], ...data }
		} catch (_e) {
			const e = _e as Error
			console.warn(`${e.name}: ${e.message}`)
		}
	})
</script>

<template>
	<br />
	<div v-if="dict">
		<hr />
		<div id="text">
			<div>
				<span>{{ dict.uag }}</span>
			</div>
			<div>
				<span>{{ dict.http }} ({{ dict.encoding }})</span>
				·
				<span>{{ dict.tls }} {{ dict.kex }} (SNI: {{ dict.sni }})</span>
				·
				<span>IP: {{ dict.ip }} ({{ dict.loc }})</span>
			</div>
			<div>
				<span>Cloudflare {{ dict.colo }}</span>
				·
				<time :datetime="dict.tz">{{ dict.ts }}</time>
				·
				<span>MJD {{ dict.date }}</span>
			</div>
		</div>
		<hr />
	</div>
	<br />
</template>

<style lang="less">
	:host {
		margin: var(--vp-nav-height) 0;
	}
	#text {
		padding: 12px 20px;
	}
</style>
