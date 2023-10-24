// Code by AkinoAlice@Tyrant_Rex

import { createRouter, createWebHashHistory } from "vue-router"

// using dynamic routes
const routes = [
    // login page
    {
        path: "/",
        name: "Login",
        redirect: "/login",
        component: () => import("@/components/LoginView.vue")
    },
    {
        path: "/login",
        name: "登入",
        component: () => import("@/components/LoginView.vue")
    },
    // Dashboard page
    {
        path: "/dashboard",
        name: "儀表板",
        component: () => import("@/components/DashboardView.vue"),
    },
    // Profile page
    {
        path: "/profile",
        name: "個人資料",
        component: () => import("@/components/ProfileView.vue"),
    },
    // Teacher page
    {
        path: "/project/:projectID/teacher",
        name: "教授",
        component: () => import("@/components/Teacher/PanelView.vue"),
    },
    {
        path: "/project/:projectID/teacher/import",
        name: "導入教授",
        component: () => import("@/components/Teacher/ImportView.vue"),
    },
    {
        path: "/project/:projectID/teacher/info/:teacherID",
        name: "教授資訊",
        component: () => import("@/components/Teacher/InfoView.vue"),
    },
    {
        path: "/project/:projectID/teacher/new",
        name: "新增教授",
        component: () => import("@/components/Teacher/NewView.vue"),
    },
    // Subject page
    {
        path: "/subject",
        name: "專案",
        component: () => import("@/components/Subject/PanelView.vue"),
    },
    {
        path: "/subject/new",
        name: "新增專案",
        component: () => import("@/components/Subject/NewView.vue"),
    },
    // Group page
    {
        path: "/project/:projectID/group",
        name: "小組",
        component: () => import("@/components/Group/PanelView.vue"),
    },
    {
        path: "/project/:projectID/group/new",
        name: "新增小組",
        component: () => import("@/components/Group/NewView.vue"),
    },
    {
        path: "/project/:projectID/group/info/:groupID",
        name: "小組資訊",
        component: () => import("@/components/Group/InfoView.vue"),
    },
    // Announcements page
    {
        path: "/project/:projectID/announcement",
        name: "公告",
        component: () => import("@/components/Announcements/PanelView.vue"),
    },
    {
        path: "/project/:projectID/announcement/new",
        name: "新增公告",
        component: () => import("@/components/Announcements/NewView.vue"),
    },
    {
        path: "/project/:projectID/announcement/info/:announcementID",
        name: "公告內容",
        component: () => import("@/components/Announcements/InfoView.vue"),
    },
    // Assignment page
    {
        path: "/project/:projectID/assignment",
        name: "作業",
        component: () => import("@/components/Assignment/PanelView.vue"),
    },
    {
        path: "/project/:projectID/assignment/new",
        name: "新增作業",
        component: () => import("@/components/Assignment/NewView.vue"),
    },
    {
        path: "/project/:projectID/assignment/info/:assignmentID",
        name: "作業資訊",
        component: () => import("@/components/Assignment/InfoView.vue"),
    },
    {
        path: "/project/:projectID/assignment/:assignmentID/submit",
        name: "繳交作業",
        component: () => import("@/components/Assignment/SubmitView.vue"),
    },
    // project page
    {
        path: "/project/:subjectID",
        name: "項目",
        component: () => import("@/components/Subject/Project/PanelView.vue"),
    },
    {
        path: "/project/:subjectID/new",
        name: "新增項目",
        component: () => import("@/components/Subject/Project/NewView.vue"),
    },
    {
        path: "/project/info/:subjectID",
        name: "項目內容",
        component: () => import("@/components/Subject/Project/InfoView.vue"),
    },
    // Student page
    {
        path: "/project/:projectID/student",
        name: "學生",
        component: () => import("@/components/Student/PanelView.vue"),
    },
    {
        path: "/project/:projectID/student/info/:studentID",
        name: "學生資訊",
        component: () => import("@/components/Student/InfoView.vue"),
    },
    {
        path: "/project/:projectID/student/import",
        name: "導入學生",
        component: () => import("@/components/Student/ImportView.vue"),
    },
    {
        path: "/project/:projectID/student/new",
        name: "新增學生",
        component: () => import("@/components/Student/NewView.vue"),
    },
    // Administration
    {
        path: "/admin",
        redirect: "/admin/logging",
    },
    {
        path: "/admin/logging",
        name: "記錄",
        component: () => import("@/components/Administration/LoggingView.vue"),
    },
    {
        path: "/admin/password",
        name: "更改密碼",
        component: () => import("@/components/Administration/PasswordView.vue"),
    },
    // 404 page
    {
        path: "/404",
        name: "404 Not Found",
        component: () => import("@/components/404View.vue"),
    },
    // 403 page
    {
        path: "/403",
        name: "403 Forbidden",
        component: () => import("@/components/403View.vue"),
    },
    // 404
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
        name: "Error",
        component: () => import("@/components/404View.vue"),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
