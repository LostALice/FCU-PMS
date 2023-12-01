<template>
    <div>
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name }}<i>{{ user_info["USERNAME"] }}</i></p>
            </div>
            <div class="card-body text-center">
                <div class="row">
                    <div class="col">
                        <img id="main_image" class="rounded-circle mb-3 mt-4" width="160" height="160" :src="imageURL">
                    </div>
                    <div class="col align-items-center justify-content-center d-inline-flex">
                        <div class="row w-100">
                            <p style="font-size: 24px;padding-left: 10px;">學號</p>
                            <p style="font-size: 24px;padding-left: 10px;">名稱</p>
                            <p style="font-size: 24px;padding-left: 10px;">電子郵件</p>
                            <p style="font-size: 24px;padding-left: 10px;">上次登入</p>
                        </div>
                        <div class="row w-100">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ user_info["NID"] }}</p>
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ user_info["USERNAME"] }}</p>
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ user_info["EMAIL"] }}</p>
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ user_info["LAST_LOGIN"] }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { getAboutPage } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { ref, onMounted } from "vue"

    const router = useRouter()
    const targetNID = router.currentRoute.value.params.NID
    const user_info = ref({})
    const imageURL = ref("")

    onMounted(async () => {
        user_info.value = await getAboutPage(targetNID)
        user_info.value["LAST_LOGIN"] = user_info.value["LAST_LOGIN"].replace("T"," ")
        imageURL.value = user_info.value["ICON"]
    })
</script>