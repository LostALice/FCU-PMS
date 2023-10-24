<template>
    <div
    @dragover.prevent
    @dragenter.prevent
    @dragleave.prevent
    @drop="handleDrop">
    <div class="card shadow my-3">
        <div class="card-header py-3">
            <p class="text-primary m-0 fw-bold" style="font-size: 28px;">上載檔案</p>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col">
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">作業文件</p>
                            </div>
                            <div class="col">
                                <input class="form-control shadow-none" type="file" @change="onFileSelected" multiple>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="col">
                    <EasyDataTable
                    :headers="headers"
                    :items="fileList"
                    table-class-name="customize-table"
                    show-index  />
                </div>
                <br>
                <div class="row">
                    <div class="col" style="text-align: left;">
                        <div>
                            <label>您可以將文件拖放到此處</label>
                        </div>
                    </div>
                    <div class="col" style="text-align: right;">
                        <button class="btn btn-primary shadow-none" type="button" @click="submitAssignment">
                            <i class="icon ion-android-upload"></i>上載
                        </button>
                        <button class="btn btn-primary shadow-none mx-1" type="button" @click="deleteAll">
                            <i class="icon ion-android-delete"></i>清除所有
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { uploadAssignment } from "@/assets/js/helper.js";
    import { useRouter } from "vue-router";
    import "vue3-easy-data-table"
    import { ref } from "vue"

    const fileList = ref([])
    const headers = ref([
        {
            text: "作業",
            value: "name",
            sortable: true
        },
    ])

    const router = useRouter()
    const projectUUID = router.currentRoute.value.params.projectID
    const assignmentUUID = router.currentRoute.value.params.assignmentID

    function onFileSelected(event) {
        const files = event.target.files
        for (const i of files) {
            fileList.value.push({
                "name": i.name,
                "file": i,
            })
        }
    }

    function deleteAll() {
        fileList.value = []
    }

    function handleDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;

        processDroppedFiles(files);
    }

    function processDroppedFiles(files) {
        for (const i of files) {
            fileList.value.push({
                "name": i.name,
                "file": i,
            })
        }
    }

    function submitAssignment() {
        for (const i of fileList.value) {
            uploadAssignment(projectUUID, assignmentUUID, i.name, i.file)
        }
        router.push(`/project/${projectUUID}/assignment`)
    }
</script>