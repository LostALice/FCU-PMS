<template>
    <div
    @dragover.prevent
    @dragenter.prevent
    @dragleave.prevent
    @drop="handleDrop"
    >
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name }}</p>
            </div>
            <div class="card-body mh-100">
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">作業名稱</p>
                            </div>
                            <div class="col">
                                <input class="form-control w-100 shadow-none" :class="!name ? 'alert-danger border-danger': ''" type="text" v-model="name">
                                <span :style="name ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">權重(%)</p>
                            </div>
                            <div class="col">
                                <input class="form-control w-100 shadow-none" :class="!weight ? 'alert-danger border-danger': ''" type="number" v-model="weight" min="0" max="100">
                                <span :style="weight ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                                <span :style="weight <= 100 && weight >= 1 ? 'visibility:hidden': ''" class="tooltiptext"> *權重需至少大於1% 少於等於100%</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">截止繳交日期</p>
                            </div>
                            <div class="col">
                                <input class="form-control w-100 shadow-none" :class="!date ? 'alert-danger border-danger': ''" type="datetime-local" v-model="date">
                                <span :style="date ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">接受文件類型</p>
                            </div>
                            <br>
                            <div class="col pt-1">
                                <div class="table-responsive border rounded-1">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypesAll" value="*" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">任何文件<br /></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value="text/*" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">文字<br /></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value="audio/*" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">音樂<br /></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value="image/*" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">圖片<br /></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value="video/*" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">影片<br /></label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".txt" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.txt</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".acc" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.acc</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".jpg" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.jpg/jpeg<br /></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".mp4" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.mp4</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".docs.doc" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.docs/doc</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".pdf" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.pdf</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".flac" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.flac<br /></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".png" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.png<br /></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".mov" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.mov</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".xlsx.xls" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.xlsx/xls</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".csv" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.csv</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".mp3" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.mp3</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".svg" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.svg</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".avi" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.avi</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input type="checkbox" v-model="fileTypes" :disabled="fileTypesAll" value=".pptx" class="form-check-input shadow-none" />
                                                        <label class="form-check-label">.pptx/ppt</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">小組</p>
                            </div>
                            <div class="col">
                                <EasyDataTable
                                :class="!groupSelected ? 'alert-danger border-danger': ''"
                                :headers="headers"
                                :items="groupList"
                                v-model:items-selected="groupSelected"
                                show-index alternating />
                                <span :style="groupSelected ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col" style="text-align: right;">
                        <button class="btn btn-primary shadow-none" type="button" @click="saveAssignment">
                            <i class="fa fa-save"></i> 儲存
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <AlertBlock :message="message" @closeBlock="message=``" />
    </div>
</template>

<script setup>
    import { newAssignment } from "@/assets/js/helper.js"
    import { getGroupData} from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { onMounted } from "vue"
    import { ref } from "vue"

    const allowedFileTypes = ref("")
    const message = ref("")
    const name = ref("")
    const date = ref("")

    const groupSelected = ref([])
    const groupList = ref([])
    const fileTypes = ref([])

    const fileTypesAll = ref(false)
    const weight = ref(0)

    const headers = ref([
        {
            text: "小組",
            value: "name",
            sortable: true
        },
    ])

    const router = useRouter()
    const projectUUID = router.currentRoute.value.params.projectID

    onMounted(async () => {
        const data = await getGroupData(projectUUID)
        if (!Array.isArray(data)) {
            return
        }
        groupList.value = data
    })

    async function saveAssignment() {
        if (name.value == "") {
            message.value = "未填作業名稱"
            return
        }
        if (weight.value > 100 || weight.value < 1) {
            message.value = "權重需大於1% 少於等於100%"
            return
        }
        if (date.value == "") {
            message.value = "未填截止繳交日期"
            return
        }
        if (groupSelected.value.length == 0) {
            message.value = "至少選擇1組"
            return
        }

        if (fileTypesAll.value) {
            allowedFileTypes.value = "*"
        }
        else {
            allowedFileTypes.value = fileTypes.value.toString()
        }
        console.log(allowedFileTypes.value)
        for (const i of groupSelected.value) {
            const status = await newAssignment(projectUUID, i.groupUUID, name.value, weight.value, date.value, allowedFileTypes.value)
            if (status.status_code == 400) {
                message.value = "SQLInjectionCheck: " + status["SQLInjectionCheck"]
                return
            }
        }
        router.go(-1)
    }
</script>
