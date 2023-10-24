<template>
    <div>
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col-md-6 text-nowrap">
                        <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name }}</p>
                    </div>
                    <div class="col-md-6 text-md-end dataTables_filter mt-1">
                        <div class="btn-group" role="group">
                            <button class="btn btn-primary btn-sm d-none d-sm-inline-block shadow-none" role="button" @click="saveGroup">
                                <i class="fas fa-save fa-sm text-white-50"></i> 保存
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div class="card-body mh-100">
                <div class="row">
                    <div class="col col-4">
                        <p style="font-size: 24px;">小組名稱</p>
                    </div>
                    <div class="col">
                        <input class="form-control w-100 shadow-none" :class="!groupName ? 'alert-danger border-danger': ''" type="text" v-model="groupName">
                        <span :style="groupName ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                    </div>
                </div>
                <hr>
                <div>
                    <div class="row">
                        <div class="col">
                            <div class="col text-center align-middle">
                                <p class="lead" style="font-size: 24px;">可選擇教授</p>
                            </div>
                            <div class="col text-center align-middle">
                                <input type="text" class="form-control shadow-none" v-model="teacherSearchValue" placeholder="搜尋">
                            </div>
                            <EasyDataTable
                            :headers="Headers"
                            :items="teacherItems"
                            v-model:items-selected="teacherSelected"
                            show-index
                            :search-value="teacherSearchValue"
                            >
                        </EasyDataTable>
                    </div>
                        <div class="col">
                            <div class="col text-center align-middle">
                                <p class="lead" style="font-size: 24px;">已選教授</p>
                            </div>
                            <div class="col text-center align-middle">
                                <input type="text" class="form-control shadow-none" v-model="teacherSelectSearchValue" placeholder="搜尋">
                            </div>
                            <EasyDataTable
                                :headers="Headers"
                                :items="teacherSelected"
                                show-index
                                :search-value="teacherSelectSearchValue">
                            </EasyDataTable>
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <div class="row">

                        <div class="col">
                            <div class="col text-center align-middle">
                                <p class="lead" style="font-size: 24px;">可選擇學生</p>
                            </div>
                            <div class="col text-center align-middle">
                                <input type="text" class="form-control shadow-none" v-model="studentSearchValue" placeholder="搜尋">
                            </div>
                            <EasyDataTable
                                :headers="Headers"
                                :items="studentItems"
                                v-model:items-selected="studentSelected"
                                show-index
                                :search-value="studentSearchValue"
                            >
                            </EasyDataTable>
                        </div>

                        <div class="col">
                            <div class="col text-center align-middle">
                                <p class="lead" style="font-size: 24px;">已選學生</p>
                            </div>
                            <div class="col text-center align-middle">
                                <input type="text" class="form-control shadow-none" v-model="studentSelectSearchValue" placeholder="搜尋">
                            </div>
                            <EasyDataTable
                                :headers="Headers"
                                :items="studentSelected"
                                show-index
                                :search-value="studentSelectSearchValue">
                            </EasyDataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AlertBlock :message="message" />
    </div>
</template>

<script setup>
    import { getGroupTeacherData, getGroupStudentData, newGroup, getGroupToken } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { ref, onMounted } from "vue"
    import "vue3-easy-data-table"

    const router = useRouter()
    const projectUUID = router.currentRoute.value.params.projectID
    const groupName = ref("")
    const message = ref("")

    const teacherSearchValue = ref("")
    const studentSearchValue = ref("")

    const teacherSelected = ref([]);
    const studentSelected = ref([]);

    const teacherItems = ref([])
    const studentItems = ref([]);

    const Headers = [
        {
            text: "NID",
            value: "nid",
            sortable: true,
        },
        {
            text: "姓名",
            value: "name",
            sortable: true,
        },
    ];

    const teacherSelectSearchValue = ref("")
    const studentSelectSearchValue = ref("")

    onMounted(async () => {
        const teacherList = await getGroupTeacherData(projectUUID)
        const studentList = await getGroupStudentData(projectUUID)
        if (!Array.isArray(teacherList)) {
            return
        }
        if (!Array.isArray(studentList)) {
            return
        }

        teacherItems.value = teacherList
        studentItems.value = studentList
    })


    async function saveGroup() {
        if (JSON.parse(JSON.stringify(studentSelected.value)) == []) {
            message.value = "必須選擇至少一名學生"
            return
        }
        if (!groupName.value) {
            message.value = "沒有組別名稱"
            return
        }
        const GID = await getGroupToken()
        for (const i of teacherSelected.value) {
            newGroup(projectUUID, i.nid, groupName.value, GID.GID)
        }
        for (const i of studentSelected.value) {
            newGroup(projectUUID, i.nid, groupName.value, GID.GID)
        }
        router.go(-1)
    }
</script>