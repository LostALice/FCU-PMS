<template>
    <div>
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col-md-6 text-nowrap">
                        <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name }}</p>
                    </div>
                    <div class="col-md-6 text-md-end dataTables_filter mt-1">
                        <div class="btn-group" role="group" v-if="permissionLevel>1">
                            <router-link :to="`${$route.path}/new`" class="btn btn-primary btn-sm d-none d-sm-inline-block shadow-none" role="button">
                                <i class="fas fa-plus-circle fa-sm text-white-50"></i>
                                新增
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 text-nowrap">
                    </div>
                    <div class="col-md-6">
                        <div class="text-md-end dataTables_filter" id="dataTable_filter">
                            <label class="form-label">
                                <input type="search" class="form-control form-control-sm shadow-none" aria-controls="dataTable" placeholder="Search" v-model="searchValue">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                    <EasyDataTable :headers="headers" :items="items" :search-value="searchValue" show-index table-class-name="customize-table">
                        <template #item-name="item">
                            <router-link :to="`/project/info/${$router.currentRoute.value.params.subjectID}`">{{ item.name }}</router-link>
                        </template>
                        <template #item-announcements="item">
                            <router-link :to="`/project/${item.projectID}/announcement`">{{ item.announcements }}</router-link>
                        </template>
                        <template #item-student="item">
                            <router-link :to="`/project/${item.projectID}/student`">{{ item.student }}</router-link>
                        </template>
                        <template #item-teacher="item">
                            <router-link :to="`/project/${item.projectID}/teacher`">{{ item.teacher }}</router-link>
                        </template>
                        <template #item-group="item">
                            <router-link :to="`/project/${item.projectID}/group`">{{ item.group }}</router-link>
                        </template>
                        <template #item-assignment="item">
                            <router-link :to="`/project/${item.projectID}/assignment`">{{ item.assignment }}</router-link>
                        </template>
                        <template #item-operation="item" v-if="permissionLevel>1">
                            <div class="btn-group" role="group">
                                <button class="btn btn-primary shadow-none" style="background: #e74a3b;" @click="deleteItem(item)">
                                    <i class="icon ion-android-delete"></i>
                                </button>
                            </div>
                        </template>
                    </EasyDataTable>
                </div>
            </div>
        </div>
        <AlertBlock :message="message" />
    </div>
</template>

<script setup>
    import { getProject, deleteProject } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import "vue3-easy-data-table";
    import { ref, onMounted } from "vue";

    const permissionLevel = ref(localStorage["permissionLevel"])
    const searchValue = ref("");
    const message = ref("")
    const items = ref([])

    const router = useRouter()
    const subjectUUID = router.currentRoute.value.params.subjectID

    const headers = [
        {
            text: "項目名稱",
            value: "name",
            sortable: true
        },
        {
            text: "公告",
            value: "announcements",
            sortable: true
        },
        {
            text: "學生",
            value: "student",
            sortable: true
        },
        {
            text: "教授",
            value: "teacher",
            sortable: true
        },
        {
            text: "小組",
            value: "group",
            sortable: true
        },
        {
            text: "作業",
            value: "assignment",
            sortable: true
        },
    ]

    if (permissionLevel.value > 1) {
        headers.push({
            text: "選項",
            value: "operation",
            sortable: true
        })
    }

    onMounted(async () =>{
        const data = await getProject(subjectUUID)
        if (!Array.isArray(data)) {
            return
        }
        for (const i of data) {
            items.value.push(i)
        }
    })

    async function deleteItem(item) {
        if (items.value.length == 1) {
            message.value = "至少保留一個項目或刪除整個專案"
            return
        }
        if (!confirm("確定刪除項目？")) {
            return
        }
        items.value.splice(item.index-1, 1)
        await deleteProject(item.projectID)
    }
</script>