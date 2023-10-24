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
                                <input type="search" class="form-control form-control-sm" aria-controls="dataTable" placeholder="Search">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">

                    <EasyDataTable :headers="headers" :items="items" table-class-name="customize-table" show-index>
                        <template #item-name="item">
                            <router-link :to="`${$route.path}/info/${item.groupUUID}`">{{ item.name }} </router-link>
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
    </div>
</template>

<script>

</script>

<script setup>
    import { getGroupData, deleteGroup } from "@/assets/js/helper.js";
    import { ref, onMounted } from "vue"
    import "vue3-easy-data-table";
    import { useRouter } from "vue-router";

    const router = useRouter()
    const projectUUID = router.currentRoute.value.params.projectID
    const permissionLevel = ref(localStorage["permissionLevel"])
    const items = ref([])

    const headers = [
        {
            text: "小組名稱",
            value: "name",
            sortable: true
        },
        {
            text: "教授",
            value: "teacher",
            sortable: true
        },
        {
            text: "學生",
            value: "student",
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

    onMounted(async () => {
        const data = await getGroupData(projectUUID)
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
        deleteGroup(item.groupUUID, projectUUID)
    }
</script>