<template>
    <div>
        <div class="card shadow">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{$route.name}}</p>
            </div>
            <div class="card-body mh-100">
                <div class="alert alert-success" role="alert"><span><strong>從Excel導入前請仔細閱讀說明</strong><br></span></div>
                <div class="row">
                    <div>
                        <ul class="list-group list-group-numbered mb-3">
                            <li class="list-group-item w-100"><span>文件格式必須為 .xls 或 .xlsx</span></li>
                            <li class="list-group-item"><span>第一行將不會被導入</span></li>
                            <li class="list-group-item"><span>格順序應如下所示 </span><span class="bg-warning">NID (大寫), 姓名, 班級, 類型, 科系ID, 科系, 學院ID, 學院<br></span></li>
                            <li class="list-group-item"><span>NID必須包含在內，否則數據將不會導入</span></li>
                            <li class="list-group-item"><span>NID 不應重複</span></li>
                            <li class="list-group-item"><span>示例提供如下</span></li>
                        </ul>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>NID<br></th>
                                        <th>姓名<br></th>
                                        <th>班級<br></th>
                                        <th>類型<br></th>
                                        <th>科系ID<br></th>
                                        <th>科系<br></th>
                                        <th>學院ID<br></th>
                                        <th>學院<br></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>D1234567</td>
                                        <td>陳小明</td>
                                        <td>人工智慧技術與應用學士學位學程一</td>
                                        <td>學生</td>
                                        <td>AITI</td>
                                        <td>人工智慧技術與應用學士學位學程<br></td>
                                        <td>AITI</td>
                                        <td>創能學院</td>
                                    </tr>
                                    <tr></tr>
                                    <tr>
                                        <td>T1234567</td>
                                        <td>陳大明</td>
                                        <td>人工智慧技術與應用學士學位學程一</td>
                                        <td>教師</td>
                                        <td>AITI</td>
                                        <td>人工智慧技術與應用學士學位學程<br></td>
                                        <td>AITI</td>
                                        <td>創能學院</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <form>
                            <div class="row">
                                <div class="col" style="text-align: right;">
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
        <AlertBlock :message="message" />
    </div>
</template>

<script setup>
    import { importStudent } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { ref } from "vue"

    const message = ref("")
    const fileList = ref(null)
    const router = useRouter()
    const projectUUID = router.currentRoute.value.params.projectID

    function onFileSelected(event) {
        const files = event.target.files[0]
        fileList.value = files
    }

    function upload() {
        if (!fileList.value) {
            message.value = "沒有檔案"
            return
        }
        importStudent(projectUUID, fileList.value);
        message.value = "導入成功"
        router.push("/project/"+projectUUID+"/student")
    }

    function clearAll() {
        fileList.value = null
    }
</script>