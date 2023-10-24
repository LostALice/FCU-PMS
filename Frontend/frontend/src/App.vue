<!-- #Code by AkinoAlice@Tyrant_Rex -->
<template>
    <div id="wrapper">
        <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div class="container-fluid d-flex flex-column p-0">
                <router-link class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
                    to="/dashboard">
                    <div class="sidebar-brand-text mx-3">
                        <span style="font-size: 15px;">
                            <strong>逢甲大學專題管理系統</strong><br>
                        </span>
                    </div>
                </router-link>

                <hr class="sidebar-divider my-0">
                <ul class="navbar-nav text-light" id="accordionSidebar">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/dashboard">
                            <i class="fas fa-tachometer-alt" style="font-size: 20px;"></i>
                            <span style="font-size: 14px;">儀表板</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/subject">
                            <i class="fas fa-table" style="font-size: 20px;"></i>
                            <span style="font-size: 14px;">專案</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/profile">
                            <i class="fas fa-user" style="font-size: 20px;"></i>
                            <span style="font-size: 14px;">個人資料</span>
                        </router-link>
                    </li>
                </ul>
                <hr class="sidebar-divider my-0">
            </div>
        </nav>
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content" class="scrollbar scrollbar-primary">
                <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                    <div class="container-fluid">
                        <ul class="navbar-nav flex-nowrap ms-auto">
                            <li class="nav-item dropdown no-arrow">
                                <div class="nav-item dropdown no-arrow">
                                    <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown"
                                        href="#">
                                        {{ nid }}&nbsp;&nbsp;
                                        <img class="border rounded-circle img-profile" :src="imageURL"></a>
                                    <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                                        <router-link class="dropdown-item" to="/profile">
                                            <i class="fas fa-user fa-sm fa-fw me-2 text-gray-400">
                                            </i>個人資料
                                        </router-link>
                                        <div class="dropdown-divider">
                                        </div>
                                        <a class="dropdown-item" @click="logout">
                                            <i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400">
                                            </i>登出
                                        </a>
                                        <div v-if="permissionLevel>=3">
                                            <div class="dropdown-divider alert-warning">
                                            </div>
                                            <router-link class="dropdown-item alert-warning" to="/admin/logging">
                                                <i class="icon ion-locked">
                                                </i>&nbsp;&nbsp;Loggings
                                            </router-link>
                                            <div class="dropdown-divider alert-warning">
                                            </div>
                                            <router-link class="dropdown-item alert-warning" to="/admin/password">
                                                <i class="icon ion-locked">
                                                </i>&nbsp;&nbsp;Force Change Password
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="container-fluid">
                    <div>
                        <div class="d-sm-flex justify-content-between align-items-center mb-4">
                            <h3 class="text-dark mb-0" style="font-size: 36px;">{{ $route.name }}<br></h3>
                        </div>
                        <hr>
                    </div>
                    <div v-if="!FixedTop">
                        <router-view v-slot="{ Component }">
                            <transition name="fade" mode="out-in">
                                <component :is="Component" />
                            </transition>
                        </router-view>
                    </div>
                </div>
            </div>
            <footer class="bg-white sticky-footer" style="height: 45px;">
                <div class="container my-auto">
                    <div class="text-center my-auto copyright">
                        <span style="font-style: italic;">Copyright © Aki.no.Alice@TyrantRey 2023</span>
                    </div>
                </div>
            </footer>
        </div>
        <AlertBlock :message="message" />
    </div>
</template>

<script setup>
    import { verifyLoginTimeout, getProfileIconImage } from "@/assets/js/helper.js"
    import { useRouter } from "vue-router"
    import { watch, ref } from "vue"

    const nid = ref(localStorage["nid"])
    const FixedTop = ref(false)
    const imageURL = ref("")
    const message = ref("")
    const permissionLevel = ref(localStorage["permissionLevel"])

    const router = useRouter()
    watch(() => router.currentRoute.value.path, async (path) => {
        nid.value = localStorage["nid"]

        imageURL.value = await getProfileIconImage()
        if (path == "/" || path == "/login") {
            return
        }
        const timeout = await verifyLoginTimeout()

        if (timeout.timeout == true) {
            router.replace("/login")
            alert("連線逾時")
            message.value = "連線逾時"
        }

        const sp_page = ["/", "/login", "/404", "/403"]

        if (sp_page.includes(path)) {
            FixedTop.value = false
        }

    }, {
        immediate: true, deep: true
    },)

    function logout() {
        localStorage.clear()
        router.replace("/login")
    }
</script>

<style>
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.1s ease-out;
    }

    .customize-table {
        --easy-table-header-font-size: 24px;
        --easy-table-body-row-font-size: 18px;
    }

    .input_container {
        border: 1px solid #e5e5e5;
    }

    input[type=file]::file-selector-button {
        background-color: #fff;
        color: #000;
        border: 0px;
        border-right: 1px solid #e5e5e5;
        padding: 10px 15px;
        margin-right: 20px;
        transition: .5s;
    }

    input[type=file]::file-selector-button:hover {
        background-color: #eee;
        border: 0px;
        border-right: 1px solid #e5e5e5;
    }
</style>
