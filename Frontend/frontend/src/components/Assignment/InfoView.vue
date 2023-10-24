<template>
    <div>
        <div class="card shadow mb-3">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col-md-6 text-nowrap">
                        <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name }}</p>
                    </div>
                    <div class="col-md-6 text-md-end dataTables_filter mt-1">
                        <div class="btn-group" role="group">
                            <button @click="markScore" class="btn btn-primary btn-sm d-none d-sm-inline-block shadow-none" role="button">
                                <i class="icon ion-clipboard"></i>
                                評分
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="col">
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">名稱</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ name }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">小組</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ group }}<br></p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">分數</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ mark }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">權重</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ weight }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">繳交日期</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ date }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card shadow">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px;">作業文件</p>
            </div>
            <div class="card-body">
                <div class="col">
                    <EasyDataTable :headers="headers" :items="items" table-class-name="customize-table" show-index>
                        <template #item-title="item">
                            <a :href="`/download/${item.taskID}/${item.fileID}/${item.filename}`" @click="download(item)" @click.prevent="" :download="item.filename">{{ item.filename }} </a>
                        </template>

                        <template #item-operation="item">
                            <div class="btn-group" role="group">
                                <button class="btn btn-primary shadow-none" style="background: #e74a3b;width: 42px;" @click="deleteItem(item)">
                                    <i class="icon ion-android-delete"></i>
                                </button>
                            </div>
                        </template>
                    </EasyDataTable>
                </div>
            </div>
        </div>
        <SubmitView />
        <AlertBlock :message="message" />
    </div>
</template>

<script setup>
    import { deleteAssignmentItem } from "@/assets/js/helper.js";
    import { markAssignmentScore } from "@/assets/js/helper.js";
    import { downloadAssignment } from "@/assets/js/helper.js";
    import { getAssignmentInfo } from "@/assets/js/helper.js";
    import { useRouter } from "vue-router"
    import SubmitView from "./SubmitView"
    import { ref, onMounted } from "vue"
    import "vue3-easy-data-table";

    const message = ref("")
    const name = ref("")
    const group = ref("")
    const mark = ref("")
    const weight = ref("")
    const date = ref("")

    const router = useRouter()
    const projectUUID = router.currentRoute.value.params.projectID
    const assignmentUUID = router.currentRoute.value.params.assignmentID

    const items = ref([])
    const headers = [
        {
            text: "檔案名稱",
            value: "title",
            sortable: true,
        },
        {
            text: "上傳者",
            value: "author",
            sortable: true,
        },
        {
            text: "上載日期",
            value: "date",
            sortable: true,
        },
        {
            text: "選項",
            value: "operation",
        },
    ]

    onMounted(async () => {
        const info = await getAssignmentInfo(projectUUID, assignmentUUID)
        if (info.status_code) {
            return
        }
        name.value = info.assignment_name
        group.value = info.group_name
        mark.value = info.mark
        weight.value = info.weight
        date.value = info.date.replace("T", " ")
        if (!info.assignment_file){
            info.assignment_file = []
        }
        items.value = info.assignment_file
    })

    function markScore() {
        const marks = parseInt(prompt("分數","1-100"))
        if (!marks) {
            MessageChannel.value = "輸入錯誤"
            markScore()
        }
        if (marks <= 0 || marks > 100) {
            message.value = "輸入錯誤"
            markScore()
        }
        if (confirm("提交分數後學生不能再提交作業\n是否確定?")) {
            markAssignmentScore(assignmentUUID, projectUUID, marks)
            mark.value = marks
            message.value = "提交成功"
        }
    }

    async function download(item) {
        const fileExtension = item.filename.split(".").pop();

        let fileData = await downloadAssignment(projectUUID, item.taskID, item.fileID, item.filename)
        const resultUrl = URL.createObjectURL(new Blob([fileData], {type: `application/${fileExtension}`}));

        const a = document.createElement("a");
        a.href = resultUrl;
        a.download = item.filename;
        a.style.display = "none";
        document.body.appendChild(a);

        a.click();
        a.remove();
    }

    function deleteItem(item) {
        if (!confirm("確定刪除項目？")) {
            return
        }
        items.value.splice(item.index-1, 1)

        deleteAssignmentItem(item.taskID, item.fileID, item.author)
    }
</script>