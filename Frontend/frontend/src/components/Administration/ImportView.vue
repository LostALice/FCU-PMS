<template>
    <div>
        <div class="card shadow">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px">{{$route.name}}</p>
            </div>
            <div class="card-body mh-100">
                <div class="alert alert-success" role="alert"><span><strong>從Excel導入前請仔細閱讀說明</strong><br></span></div>
                <div class="row">
                    <div>
                        <ul class="list-group list-group-numbered mb-3">
                            <li class="list-group-item w-100"><span>文件格式必須為 .xls 或 .xlsx</span></li>
                            <li class="list-group-item"><span>第一行將不會被導入</span></li>
                            <li class="list-group-item"><span>格順序應如下所示 </span><span class="bg-warning">學號 (大寫), 姓名, 密碼, 電郵地址(可選)</span></li>
                            <li class="list-group-item"><span>學號</span></li>
                            <li class="list-group-item"><span>密碼至少8個字元以上</span></li>
                            <li class="list-group-item"><span>學號不應重複</span></li>
                            <li class="list-group-item"><span>示例提供如下</span></li>
                        </ul>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>學號<br></th>
                                        <th>USERNAME<br></th>
                                        <th>PASSWORD<br></th>
                                        <th>EMAIL<br></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>D1234567</td>
                                        <td>陳小明</td>
                                        <td>may be this is a password</td>
                                        <td><i>null</i></td>
                                    </tr>
                                    <tr></tr>
                                    <tr>
                                        <td>T1234567</td>
                                        <td>陳大明</td>
                                        <td>this string can be a password</td>
                                        <td>example@example.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <form>
                            <div class="row">
                                <div class="col" style="text-align: right">
                                    <input
                                        class="form-control shadow-none"
                                        type="file"
                                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        @change="onFileSelected">
                                    <br>
                                    <button class="btn btn-primary btn-info shadow-none" type="button" @click="clearAll">
                                        <i class="fa fa-remove">
                                        </i>&nbsp;清除
                                    </button>
                                    <button class="btn btn-primary shadow-none" type="button" @click="upload">
                                    <i class="fa fa-upload">
                                    </i>
                                        &nbsp;上傳
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
    import { getPermissionLevel } from "@/assets/js/helper.js"
    import { importUser } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { onMounted } from "vue"
    import { ref } from "vue"

    const router = useRouter()
    const message = ref("")
    const fileList = ref(null)

    onMounted(async () => {
        message.value = "Warning: You are using admin tool, be careful for those function."

        if (await getPermissionLevel() != 3) {
            message.value = "YOU SHALL NOT PASS"
            router.replace("/dashboard")
            console.log(":<")
            return
        }
    })

    function onFileSelected(event) {
        const files = event.target.files[0]
        fileList.value = files
    }

    async function upload() {
        if (!fileList.value) {
            message.value = "沒有檔案"
            return
        }
        const status = await importUser(fileList.value)
        if (status["status_code"] != 200) {
            message.value = "Error: " + status["status_code"] + " " + status["message"]
            return
        }
        message.value = "導入成功"
    }

    function clearAll() {
        fileList.value = null
    }
</script>