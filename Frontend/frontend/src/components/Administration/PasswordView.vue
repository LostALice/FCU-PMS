<template>
    <div class="col-lg">
        <div class="row">
            <div class="col">
                <div class="card shadow my-3">
                    <div class="card-header py-3">
                        <p class="text-primary m-0 fw-bold" style="font-size: 28px;">更改密碼</p>
                    </div>
                    <form>
                        <input type="text" name="" autocomplete="" value="..." style="display: none;">
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">
                                    <strong>NID</strong>
                                </label>
                                <input v-model="nid" class="form-control shadow-none" type="text" autocomplete="current-password" minlength="8" maxlength="50" required="">
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
                            <div class="text-end">
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
        <AlertBlock :message="message" />
    </div>
</template>

<script setup>
    import { forceChangePassword, getPermissionLevel } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { ref, onMounted } from "vue"

    const router = useRouter()

    const nid = ref("")
    const message = ref("")
    const newPassword = ref("")
    const confirmPassword = ref("")

    onMounted(async () => {
        if (await getPermissionLevel() != 3) {
            router.replace("/dashboard")
            console.log(":<")
        }
    })

    async function changePassword() {
        if (newPassword.value != confirmPassword.value) {
            message.value = "密碼不一致"
            newPassword.value = ""
            confirmPassword.value = ""
            return
        }
        if (newPassword.value == "") {
            message.value = "新密碼不能為空"
            newPassword.value = ""
            confirmPassword.value = ""
            return
        }
        if (confirmPassword.value == "") {
            message.value = "舊密碼不能為空"
            newPassword.value = ""
            confirmPassword.value = ""
            return
        }

        for (const i of [newPassword.value, confirmPassword.value]) {
            if (i.length < 8) {
                message.value = "密碼至少8個字元以上"
                newPassword.value = ""
                confirmPassword.value = ""
                return
            }
        }

        let newEncoder = new TextEncoder();
        const newData = newEncoder.encode(newPassword.value);
        const newHash = await crypto.subtle.digest("SHA-256", newData);
        const newHash_array = Array.from(new Uint8Array(newHash));
        const newHash_hex = newHash_array.map((b) => b.toString(16).padStart(2, "0")).join("");
        const newHash_password = newHash_hex;

        await forceChangePassword(nid.value, newHash_password)
    }
</script>
