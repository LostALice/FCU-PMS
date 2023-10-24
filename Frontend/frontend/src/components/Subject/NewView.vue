<template>
    <div>
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name }}</p>
            </div>
            <div class="card-body">
                <form>
                    <div class="container mw-100 h-100">
                        <div class="row mb-1">
                            <div class="col col-4">
                                <p style="font-size: 24px;">專案名稱</p>
                            </div>
                            <div class="col">
                                <input class="shadow-none form-control w-100" type="text" :class="!projectName ? 'alert-danger': ''" v-model="projectName">
                                <span :style="projectName ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">年度</p>
                            </div>
                            <div class="col">
                                <input class="shadow-none form-control w-100" type="number" :class="!year ? 'alert-danger': ''" v-model="year">
                                <span :style="year ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">起始日期</p>
                            </div>
                            <div class="col">
                                <input class="shadow-none form-control w-100" type="date" :class="!startDate ? 'alert-danger': ''" v-model="startDate">
                                <span :style="startDate ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">結束日期</p>
                            </div>
                            <div class="col">
                                <input class="shadow-none form-control w-100" type="date" :class="!endDate ? 'alert-danger': ''" v-model="endDate">
                                <span :style="endDate ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">結算起始日期<br></p>
                            </div>
                            <div class="col">
                                <input class="shadow-none form-control w-100" type="date" :class="!settlementStartDate ? 'alert-danger': ''" v-model="settlementStartDate">
                                <span :style="settlementStartDate ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-4">
                                <p style="font-size: 24px;">結算結束日期<br></p>
                            </div>
                            <div class="col">
                                <input class="shadow-none form-control w-100" type="date" :class="!settlementEndDate ? 'alert-danger': ''" v-model="settlementEndDate">
                                <span :style="settlementEndDate ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" style="text-align: right;">
                                <button class="btn btn-primary shadow-none" type="button" @click="submitForm">
                                    <i class="fa fa-save"></i>
                                    &nbsp;保存
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <AlertBlock :message="message" />
    </div>
</template>

<script setup>
    import { createSubject } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { ref } from "vue"

    const message = ref("")
    const projectName = ref("")
    const year = ref("")
    const startDate = ref("")
    const endDate = ref("")
    const settlementStartDate = ref("")
    const settlementEndDate = ref("")

    const router = useRouter()

    async function submitForm() {
        if (!projectName.value || !year.value || !startDate.value || !endDate.value || !settlementStartDate.value || !settlementEndDate.value) {
            message.value = "未填必需項目"
            return
        }
        await createSubject(
            projectName.value,
            year.value,
            startDate.value,
            endDate.value,
            settlementStartDate.value,
            settlementEndDate.value
        )

        router.go(-1)
    }
</script>