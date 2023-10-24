<template>
    <div>
        <div class="card shadow">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name}}</p>
            </div>
            <div class="card-body">
                <div class="col">
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 30px;padding-left: 10px;">專案名稱</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 30px;color: rgb(38,38,38);">{{ subjectName }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 30px;padding-left: 10px;">年度</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 30px;color: rgb(38,38,38);">{{ year }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 30px;padding-left: 10px;">開始日期</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 30px;color: rgb(38,38,38);">{{ startDate }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 30px;padding-left: 10px;">結束日期</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 30px;color: rgb(38,38,38);">{{ endDate }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 30px;padding-left: 10px;">結算開始日期</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 30px;color: rgb(38,38,38);">{{ settlementStartDate }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 30px;padding-left: 10px;">結算結束日期</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 30px;color: rgb(38,38,38);">{{ settlementEndDate }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { getProjectInfo } from "@/assets/js/helper";
    import { useRouter } from "vue-router";
    import { ref, onMounted } from "vue";

    const router = useRouter()
    const routerSubjectUUID = router.currentRoute.value.params.subjectID

    const subjectName = ref("")
    const year = ref("")
    const startDate = ref("")
    const endDate = ref("")
    const settlementStartDate = ref("")
    const settlementEndDate = ref("")

    onMounted(async () =>{
        const info = await getProjectInfo(routerSubjectUUID)

        subjectName.value = info.subjectName
        year.value = info.year
        startDate.value = info.startDate
        endDate.value = info.endDate
        settlementStartDate.value = info.settlementStartDate
        settlementEndDate.value = info.settlementEndDate
    });
</script>