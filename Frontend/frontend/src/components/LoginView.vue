<template>
    <div>
        <section id="login-page" class="login-dark fixed-top" style="backdrop-filter: blur(10px)" >
            <form method="post" style="background: rgba(15,25,35,0.9)">
                <div class="illustration">
                    <i class="icon ion-ios-locked-outline"></i>
                </div>

                <div class="mb-3">
                    <input v-model="nid" @keyup.enter="login_func" id="nid" class="form-control" type="text" name="nid" placeholder="NID" style="border-bottom-color: rgb(112,128,146)">
                </div>

                <div class="mb-3">
                    <input v-model="password" @keyup.enter="login_func" id="login_password" autocomplete class="form-control" type="password" name="password" placeholder="Password">
                </div>

                <div class="mb-3">
                    <button @click="login_func" class="btn btn-primary d-block w-100" type="button">登入</button>
                </div>
            </form>
        </section>
        <AlertBlock :message="message" @closeBlock="message=``" />
    </div>
</template>

<script setup>
    import { getPermissionLevel } from "@/assets/js/helper.js"
    import { getJWTToken } from "@/assets/js/helper.js"
    import { JWTValidate } from "@/assets/js/helper.js"
    import { verifyLogin } from "@/assets/js/helper.js"
    import { HashSHA256 } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { onMounted } from "vue"
    import { ref } from "vue"

    const hashPassword = ref("")
    const password = ref("")
    const message = ref("")
    const nid = ref("")

    const router = useRouter()

    async function login_func() {
        if (nid.value === "") {
            message.value = "請輸入NID"
            return
        }
        if (password.value === "") {
            message.value = "請輸入密碼"
            return
        }

        nid.value = nid.value.toUpperCase()
        hashPassword.value = HashSHA256(password.value)
        const response = await verifyLogin(nid.value, hashPassword.value)

        if (!response["access"]) {
            message.value = "伺服器內部錯誤: 500"
        }

        // Store jwt token to localStorage for future use
        if (response.access) {
            localStorage["nid"] = nid.value.toLocaleUpperCase()
            localStorage["token"] = response.token["x-access-token"]
            await getPermissionLevel()
            router.replace("/dashboard")
        } else {
            message.value = "用戶名或密碼不正確"
            return
        }
    }

    onMounted(async () => {
        if (getJWTToken()) {
            const JWTValidation = await JWTValidate()

            if (JWTValidation.access){
                router.go(-1)
            }
            else {
                localStorage["nid"] = null
                localStorage["token"] = null
                router.replace("/")
            }
        }
    })
</script>
