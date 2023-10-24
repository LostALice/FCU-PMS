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
                                <input class="form-control w-100 shadow-none" :class="!weight ? 'alert-danger border-danger': ''" type="number" v-model="weight" min="1" max="100">
                                <span :style="weight ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                                <span :style="weight <= 100 && weight > 1 ? 'visibility:hidden': ''" class="tooltiptext"> 權重需大於1% 少於等於100%</span>
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
                                <p style="font-size: 24px;">小組</p>
                            </div>
                            <div class="col">
                                <EasyDataTable
                                :class="!groupSelected ? 'alert-danger border-danger': ''"
                                :headers="headers"
                                :items="groupList"
                                v-model:items-selected="groupSelected"
                                show-index  />
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
    </div>
</template>

<script setup>
    import { getGroupData, newAssignment } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router";
    import { ref, onMounted } from "vue"
    import "vue3-easy-data-table"

    const name = ref("")
    const weight = ref(0)
    const date = ref("")
    const groupSelected = ref([])
    const groupList = ref([])
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

    function saveAssignment() {
        for (const i of groupSelected.value) {
            newAssignment(projectUUID, i.groupUUID, name.value, weight.value, date.value)
        }
        router.go(-1)
    }
</script>
