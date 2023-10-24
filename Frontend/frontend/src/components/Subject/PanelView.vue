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

                    <EasyDataTable :headers="headers" :items="items" :search-value="searchValue" table-class-name="customize-table" show-index>
                        <template #item-name="item">
                            <router-link :to="`/project/${item.subjectUUID}`">{{ item.name }}</router-link>
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
    </div>
</template>

<script setup>
    import { getSubject, deleteSubject } from "@/assets/js/helper.js"
    import { ref, onMounted } from "vue";
    import "vue3-easy-data-table";

    const permissionLevel = ref(localStorage["permissionLevel"])
    const searchValue = ref("");
    const items = ref([])

    const headers = [
        {
            text: "專案名稱",
            value: "name",
            sortable: true
        },
        {
            text: "年度",
            value: "year",
            sortable: true
        },
        {
            text: "開始日期",
            value: "startDate",
            sortable: true
        },
        {
            text: "結束日期",
            value: "endDate",
            sortable: true
        },
        {
            text: "結算開始日期",
            value: "settlementStartDate",
            sortable: true
        },
        {
            text: "結算結束日期",
            value: "settlementEndDate",
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
        const data = await getSubject()
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
        deleteSubject(item.subjectUUID)
    }
</script>