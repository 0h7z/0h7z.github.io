export default {
	paths: () =>
		Object.entries({
			400: "bad request",
			401: "unauthorized",
			402: "payment required",
			403: "forbidden",
			404: "not found",
			405: "method not allowed",
			406: "not acceptable",
			407: "proxy authentication required",
			408: "request timeout",
			409: "conflict",
			410: "gone",
			411: "length required",
			412: "precondition failed",
			413: "payload too large",
			414: "URI too long",
			415: "unsupported media type",
			416: "range not satisfiable",
			417: "expectation failed",
			418: "I'm a teapot",
			421: "misdirected request",
			422: "unprocessable entity (WebDAV)",
			423: "locked (WebDAV)",
			424: "failed dependency (WebDAV)",
			425: "too early",
			426: "upgrade required",
			428: "precondition required",
			429: "too many requests",
			431: "request header fields too large",
			451: "unavailable for legal reasons",
		}).map(([code, desc]) => ({
			params: { status: code },
			content: `${code} ${desc}`,
		})),
}
