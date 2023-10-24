// Code by AkinoAlice@Tyrant_Rex
import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL

if (API_URL) {
    axios.defaults.baseURL = API_URL
}
else {
    axios.defaults.baseURL = "http://localhost:8000"
}

import { createApp } from "vue"
import router from "./router"
import App from "./App.vue"

import Vue3EasyDataTable from "vue3-easy-data-table"
import "vue3-easy-data-table/dist/style.css";
import AlertBlock from "@/components/AlertBlock.vue"

const app = createApp(App)
app.component("EasyDataTable", Vue3EasyDataTable)
app.component("AlertBlock", AlertBlock)

app.use(router)

app.mount("#app")