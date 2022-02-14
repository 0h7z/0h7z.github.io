import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import { defineAsyncComponent } from "vue"

import Index from "@/page/index.vue"
import Message from "@/lib/Message.vue"

const Base64dec = defineAsyncComponent(() => import("@/page/b64dec.vue"))

const mkpath = (to, mode = "") => {
	let hash = to.hash
	to = to.fullPath.split("#", 1)[0].split("?")
	to[0] = to[0].replace(/(^\/*|\/\/+)/g, "/")
	if (mode == "d") to[0] = to[0].replace(/\/$/, "") + "/"
	if (mode == "f") to[0] = to[0].replace(/\/$/, "")
	return to.join("?") + hash
}

const route = [
	// { path: "/:path(.*)", component: Message, props: (to) => ({ msg: to }) },
	{ path: "/:path(/.*|.*//.*)", redirect: (to) => mkpath(to) },
	{ path: "/", component: Index },
	{ path: "/dec", redirect: (to) => mkpath(to, "d") },
	{ path: "/dec/", component: Base64dec },
	// misc
	{ path: "/400", component: Message, props: { msg: "400 Bad Request" } },
	{ path: "/401", component: Message, props: { msg: "401 Unauthorized" } },
	{ path: "/402", component: Message, props: { msg: "402 Payment Required" } },
	{ path: "/403", component: Message, props: { msg: "403 Forbidden" } },
	{ path: "/404", component: Message, props: { msg: "404 Not Found" } },
	{ path: "/405", component: Message, props: { msg: "405 Method Not Allowed" } },
	{ path: "/406", component: Message, props: { msg: "406 Not Acceptable" } },
	{ path: "/407", component: Message, props: { msg: "407 Proxy Authentication Required" } },
	{ path: "/408", component: Message, props: { msg: "408 Request Timeout" } },
	{ path: "/409", component: Message, props: { msg: "409 Conflict" } },
	{ path: "/410", component: Message, props: { msg: "410 Gone" } },
	{ path: "/411", component: Message, props: { msg: "411 Length Required" } },
	{ path: "/412", component: Message, props: { msg: "412 Precondition Failed" } },
	{ path: "/413", component: Message, props: { msg: "413 Payload Too Large" } },
	{ path: "/414", component: Message, props: { msg: "414 URI Too Long" } },
	{ path: "/415", component: Message, props: { msg: "415 Unsupported Media Type" } },
	{ path: "/416", component: Message, props: { msg: "416 Range Not Satisfiable" } },
	{ path: "/417", component: Message, props: { msg: "417 Expectation Failed" } },
	{ path: "/418", component: Message, props: { msg: "418 I'm a teapot" } },
	{ path: "/421", component: Message, props: { msg: "421 Misdirected Request" } },
	{ path: "/422", component: Message, props: { msg: "422 Unprocessable Entity" } },
	{ path: "/423", component: Message, props: { msg: "423 Locked" } },
	{ path: "/424", component: Message, props: { msg: "424 Failed Dependency" } },
	{ path: "/425", component: Message, props: { msg: "425 Too Early" } },
	{ path: "/426", component: Message, props: { msg: "426 Upgrade Required" } },
	{ path: "/428", component: Message, props: { msg: "428 Precondition Required" } },
	{ path: "/429", component: Message, props: { msg: "429 Too Many Requests" } },
	{ path: "/431", component: Message, props: { msg: "431 Request Header Fields Too Large" } },
	{ path: "/451", component: Message, props: { msg: "451 Unavailable For Legal Reasons" } },
	{ path: "/:path(.*)", component: Message, props: { msg: "404 Not Found" } },
]

const router = createRouter({
	history: createWebHistory(),
	// history: createWebHashHistory(),
	routes: route,
	strict: true,
})

export default router
