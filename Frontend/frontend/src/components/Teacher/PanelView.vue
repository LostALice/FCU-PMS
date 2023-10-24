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
                        <div class="text-md-end dataTables_filter">
                            <label class="form-label">
                                <input v-model="searchValue" type="search" class="form-control form-control-sm shadow-none" aria-controls="dataTable" placeholder="Search">
                            </label>
                        </div>
                    </div>
                </div>

                <EasyDataTable :headers="headers" :items="items" :search-value="searchValue" table-class-name="customize-table" show-index>
                    <template #item-nid="item">
                        <router-link :to="`${$route.path}/info/${item.nid}`">{{ item.nid }}</router-link>
                        <a href="/"></a>
                    </template>

                    <template #item-operation="item" v-if="permissionLevel>1">
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
</template>

<script setup>
    import { getTeacherData, deleteTeacher } from "@/assets/js/helper.js";
    import { useRouter } from "vue-router"
    import { ref, onMounted } from "vue";
    import "vue3-easy-data-table";

    const permissionLevel = ref(localStorage["permissionLevel"])
    const searchValue = ref("")
    const items = ref([])

    const projectUUID = useRouter().currentRoute.value.params.projectID

    const headers = [
        {
            text: "NID",
            value: "nid"
        },
        {
            text: "姓名",
            value: "name"
        },
    ]

    if (permissionLevel.value > 1) {
        headers.push({
            text: "選項",
            value: "operation",
            sortable: true
        })
    }

    onMounted(async () => {
        const data = await getTeacherData(projectUUID)
        if (!Array.isArray(data)) {
            return
        }
        for (const i of data) {
            items.value.push(i)
        }
    })

    function deleteItem(item) {
        if (!confirm("確定刪除項目？")) {
            return
        }
        items.value.splice(item.index-1, 1)

        deleteTeacher(item.nid, projectUUID)
    }
</script>