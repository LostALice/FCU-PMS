<template>
    <div class="col mb-3">
        <div class="col-lg">
            <div class="row">
                <div class="col">
                    <div class="card shadow my-3">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold" style="font-size: 28px;">個人檔案</p>
                        </div>
                        <div class="card-body text-center">
                            <div class="row">
                                <div class="col">
                                    <img id="main_image" class="rounded-circle mb-3 mt-4" width="160" height="160" :src="imageURL">
                                </div>
                                <div class="col d-flex align-items-center justify-content-center">
                                    <div class="w-100">
                                        <strong>更改圖片</strong>
                                        <input @change="changeImage" class="form-control shadow-none" type="file" accept="image/*">
                                    </div>
                                </div>
                                <div class="text-end">
                                    <button @click="uploadImage" class="btn btn-primary btn-sm shadow-none">
                                        <i class="fa fa-save"></i>
                                        &nbsp;儲存
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg">
            <div class="row">
                <div class="col">
                    <div class="card shadow my-3">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold" style="font-size: 28px;">更改電郵</p>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="mb-3">
                                    <label class="form-label">
                                        <strong>新電郵</strong>
                                    </label>
                                    <input v-model="newEmail" class="form-control shadow-none" type="email" autocomplete="current-password" required="">
                                </div>
                                <div class="text-end mb-3">
                                    <button @click="changeEmail_" class="btn btn-primary btn-sm shadow-none" type="submit">
                                        <i class="fa fa-save"></i>
                                        &nbsp;儲存
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg">
            <div class="row">
                <div class="col">
                    <div class="card shadow my-3">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold" style="font-size: 28px;">更改密碼</p>
                        </div>
                        <form>
                            <input
                                type="text"
                                name="email"
                                value="..."
                                autocomplete="username email"
                                style="display: none;"
                            >
                            <div class="card-body">
                                <div class="mb-3">
                                    <label class="form-label">
                                        <strong>舊密碼</strong>
                                    </label>
                                    <input v-model="oldPassword" class="form-control shadow-none" type="password" autocomplete="current-password" show="*" minlength="8" maxlength="50" required="">
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">
                                                <strong>新密碼</strong>
                                            </label>
                                        <input v-model="newPassword" class="form-control shadow-none" autocomplete="new-password" show="*" type="password" minlength="8" maxlength="50" required="">
                                    </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">
                                                <strong>確認密碼</strong>
                                            </label>
                                            <input v-model="confirmPassword" autocomplete="confirm-password" class="form-control shadow-none" show="*" type="password" minlength="8" maxlength="50" required="">
                                        </div>
                                    </div>
                                </div>
                                <div class="text-end mb-3">
                                    <button @click="changePassword" class="btn btn-primary btn-sm shadow-none" type="submit">
                                        <i class="fa fa-save"></i>
                                        &nbsp;儲存
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <AlertBlock :message="message" @closeBlock="message=``" />
    </div>
</template>

<script setup>
    import { getProfileIconImage  } from "@/assets/js/helper.js"
    import { changePassword_ } from "@/assets/js/helper.js"
    import { changeEmail } from "@/assets/js/helper.js"
    import { changeIcon } from "@/assets/js/helper.js"
    import { HashSHA256 } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { onMounted } from "vue"
    import { ref } from "vue"

    const router = useRouter()

    const message = ref("")
    const imageURL = ref("")
    const newEmail = ref("")
    const oldPassword = ref("")
    const newPassword = ref("")
    const confirmPassword = ref("")

    const file = ref(File)

    onMounted(async () => {
        imageURL.value = await getProfileIconImage()
    })

    async function uploadImage() {
        if (file.value == undefined) {
            message.value = "沒有選取圖片"
            return
        }
        changeIcon(file.value, file.value.name)
    }

    function changeImage(event) {
        if (file.value == undefined) {
            message.value = "沒有選取圖片"
            return
        }
        file.value = event.target.files[0]

        if (file.value) {
            imageURL.value = URL.createObjectURL(file.value)
        }
    }

    async function changeEmail_() {
        console.log(newEmail.value)
        if (!newEmail.value) {
            message.value = "Email 為空"
            return
        }

        if (!newEmail.value.includes("@")) {
            message.value = "Email 格式錯誤"
            return
        }
        const status = await changeEmail(newEmail.value)
        if (status.status_code == 200) {
            router.push(`/about/${localStorage["nid"]}`)
        }
        else {
            message.value = "Server Error"
            return
        }
    }

    async function changePassword() {
        if (newPassword.value == "") {
            message.value = "新密碼不能為空"
            newPassword.value = ""
            oldPassword.value = ""
            confirmPassword.value = ""
            return
        }
        if (oldPassword.value == "") {
            message.value = "舊密碼不能為空"
            newPassword.value = ""
            oldPassword.value = ""
            confirmPassword.value = ""
            return
        }
        if (confirmPassword.value == "") {
            message.value = "舊密碼不能為空"
            newPassword.value = ""
            oldPassword.value = ""
            confirmPassword.value = ""
            return
        }
        if (oldPassword.value == newPassword.value) {
            message.value = "新密碼不能與舊密碼一致"
            newPassword.value = ""
            oldPassword.value = ""
            confirmPassword.value = ""
            return
        }
        if (newPassword.value != confirmPassword.value) {
            message.value = "密碼不一致"
            newPassword.value = ""
            oldPassword.value = ""
            confirmPassword.value = ""
            return
        }
        for (const i of [newPassword.value, confirmPassword.value, oldPassword.value]) {
            if (i.length < 8) {
                message.value = "密碼至少8個字元以上"
                newPassword.value = ""
                oldPassword.value = ""
                confirmPassword.value = ""
                return
            }
        }

        const newHash_password = HashSHA256(newPassword.value)

        const oldHash_password = HashSHA256(oldPassword.value)

        const status = await changePassword_(oldHash_password, newHash_password)

        if (status.status_code == 400) {
            message.value = "SQLInjectionCheck: " + status["SQLInjectionCheck"]
            return
        }

        if (status.status_code == 200) {
            localStorage.clear()
            router.replace("/login")
            return
        }

        if (status.status_code == 400) {
            newPassword.value = ""
            oldPassword.value = ""
            confirmPassword.value = ""
            message.value = "密碼不正確"
            return
        }
    }
</script>
