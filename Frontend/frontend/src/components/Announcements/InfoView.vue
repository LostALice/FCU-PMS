<template>
    <div>
        <div class="card shadow my-3">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col">
                        <p class="text-primary m-0 fw-bold" style="font-size: 28px;">{{ title }}</p>
                    </div>
                    <div class="col">
                        <p class="text-end text-secondary m-0 fw-bold">{{ date }}</p>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <iframe :srcdoc="context" class="h-100"></iframe>
                </div>
            <footer class="card-footer">
                <div class="row">
                    <div class="col text-end">
                        <p class="text-end text-secondary m-0 fw-bold">{{ author }}</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup>
    import { getAnnouncementInfo } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router";
    import { ref, onMounted } from "vue"

    const title = ref("")
    const date = ref("")
    const context = ref("")
    const author = ref("")

    const router = useRouter()
    const announcementUUID = router.currentRoute.value.params.announcementID

    onMounted(async () => {
        const announcementInfo = await getAnnouncementInfo(announcementUUID)

        title.value = announcementInfo.title
        date.value = announcementInfo.date
        context.value = announcementInfo.context
        author.value = announcementInfo.author
    })
</script>