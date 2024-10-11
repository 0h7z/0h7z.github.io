import { resolve } from "path"
import { writeFileSync } from "fs"

const output = resolve(__dirname, "[status].json")
const status = Object.assign(
	{
		// https://datatracker.ietf.org/doc/html/rfc2295
		506: "Variant Also Negotiates",
		// https://datatracker.ietf.org/doc/html/rfc2518 - WebDAV
		102: "Processing", // removed in rfc4918
		// https://datatracker.ietf.org/doc/html/rfc2774
		510: "Not Extended",
		// https://datatracker.ietf.org/doc/html/rfc3229
		226: "IM Used",
		// https://datatracker.ietf.org/doc/html/rfc4918 - WebDAV
		207: "Multi-Status",
		412: "Precondition Failed",
		414: "Request-URI Too Long",
		422: "Unprocessable Entity",
		423: "Locked",
		424: "Failed Dependency",
		507: "Insufficient Storage",
		// https://datatracker.ietf.org/doc/html/rfc5842 - WebDAV
		208: "Already Reported",
		508: "Loop Detected",
		// https://datatracker.ietf.org/doc/html/rfc6585
		428: "Precondition Required",
		429: "Too Many Requests",
		431: "Request Header Fields Too Large",
		511: "Network Authentication Required",
		// https://datatracker.ietf.org/doc/html/rfc7231
		413: "Payload Too Large",
		// https://datatracker.ietf.org/doc/html/rfc7725
		451: "Unavailable For Legal Reasons",
		// https://datatracker.ietf.org/doc/html/rfc8297
		103: "Early Hints",
		// https://datatracker.ietf.org/doc/html/rfc8470
		425: "Too Early",
	},
	{
		// https://datatracker.ietf.org/doc/html/rfc9110#status.1xx
		100: "Continue",
		101: "Switching Protocols",
		// https://datatracker.ietf.org/doc/html/rfc9110#status.2xx
		200: "OK",
		201: "Created",
		202: "Accepted",
		203: "Non-Authoritative Information",
		204: "No Content",
		205: "Reset Content",
		206: "Partial Content",
		// https://datatracker.ietf.org/doc/html/rfc9110#status.3xx
		300: "Multiple Choices",
		301: "Moved Permanently",
		302: "Found",
		303: "See Other",
		304: "Not Modified",
		305: "Use Proxy", // deprecated in rfc7231
		306: "(Unused)", // reserved
		307: "Temporary Redirect",
		308: "Permanent Redirect",
		// https://datatracker.ietf.org/doc/html/rfc9110#status.4xx
		400: "Bad Request",
		401: "Unauthorized",
		402: "Payment Required", // reserved
		403: "Forbidden",
		404: "Not Found",
		405: "Method Not Allowed",
		406: "Not Acceptable",
		407: "Proxy Authentication Required",
		408: "Request Timeout",
		409: "Conflict",
		410: "Gone",
		411: "Length Required",
		412: "Precondition Failed",
		413: "Content Too Large",
		414: "URI Too Long",
		415: "Unsupported Media Type",
		416: "Range Not Satisfiable",
		417: "Expectation Failed",
		418: "(Unused)", // reserved
		421: "Misdirected Request",
		422: "Unprocessable Content",
		426: "Upgrade Required",
		// https://datatracker.ietf.org/doc/html/rfc9110#status.5xx
		500: "Internal Server Error",
		501: "Not Implemented",
		502: "Bad Gateway",
		503: "Service Unavailable",
		504: "Gateway Timeout",
		505: "HTTP Version Not Supported",
	},
	{
		// https://datatracker.ietf.org/doc/html/rfc2324 - HTCPCP
		418: "I'm a teapot",
	}
)

writeFileSync(output, JSON.stringify(status, null, "\t") + "\n")

export default {
	paths: () =>
		Object.entries(status).map(([code, desc]) => ({
			params: { status: code },
			content: `${code} ${desc}`,
		})),
}
