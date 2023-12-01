<template>
    <div>
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name }}</p>
            </div>
            <div class="card-body mh-100">
                <div class="row">
                    <div class="col">
                        <div class="row-xxl-5 text-center align-middle">
                            <p class="lead" style="font-size: 24px;">可選擇教授</p>
                        </div>
                        <div class="col text-center align-middle">
                            <input type="text" class="form-control shadow-none" v-model="teacherSearchValue">
                        </div>
                        <br>
                        <div class="col">
                            <EasyDataTable
                                :headers="teacherHeaders"
                                :items="teacherItems"
                                v-model:items-selected="teacherSelected"
                                show-index
                                :search-value="teacherSearchValue"
                                alternating>
                            </EasyDataTable>
                      </div>
                    </div>

                    <div class="col-xxl-2">
                        <div class="row-xxl-5 text-center align-middle">
                            <p class="lead" style="font-size: 25px;">⠀</p>
                        </div>
                        <div class="row-xxl-5 text-center align-middle">
                            <p class="lead">搜尋</p>
                        </div>
                        <div class="row-xxl-2 text-center border-start-warning item">
                            <button class="btn btn-primary shadow-none w-100 my-3" type="button" @click="saveTeacherList">
                                <i class="fa fa-save"></i>
                                &nbsp;儲存
                            </button>
                            <router-link class="btn btn-primary shadow-none w-100" role="button" to="import">
                                <i class="fa fa-download"></i>
                                &nbsp;從Excel 匯入
                            </router-link>
                        </div>
                    </div>

                    <div class="col">
                        <div class="row-xxl-5 text-center align-middle">
                            <p class="lead" style="font-size: 24px;">已選教授</p>
                        </div>
                        <div class="col text-center align-middle">
                            <input type="text" class="form-control shadow-none" v-model="selectSearchValue">
                        </div>
                        <br>
                        <div class="col">
                            <EasyDataTable
                                :headers="SelectHeaders"
                                :items="teacherSelected"
                                show-index
                                :search-value="selectSearchValue" alternating>
                            </EasyDataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { getTeacherList } from "@/assets/js/helper.js"
    import { newTeacher } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { onMounted } from "vue"
    import { ref } from "vue"

    const router = useRouter()
    const projectUUID = useRouter().currentRoute.value.params.projectID

    const teacherSearchValue = ref("")
    const teacherSelected = ref([]);
    const teacherItems = ref([])
    const teacherHeaders = [
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

    const selectSearchValue = ref("")
    const SelectHeaders = [
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

    onMounted(async () => {
        const teacherList = await getTeacherList(projectUUID);

        for (const teacher of teacherList) {
            teacherItems.value.push(teacher)
        }

    })

    function saveTeacherList(){
        console.log(teacherSelected.value)
        for (const i of teacherSelected.value) {
            newTeacher(i.nid, projectUUID)
        }
        router.push(`/project/${projectUUID}/teacher`)
    }
</script>