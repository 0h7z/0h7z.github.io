import { resolveConfig } from "vitepress"

const ret = await resolveConfig()
console.log(JSON.stringify(ret))
