// Code by AkinoAlice@Tyrant_Rex

import CryptoJS from "crypto-js"
import axios from "axios"

export function HashSHA256(str) {
    const hash = CryptoJS.SHA256(str)
    return hash.toString(CryptoJS.enc.Hex)
}

export function getJWTToken() {
    const token = localStorage["token"]
    const nid = localStorage["nid"]
    if (token == null & nid == null) {
        return false
    }
    else {
        return token
    }
}

export async function getProfileIconImage() {
    const nid = localStorage["nid"]

    return `${axios.defaults.baseURL}/getIconImages/${nid}`
}

export async function getPermissionLevel() {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getPermissionLevel", {
        params: {
            "nid": nid,
            "token": token,
        }
    })
    localStorage["permissionLevel"] = resp.data
    return resp.data
}

// login
export async function verifyLogin(nid, hashPassword) {
    const resp = await axios.get("/login/", {
        params: {
            "nid": nid,
            "password": hashPassword
        }
    })

    return resp.data
}

export async function verifyLoginTimeout() {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    if (nid == null || token == null || nid == "" || token == "") return false

    const resp = await axios.get("/TimeoutStatus", {
        params: {
            "nid": nid,
            "token": token,
        }
    })
    return resp.data
}

export async function JWTValidate() {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/JWTValidation", {
        params: {
            "nid": nid,
            "token": token,
        }
    })

    return resp.data
}

// subject
export async function createSubject(
    subjectName,
    year,
    startDate,
    endDate,
    settlementStartDate,
    settlementEndDate,
) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.post("/createSubject", null, {
        params: {
            "nid": nid,
            "token": token,
            "subjectName": subjectName,
            "year": year,
            "startDate": startDate,
            "endDate": endDate,
            "settlementStartDate": settlementStartDate,
            "settlementEndDate": settlementEndDate,
        }
    })

    return resp.data
}

export async function getSubject() {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getSubject",{
        params: {
            "nid": nid,
            "token": token,
        }
    })

    return resp.data
}

export async function deleteSubject(subjectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.delete("/deleteSubject", {
        data: {
            "nid": nid,
            "token": token,
            "subjectUUID": subjectUUID
        }
    })

    return resp.data
}

// project
export async function getProject(subjectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getProject", {
        params: {
            "nid": nid,
            "token": token,
            "subjectUUID": subjectUUID
        }
    })

    return resp.data
}

export async function createProject(subjectUUID, projectName) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.post("/createProject", null, {
        params: {
            "nid": nid,
            "token": token,
            "subjectUUID": subjectUUID,
            "projectName": projectName
        }
    })

    return resp.data
}

export async function deleteProject(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.delete("/deleteProject",{
        data: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
        }
    })

    return resp.data
}

export async function getProjectInfo(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getProjectInfo", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
        }
    })

    return resp.data
}

// announcement
export async function getAnnouncementData(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getAnnouncementData", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
        }
    })

    return resp.data
}

export async function newAnnouncement(projectUUID, title, context) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.post("/createAnnouncement", null, {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
            "title": title,
            "context": context
        }
    })

    return resp.data
}

export async function getAnnouncementInfo(announcementUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getAnnouncementInfo", {
        params: {
            "nid": nid,
            "token": token,
            "announcementUUID": announcementUUID,
        }
    })

    return resp.data
}

export async function deleteAnnouncement(projectUUID, announcementUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.delete("/deleteAnnouncement", {
        data: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
            "announcementUUID": announcementUUID
        }
    })

    return resp.data
}

// student
export async function getStudentData(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getStudentData", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
        }
    })

    return resp.data
}

export async function getStudentList(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getStudentList", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function newStudent(studentNID, projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.post("/newStudent", null, {
        params: {
            "nid": nid,
            "token": token,
            "studentNID": studentNID,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function getStudentInfo(studentNID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getStudentInfo", {
        "nid": nid,
        "token": token,
        "studentNID": studentNID
    })

    return resp.data
}

export async function deleteStudent(studentNID, projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.delete("/deleteStudent", {
        params: {
            "nid": nid,
            "token": token,
            "studentNID": studentNID,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function importStudent(projectUUID, file_) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    let xlsxData = new FormData();
    xlsxData.append("file_", file_);

    const resp = await axios.post("/importStudent", xlsxData, {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

// teacher
export async function getTeacherData(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getTeacherData", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function getTeacherList(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getTeacherList", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function newTeacher(teacherNID, projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.post("/newTeacher", null, {
        params: {
            "nid": nid,
            "token": token,
            "teacherNID": teacherNID,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function getTeacherInfo(teacherNID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getTeacherInfo", {
        "nid": nid,
        "token": token,
        "teacherNID": teacherNID
    })

    return resp.data
}

export async function deleteTeacher(teacherNID, projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.delete("/deleteTeacher", {
        data: {
            "nid": nid,
            "token": token,
            "teacherNID": teacherNID,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function importTeacher(projectUUID, file_) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    let xlsxData = new FormData();
    xlsxData.append("file_", file_);

    const resp = await axios.post("/importTeacher", xlsxData, {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

// groups
export async function getGroupData(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getGroupData", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function getGroupInfo(groupUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getGroupInfo/", {
        params: {
            "nid": nid,
            "token": token,
            "groupUUID": groupUUID
        }
    })

    return resp.data
}

export async function getGroupTeacherData(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getGroupTeacherData", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
        }
    })

    return resp.data
}

export async function getGroupStudentData(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getGroupStudentData", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
        }
    })

    return resp.data
}

export async function newGroup(projectUUID, member, group_name, GID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.post("/newGroup", null, {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
            "group_name": group_name,
            "member": member,
            "GID": GID
        }
    })

    return resp.data
}

export async function getGroupToken() {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getGroupToken", {
        params: {
            "nid": nid,
            "token": token,
        }
    })

    return resp.data
}

export async function deleteGroup(GID, projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.delete("/deleteGroup", {
        data: {
            "nid": nid,
            "token": token,
            "GID": GID,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function getAssignment(projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getAssignment", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID
        }
    })

    return resp.data
}

export async function deleteAssignment(assignmentUUID, projectUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.delete("/deleteAssignment", {
        data: {
            "nid": nid,
            "token": token,
            "assignmentUUID": assignmentUUID,
            "projectUUID": projectUUID,
        }
    })

    return resp.data
}

export async function getAssignmentInfo(projectUUID, assignmentUUID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getAssignmentInfo", {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
            "assignmentUUID": assignmentUUID,
        }
    })

    return resp.data
}

export async function downloadAssignment(projectUUID, taskUUID, fileID) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/downloadAssignment", {
        params: {
            "nid": nid,
            "token": token,
            "fileID": fileID,
            "taskUUID": taskUUID,
            "projectUUID": projectUUID,
        },
        responseType: "blob",
    })
    return resp.data
}

export async function markAssignmentScore(taskUUID, projectUUID, marks) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.post("/markAssignmentScore", null, {
        params: {
            "nid": nid,
            "token": token,
            "taskUUID": taskUUID,
            "projectUUID": projectUUID,
            "marks": marks
        }
    })
    return resp.data
}

export async function newAssignment(projectUUID, gid, name, weight, date) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.post("/newAssignment", null, {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
            "gid": gid,
            "name": name,
            "weight": weight,
            "date": date,
        }
    })
    return resp.data
}

export async function uploadAssignment(projectUUID, taskUUID, filename, file_) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    let formData = new FormData();
    formData.append("file_", file_);

    const resp = await axios.post("/uploadAssignment", formData, {
        params: {
            "nid": nid,
            "token": token,
            "projectUUID": projectUUID,
            "taskUUID": taskUUID,
            "filename": filename,
        }
    })
    return resp.data
}

export async function deleteAssignmentItem(taskUUID, fileUUID, author) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.delete("/deleteAssignmentItem/", {
        data: {
            "nid": nid,
            "token": token,
            "taskUUID": taskUUID,
            "fileUUID": fileUUID,
            "author": author,
        }
    })

    return resp.data
}

// Profile
export async function changePassword_(oldPassword, newPassword) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.post("/changePassword", null, {
        params: {
            "nid": nid,
            "token": token,
            "oldPassword": oldPassword,
            "newPassword": newPassword
        }
    })
    return resp.data
}

export async function changeIcon(file_, filename) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    let formData = new FormData();
    formData.append("file_", file_);

    const resp = await axios.post("/changeIcon", formData, {
        params: {
            "nid": nid,
            "token": token,
            "filename": filename
        }
    })
    return resp.data
}

// dashboard
export async function getDeadlineProject() {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getDeadlineProject/", {
        params: {
            "nid": nid,
            "token": token,
        }
    })

    return resp.data
}

// Administration
export async function getLog() {
    const nid = localStorage["nid"]
    const token = localStorage["token"]

    const resp = await axios.get("/getLogs", {
        params: {
            "nid": nid,
            "token": token,
        }
    })

    return resp.data
}

export async function forceChangePassword(target_nid, password) {
    const nid = localStorage["nid"]
    const token = localStorage["token"]
    console.log(target_nid, password)
    const resp = await axios.post("/forceChangePassword", null, {
        params: {
            "nid": nid,
            "token": token,
            "target_nid": target_nid,
            "password": password,
        }
    })

    return resp.data
}