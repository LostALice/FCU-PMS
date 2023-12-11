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
                <EasyDataTable :headers="headers" :items="items" :sort-by="sortBy" :sort-type="sortType" :search-value="searchValue" table-class-name="customize-table" show-index alternating />
            </div>
        </div>
        <AlertBlock :message="message" @closeBlock="message=``" />
    </div>
</template>

<script setup>
    import { getPermissionLevel } from "@/assets/js/helper.js"
    import { getLog } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { onMounted } from "vue"
    import { ref } from "vue"

    const router = useRouter()

    const searchValue = ref("")
    const items = ref([])
    const sortBy = "timestamp"
    const sortType = "desc"
    const message = ref("")

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
        message.value = "Warning: You are using admin tool, be careful for those function."

        if (await getPermissionLevel() != 3) {
            message.value = "YOU SHALL NOT PASS"
            router.replace("/dashboard")
            console.log(":<")
            return
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