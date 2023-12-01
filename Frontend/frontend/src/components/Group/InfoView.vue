<template>
    <div>
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <p class="text-primary m-0 fw-bold" style="font-size: 28px;">Group&nbsp;Info</p>
            </div>
            <div class="card-body">
                <div class="col">
                    <div class="row">
                        <div class="col justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">小組名稱</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{name}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">教授人數</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ countTeacher }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">教授</p>
                        </div>
                        <div class="col">
                            <div v-for="(item, index) in teacher" :key="index">
                                <router-link style="font-size: 24px;" :to="`/about/${item[1]}`">{{ item[0] }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">學生人數</p>
                        </div>
                        <div class="col">
                            <p style="font-size: 24px;color: rgb(38,38,38);">{{ countStudent }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col justify-content-center">
                            <p style="font-size: 24px;padding-left: 10px;">學生</p>
                        </div>
                        <div class="col">
                            <div v-for="(item, index) in student" :key="index">
                                <router-link style="font-size: 24px;" :to="`/about/${item[1]}`">{{ item[0] }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { getGroupInfo } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { onMounted } from "vue"
    import { ref } from "vue"

    const router = useRouter()
    const groupUUID = router.currentRoute.value.params.groupID
    console.log(groupUUID)

    const name = ref("")
    const countTeacher = ref(0)
    const countStudent = ref(0)
    const teacher = ref([])
    const student = ref([])

    onMounted(async () => {
        const groupInfo =  await getGroupInfo(groupUUID)
        name.value = groupInfo.name
        teacher.value = groupInfo.teacher
        countTeacher.value = groupInfo.countTeacher
        student.value = groupInfo.student
        countStudent.value = groupInfo.countStudent

    })

</script>