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
                                <input type="search" class="form-control form-control-sm shadow-none" aria-controls="dataTable" placeholder="Search">
                            </label>
                        </div>
                    </div>
                </div>
                <EasyDataTable v-if="items" :headers="headers" :items="items" table-class-name="customize-table" show-index alternating>
                    <template #item-title="item">
                        <router-link :to="`${$route.path}/info/${item.announcementUUID}`">{{ item.title }} </router-link>
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
    import { getAnnouncementData} from "@/assets/js/helper.js"
    import { deleteAnnouncement } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { onMounted } from "vue"
    import { ref } from "vue"

    const router = useRouter()
    const projectUUID = router.currentRoute.value.params.projectID
    const permissionLevel = ref(localStorage["permissionLevel"])
    const items = ref([])

    const headers = [
        {
            text: "標題",
            value: "title",
            sortable: true
        },
        {
            text: "作者",
            value: "author",
            sortable: true
        },
        {
            text: "最後修改日期",
            value: "date",
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
        const data = await getAnnouncementData(projectUUID)
        if (!Array.isArray(data)) {
            return
        }
        for (const i of data) {
            items.value.push(i)
        }
    })

    async function deleteItem(item) {
        if (!confirm("確定刪除項目？")) {
            return
        }
        items.value.splice(item.index-1, 1)
        await deleteAnnouncement(projectUUID, item.announcementUUID)
    }


</script>