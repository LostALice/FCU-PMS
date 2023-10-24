<template>
    <div>
        <form>
            <div class="card shadow my-3">
                <div class="card-header pt-3">
                    <div class="row">
                        <div class="col">
                            <input class="form-control w-100 shadow-none" type="text" placeholder="標題" v-model="title">
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <div class="btn-group" role="group">
                                <button class="btn btn-primary shadow-none" type="button" @click="bold">
                                    <i class="fa fa-bold"></i>
                                </button>
                                <button class="btn btn-primary shadow-none" type="button"  @click="italic">
                                    <i class="fa fa-italic"></i>
                                </button>
                                <button class="btn btn-primary shadow-none" type="button"  @click="strikethrough">
                                    <i class="fa fa-strikethrough"></i>
                                </button>
                                <button class="btn btn-primary shadow-none" type="button"  @click="underline">
                                    <i class="fa fa-underline"></i>
                                </button>
                            </div>
                            <div class="btn-group" role="group">
                                <button class="btn btn-primary shadow-none" type="button" @click="image">
                                    <i class="fa fa-image"></i>
                                </button>
                                <button class="btn btn-primary shadow-none" type="button" @click="url">
                                    <i class="fa fa-link"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col" style="text-align: right;">
                            <div class="btn-group" role="group">
                                <button class="btn btn-primary shadow-none" @click="submitEvent"><i class="fa fa-save"></i>
                                    &nbsp; 儲存
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <hr>
                            <div class="row">
                                <div class="col">
                                    <textarea
                                        class="form-control shadow-none"
                                        rows="19"
                                        v-model="context"
                                        placeholder="編輯器支持HTML 語法&#10;圖片 <img src=&quot;圖片網址&quot;></img>&#10;連結 <a href=&quot;網址&quot;></a>"
                                        ref="ta"
                                        @keypress.enter="onEnter">
                                    </textarea>
                                </div>
                                <div class="col border border-gray rounded">
                                    <iframe :srcdoc="context" class="h-100"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <AlertBlock :message="message" />
    </div>
</template>

<script>
    export default {
        methods: {
            underline() {
                let textarea = this.$refs.ta
                let cursorPositionStart = textarea.selectionStart
                let cursorPositionEnd = textarea.selectionEnd
                let textLength = textarea.value.length
                textarea.value = textarea.value.substring(0, cursorPositionStart) +
                    `<u>${textarea.value.substring(cursorPositionStart, cursorPositionEnd)}</u> ` +
                    textarea.value.substring(cursorPositionEnd, textLength);
                this.$refs.ta.focus()
            },
            strikethrough() {
                let textarea = this.$refs.ta
                let cursorPositionStart = textarea.selectionStart
                let cursorPositionEnd = textarea.selectionEnd
                let textLength = textarea.value.length
                textarea.value = textarea.value.substring(0, cursorPositionStart) +
                    `<s>${textarea.value.substring(cursorPositionStart, cursorPositionEnd)}</s> ` +
                    textarea.value.substring(cursorPositionEnd, textLength);

                this.$refs.ta.focus()
            },
            italic() {
                let textarea = this.$refs.ta
                let cursorPositionStart = textarea.selectionStart
                let cursorPositionEnd = textarea.selectionEnd
                let textLength = textarea.value.length
                textarea.value = textarea.value.substring(0, cursorPositionStart) +
                    `<i>${textarea.value.substring(cursorPositionStart, cursorPositionEnd)}</i> ` +
                    textarea.value.substring(cursorPositionEnd, textLength);
                this.$refs.ta.focus()
            },
            bold() {
                let textarea = this.$refs.ta
                let cursorPositionStart = textarea.selectionStart
                let cursorPositionEnd = textarea.selectionEnd
                let textLength = textarea.value.length
                textarea.value = textarea.value.substring(0, cursorPositionStart) +
                    `<b>${textarea.value.substring(cursorPositionStart, cursorPositionEnd)}</b> ` +
                    textarea.value.substring(cursorPositionEnd, textLength);
                this.$refs.ta.focus()
            },
            image() {
                let textarea = this.$refs.ta
                let cursorPositionStart = textarea.selectionStart
                let cursorPositionEnd = textarea.selectionEnd
                let textLength = textarea.value.length
                textarea.value = textarea.value.substring(0, cursorPositionStart) +
                    `<img src="${textarea.value.substring(cursorPositionStart, cursorPositionEnd)}"></img> ` +
                    textarea.value.substring(cursorPositionEnd, textLength);
                this.$refs.ta.focus()
            },
            url() {
                let textarea = this.$refs.ta
                let cursorPositionStart = textarea.selectionStart
                let cursorPositionEnd = textarea.selectionEnd
                let textLength = textarea.value.length
                textarea.value = textarea.value.substring(0, cursorPositionStart) +
                    `<a href="${textarea.value.substring(cursorPositionStart, cursorPositionEnd)}" target="_blank">${textarea.value.substring(cursorPositionStart, cursorPositionEnd)}</a> ` +
                    textarea.value.substring(cursorPositionEnd, textLength);
                this.$refs.ta.focus()
            },
            onEnter() {
                let textarea = this.$refs.ta
                textarea.value += "<br>"
            },
            submitEvent() {

            }
        }
    }
</script>

<script setup>
    import { newAnnouncement } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router";
    import { ref } from "vue"

    const message = ref("")
    const context = ref("")
    const title = ref("")
    const router = useRouter()
    const projectUUID = router.currentRoute.value.params.projectID

    async function submitEvent() {
        if (title.value == "") {
            message.value = "標題不能為空"
            return
        }
        const resp = await newAnnouncement(projectUUID, title.value, context.value)
        if (resp.status_code == 200) {
            router.push(`/project/${projectUUID}/announcement`)
        }
        router.push(`/project/${projectUUID}/announcement`)
    }
</script>