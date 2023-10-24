<template>
    <div>
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col-md-6 text-nowrap">
                        <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name }}</p>
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
                <EasyDataTable :headers="headers" :items="items" :sort-by="sortBy" :sort-type="sortType" :search-value="searchValue" table-class-name="customize-table" show-index />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { getLog, getPermissionLevel } from "@/assets/js/helper.js";
    import { useRouter } from "vue-router"
    import { ref, onMounted } from "vue";
    import "vue3-easy-data-table";

    const router = useRouter()

    const searchValue = ref("")
    const items = ref([])
    const sortBy = "timestamp";
    const sortType = "desc";

    const headers = [
        {
            text: "時間",
            value: "timestamp",
            sortable: true,
        },
        {
            text: "事件",
            value: "event",
            sortable: true,
        },
        {
            text: "參數",
            value: "args",
            sortable: true,
        },
    ]

    onMounted(async () => {
        if (await getPermissionLevel() != 3) {
            router.replace("/dashboard")
            console.log(":<")
        }

        const data = await getLog()
        for (const i of data) {
            const temp = {
                timestamp: i["DATE"].replace("T", " "),
                event: i["EVENT"],
                args: i["ARGs"]
            }
            items.value.push(temp)
        }
    })
</script>