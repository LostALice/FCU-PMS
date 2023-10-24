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
                                <p style="font-size: 24px;">項目名稱</p>
                            </div>
                            <div class="col">
                                <input class="shadow-none form-control w-100" type="text" :class="!projectName ? 'alert-danger': ''" v-model="projectName">
                                <span :style="projectName ? 'visibility:hidden': ''" class="tooltiptext">*必需項目</span>

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
    import { createProject } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router";
    import { ref } from "vue"

    const projectName = ref("")
    const router = useRouter()
    const message = ref("")

    const subjectUUID = router.currentRoute.value.params.subjectID

    async function submitForm() {
        if (!projectName.value) {
            message.value = "名稱不能為空"
            return
        }
        await createProject(
            subjectUUID,
            projectName.value,
        )

        router.go(-1)
    }
</script>

