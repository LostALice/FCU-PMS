<template>
    <div>
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ $route.name }}</p>
            </div>
            <div class="card-body">
                <div class="col">
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">NID</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ nid }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">姓名</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ name }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-4 justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">權限等級</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ permission }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { ref, onMounted } from "vue"
    import { getStudentInfo } from "@/assets/js/helper.js"

    const router = useRouter()
    const nid = router.currentRoute.value.params.studentID
    const name = ref("")
    const permission = ref("")
    const permissionName = {
            1: "學生",
            2: "教授",
            3: "管理員",
        }

    onMounted(async () => {
        const info = await getStudentInfo(nid)
        name.value = info.name
        permission.value = permissionName[info.permission]
  })
</script>