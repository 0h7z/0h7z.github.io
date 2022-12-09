import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"

import Idx from "@/page/index.vue"
import Msg from "@/lib/Message.vue"

const Base64dec = () => import("@/page/b64dec.vue")
const Base64enc = () => import("@/page/b64enc.vue")

const mkpath = (to, mode = "") => {
	const hash = to.hash
	to = to.fullPath.split("#", 1)[0].split("?")
	to[0] = to[0].replace(/(^\/*|\/{2,})/g, "/")
	if (mode == "d") to[0] = to[0].replace(/\/$/, "") + "/"
	if (mode == "f") to[0] = to[0].replace(/\/$/, "")
	return `${to.join("?") + hash}`
}

// https://paths.esm.dev/
const route = [
	// * test
	// { path: "/:path(.*)", component: Message, props: (to) => ({ msg: to }) },
	// * main
	{ path: "/:path(/.*|.*//.*)", redirect: (to) => mkpath(to) },
	{ path: "/", component: Idx },
	{ path: "/dec", redirect: (to) => mkpath(to, "d") },
	{ path: "/dec/", component: Base64dec },
	{ path: "/enc", redirect: (to) => mkpath(to, "d") },
	{ path: "/enc/", component: Base64enc },
	// * client error (400:499)
	{ path: "/400", component: Msg, props: { msg: "400 Bad Request" } },
	{ path: "/401", component: Msg, props: { msg: "401 Unauthorized" } },
	{ path: "/402", component: Msg, props: { msg: "402 Payment Required" } },
	{ path: "/403", component: Msg, props: { msg: "403 Forbidden" } },
	{ path: "/404", component: Msg, props: { msg: "404 Not Found" } },
	{ path: "/405", component: Msg, props: { msg: "405 Method Not Allowed" } },
	{ path: "/406", component: Msg, props: { msg: "406 Not Acceptable" } },
	{ path: "/407", component: Msg, props: { msg: "407 Proxy Authentication Required" } },
	{ path: "/408", component: Msg, props: { msg: "408 Request Timeout" } },
	{ path: "/409", component: Msg, props: { msg: "409 Conflict" } },
	{ path: "/410", component: Msg, props: { msg: "410 Gone" } },
	{ path: "/411", component: Msg, props: { msg: "411 Length Required" } },
	{ path: "/412", component: Msg, props: { msg: "412 Precondition Failed" } },
	{ path: "/413", component: Msg, props: { msg: "413 Payload Too Large" } },
	{ path: "/414", component: Msg, props: { msg: "414 URI Too Long" } },
	{ path: "/415", component: Msg, props: { msg: "415 Unsupported Media Type" } },
	{ path: "/416", component: Msg, props: { msg: "416 Range Not Satisfiable" } },
	{ path: "/417", component: Msg, props: { msg: "417 Expectation Failed" } },
	{ path: "/418", component: Msg, props: { msg: "418 I'm a teapot" } },
	{ path: "/421", component: Msg, props: { msg: "421 Misdirected Request" } },
	{ path: "/422", component: Msg, props: { msg: "422 Unprocessable Entity" } },
	{ path: "/423", component: Msg, props: { msg: "423 Locked" } },
	{ path: "/424", component: Msg, props: { msg: "424 Failed Dependency" } },
	{ path: "/425", component: Msg, props: { msg: "425 Too Early" } },
	{ path: "/426", component: Msg, props: { msg: "426 Upgrade Required" } },
	{ path: "/428", component: Msg, props: { msg: "428 Precondition Required" } },
	{ path: "/429", component: Msg, props: { msg: "429 Too Many Requests" } },
	{ path: "/431", component: Msg, props: { msg: "431 Request Header Fields Too Large" } },
	{ path: "/451", component: Msg, props: { msg: "451 Unavailable For Legal Reasons" } },
	// * catch all
	{ path: "/:path(.*)", component: Msg, props: { msg: "404 Not Found" } },
]

const router = createRouter({
	// history: createWebHashHistory(),
	history: createWebHistory(),
	routes: route,
	strict: true,
})

export default router
