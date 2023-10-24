<template>
    <div>
        <div class="row">
            <div class="col">
                <div class="card shadow my-3">
                    <div class="card-header py-3">
                        <h6 class="text-primary fw-bold m-0" style="font-size: 24px;">作業截止</h6>
                    </div>
                    <div class="card-body">
                        <div class="row align-items-center no-gutters">
                            <div class="col me-2">
                                <div class="text-uppercase text-primary fw-bold mb-1"><span>作業名稱</span></div>
                                <div class="text-dark fw-bold h5 mb-0" v-if="deadlineProject.length > 0">
                                    <router-link :to="`/project/${deadlineProject.PROJECT_ID}/assignment`">
                                        <span class="alert-warning">{{ deadlineProject.NAME }}</span>
                                    </router-link>
                                </div>
                                <div class="text-dark fw-bold h5 mb-0" v-else>
                                    <span>沒有作業</span>
                                </div>
                            </div>
                            <div class="col me-2" v-if="deadlineProject.length > 0">
                                <div class="text-uppercase text-primary fw-bold mb-1"><span>作業截止日期</span></div>
                                <div class="text-dark fw-bold h5 mb-0">
                                    <span>{{ deadlineProject.SUBMISSION_DATE }}</span>
                                </div>
                            </div>
                            <div class="col me-2" v-else>
                                <div class="text-uppercase text-primary fw-bold mb-1"><span>作業截止日期</span></div>
                                <div class="text-dark fw-bold h5 mb-0">
                                    <span>沒有截止日期</span>
                                </div>
                            </div>
                            <div class="col-auto"><i class="fas fa-calendar fa-2x text-gray-300"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row" v-if="deadlineProject.length > 0">
            <div class="col">
                <div class="card shadow my-3">
                    <div class="card-header py-3">
                        <h6 class="text-primary fw-bold m-0" style="font-size: 24px;">即將繳交的作業</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 text-nowrap">
                            </div>
                            <div class="col-md-6">
                                <div class="text-md-end dataTables_filter" id="dataTable_filter">
                                    <label class="form-label">
                                        <input type="search" class="form-control form-control-sm" aria-controls="dataTable" placeholder="Search">
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                            <EasyDataTable :headers="headers" :items="projectList" table-class-name="customize-table" show-index>
                                <template #item-NAME="item">
                                    <router-link :to="`/project/${deadlineProject.PROJECT_ID}/assignment`">{{ item.NAME }} </router-link>
                                </template>
                            </EasyDataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { getDeadlineProject } from "@/assets/js/helper.js"
    import { ref, onMounted } from "vue"
    import "vue3-easy-data-table";

    const deadlineProject = ref({})
    const projectList = ref([])

    const headers = [
        {
            text: "作業標題",
            value: "NAME",
            sortable: true
        },
        {
            text: "截止日期",
            value: "SUBMISSION_DATE",
            sortable: true
        },
    ]

    onMounted(async () => {
        const project = await getDeadlineProject()
        if (!Array.isArray(project.data)) {
            return
        }
        for (const i of project.data) {
            i.SUBMISSION_DATE = i.SUBMISSION_DATE.replace("T", " ")
            projectList.value.push(i)
        }
        deadlineProject.value = projectList.value[0]
    })
</script>