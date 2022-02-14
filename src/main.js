import { createApp } from "vue"

import "@/main.pcss"
import main from "@/main.vue"
import router from "@/router.js"

const app = createApp(main)
app.use(router)
app.mount("#main")
