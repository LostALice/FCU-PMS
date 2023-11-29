# Code by AkinoAlice@Tyrant_Rex

# Docs (in debug mode): https://{api.url.com}/docs/

from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pandas import read_excel, notnull
from setup import SettingSetupHandler
from shutil import copyfileobj
from inspect import stack

from authenticate import AUTHENTICATION
from handler import SQLHandler, LOGGER
from permission import PERMISSION

import datetime
import hashlib
import json
import uuid
import os

try:
    assert os.path.exists("./setting.json")
except AssertionError:
    SettingSetupHandler().file_setup()

with open("./setting.json", "r") as f:
    json_file = json.load(f)
    DEBUG = json_file["debug"]

app = FastAPI(debug=DEBUG)

# CORS config
# i dont care about the cors attack. yes indeed, none of my business
ALLOW_ORIGINS = json_file["CORS"]["ALLOW_ORIGINS"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", status_code=200)
async def get_test(data: str = "None"):
    return {
        "data": data,
    }


@app.post("/", status_code=200)
async def post_test(data: str = "None"):
    return {
        "data": data,
    }

# login api


@app.get("/login/", status_code=200)
async def login(nid: str, password: str):
    """login api

    Args:
        nid (str): NID
        password (str): Password

    Returns:
        access: [bool] allow access or not
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token = access.authenticate(nid, password)
    if token["authenticate"]:
        return {
            "access": True,
            "token": token,
        }
    else:
        return {
            "access": False,
        }


@app.get("/logout/", status_code=200)
async def logout(nid: str, token: str):
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    success = access.logout(nid, token)
    if success:
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }

# token validation


@app.get("/getPermissionLevel/", status_code=200)
async def getPermissionLevel(nid: str, token: str) -> int:
    """get user permission level

    Args:
        nid (str): NID
        token (str): jwt token

    Returns:
        permission_level: [int] user permission level from 1-3
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [nid, token]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    return PERMISSION(nid).get_levels()


@app.get("/JWTValidation/", status_code=200)
async def JWTValidation(nid: str, token: str):
    """api of JWT validation

    Args:
        nid (str): NID
        token (str): JWT

    Returns:
        access: [bool] the succession of jwt validation
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [nid, token]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)

    if token_validation:
        return {
            "access": True,
            "token": token,
        }
    else:
        return {
            "access": False,
        }


@app.get("/TimeoutStatus/", status_code=200)
async def TimeoutStatus(nid: str, token: str):
    """Check if the jwt expired or not

    Args:
        nid (str): NID
        token (str): jwt

    Returns:
        timeout: [bool] timed out or not
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [nid, token]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    timeout = access.verify_timeout(nid, token)

    if not all([token_validation, timeout]):
        return {
            "status_code": 403,
            "timeout": True
        }
    return {
        "status_code": 200,
        "timeout": False
    }

# Administration


@app.get("/getLogs/", status_code=200)
def getLog(nid: str, token: str):
    """Log history

    Args:
        nid (str): NID
        token (str): jwt

    Returns:
        record: [
            tuple[time[str], event[str],args[tuple]]
        ] a tuple of log
        e.g. 2023-11-25 11:57:57.653000[time] getPermission[event] ('D1234567',)[args]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [nid, token]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    return LOGGER().record()


@app.post("/forceChangePassword/", status_code=200)
def forceChangePassword(nid: str, token: str, target_nid: str, password: str):
    """Admin API to force change password

    Args:
        nid (str): NID
        token (str): jwt
        target_nid (str): the motherfucker who forget the password
        password (str): the motherfucker's new password

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [target_nid, password]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    if access.forceChangePassword(target_nid, password):
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 400
        }

# admin


@app.post("/importUsers/", status_code=200)
def importUsers(nid: str, token: str, file_: UploadFile):
    """Admin API to add users to database

    Args:
        nid (str): NID
        token (str): jwt
        file_ (UploadFile): the xlsx file to import

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    with open("./temp/tempUser.temp", "wb+") as f:
        copyfileobj(file_.file, f)

    df = read_excel("./temp/tempUser.temp")
    df = df.where(notnull(df), None)
    user_data = df.to_dict("records")

    permission_map = {
        "D": 1,
        "T": 2,
    }
    for i in user_data:
        record = i
        record["PERMISSION"] = permission_map[record["NID"][0]]

        hashed_password = hashlib.sha256(
            record["PASSWORD"].encode("utf-8")).hexdigest()
        record["PASSWORD"] = AUTHENTICATION().add_salt(
            record["NID"], hashed_password)

        if not SQLHandler().importUsers(record):
            return HTTPException(400, record)

    return {
        "status_code": 200,
    }

# Subject


@app.get("/getSubject/", status_code=200)
def getSubject(nid: str, token: str):
    """Get subject items

    Args:
        nid (str): NID
        token (str): jwt

    Returns:
        subject_data_list: [
            dict[
                "subjectUUID": [str]
                "name": [str]
                "year": [int]
                "startDate": [datetime|str]
                "endDate": [datetime|str]
                "settlementStartDate": [datetime|str]
                "settlementEndDate": [datetime|str]
            ]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    subject_data = SQLHandler().getSubjectData(nid)
    data_ = []
    if subject_data or subject_data == []:
        for i in subject_data:
            data_.append({
                "subjectUUID": i[0],
                "name": i[1],
                "year": i[2],
                "startDate": i[3],
                "endDate": i[4],
                "settlementStartDate": i[5],
                "settlementEndDate": i[6],
            })
        return data_
    else:
        return HTTPException(status_code=500, detail="No data available")


@app.post("/createSubject/", status_code=200)
def createSubject(
        nid: str,
        token: str,
        subjectName: str,
        year: int,
        startDate: str,
        endDate: str,
        settlementStartDate: str,
        settlementEndDate: str):
    """Create a new subject

    Args:
        nid (str): NID
        token (str): jwt
        subjectName (str): name of the subject
        year (int): subject year
        startDate (str): subject starts date
        endDate (str):  subject ends date
        settlementStartDate (str): subject settlement starts date
        settlementEndDate (str): subject settlement ends date

    Returns:
        subjectUUID: the uuid of the subject
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    for i in [subjectName, year, startDate, endDate, settlementStartDate, settlementEndDate]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    subjectData = {
        "subjectUUID": str(uuid.uuid4()),
        "projectUUID": str(uuid.uuid4()),
        "subjectName": subjectName,
        "year": year,
        "startDate": startDate,
        "endDate": endDate,
        "settlementStartDate": settlementStartDate,
        "settlementEndDate": settlementEndDate,
        "nid": nid
    }

    if SQLHandler().createSubjectData(subjectData):
        return {
            "status_code": 200,
            "subjectUUID": subjectData["subjectUUID"]
        }
    else:
        return {
            "status_code": 500
        }


@app.delete("/deleteSubject", status_code=200)
def deleteSubject(nid: str, token: str, subjectUUID: str):
    """delete a subject

    Args:
        nid (str): NID
        token (str): jwt
        subjectUUID (str): delete target

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    if not AUTHENTICATION().SQLInjectionCheck(prompt=subjectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }
    success = SQLHandler().deleteSubjectData(subjectUUID)
    if success:
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }

# project


@app.get("/getProject/", status_code=200)
def getProject(nid: str, token: str, subjectUUID: str):
    """get project items

    Args:
        nid (str): NID
        token (str): jwt
        subjectUUID (str): target subjectUUID

    Returns:
        project_list: [
            dict[
                "name": [str]
                "announcements": [str]
                "student": [str]
                "teacher": [str]
                "group": [str]
                "assignment": [str]
                "projectID": [str]
            ]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [subjectUUID]:
        if not access.SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    projectData = {
        "subjectUUID": subjectUUID,
        "NID": nid
    }

    project_data = SQLHandler().getProjectData(projectData)
    if project_data or project_data == []:
        data_ = []

        for i in zip(
            project_data["name"],
            project_data["announcements"],
            project_data["student"],
            project_data["teacher"],
            project_data["group"],
            project_data["assignment"],
            project_data["projectID"],
        ):
            data_.append(
                {
                    "name": i[0][0],
                    "announcements": i[1][0],
                    "student": i[2][0],
                    "teacher": i[3][0],
                    "group": i[4][0],
                    "assignment": i[5][0],
                    "projectID": i[6][0],
                }
            )
        return data_
    else:
        return {
            "status_code": 500
        }


@app.post("/createProject", status_code=200)
def createProject(nid: str, token: str, subjectUUID: str, projectName: str):
    """Create a new project from a subject

    Args:
        nid (str): NID
        token (str): jwt token
        subjectUUID (str): subjectUUID
        projectName (str): name of the project

    Returns:
        status_code: [int] status code
        projectUUID: [str] projectUUID
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    for i in [subjectUUID, projectName]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    params = {
        "subjectUUID": subjectUUID,
        "projectUUID": str(uuid.uuid4()),
        "projectName": projectName,
        "nid": nid,
    }
    if SQLHandler().createProjectData(params):
        return {
            "status_code": 200,
            "projectUUID": params["projectUUID"],
        }
    else:
        return {
            "status_code": 500
        }


@app.delete("/deleteProject/", status_code=200)
def deleteProject(nid: str, token: str, projectUUID: str):
    """delete target project

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): project uuid

    Returns:
        status_code: [int] status
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    success = SQLHandler().deleteProjectData(projectUUID)
    if success:
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.get("/getProjectInfo/", status_code=200)
def getProjectInfo(nid: str, token: str, projectUUID: str):
    """get project info

    Args:
        nid (str): NID
        token (str): TOKEN
        projectUUID (str): projectUUId

    Returns:
        project_list: [
            dict[
                "subjectUUID": [str]
                "subjectName": [str]
                "year": [int]
                "startDate": [datetime]
                "endDate": [datetime]
                "settlementStartDate": [datetime]
                "settlementEndDate": [datetime]
            ]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    projectInfo = SQLHandler().getProjectInfo(projectUUID)
    data = {
        "subjectUUID": projectInfo[0],
        "subjectName": projectInfo[1],
        "year": projectInfo[2],
        "startDate": projectInfo[3],
        "endDate": projectInfo[4],
        "settlementStartDate": projectInfo[5],
        "settlementEndDate": projectInfo[6],
    }
    return data

# student


@app.get("/getStudentData/", status_code=200)
def getStudentData(nid: str, token: str, projectUUID: str):
    """get student items

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID

    Returns:
        students_list: [
            nid: [str]
            name: [str]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    studentData = SQLHandler().getStudentData(projectUUID)
    if studentData or studentData == []:
        data = []
        for i in studentData:
            data.append({
                "nid": i[0],
                "name": i[1],
            })
        return data
    else:
        return {
            "status_code": 500,
        }


@app.get("/getStudentList/", status_code=200)
def getStudentList(nid: str, token: str, projectUUID: str):
    """get student list for add new student

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID

    Returns:
        students_list: [
            nid: [str]
            name: [str]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    studentList = SQLHandler().getStudentList()
    data = []
    if studentList or studentList == []:
        for i in studentList:
            data.append({
                "nid": i[0],
                "name": i[1]
            })
        return data
    else:
        return {
            "status_code": 500
        }


@app.post("/newStudent", status_code=200)
def newStudent(nid: str, token: str, projectUUID: str, studentNID: str):
    """add new student to project

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID
        studentNID (str): student NID

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")
    for i in [projectUUID, studentNID]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }
    params = {
        "nid": studentNID,
        "projectUUID": projectUUID,
    }
    success = SQLHandler().newStudent(params)
    if success:
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.delete("/deleteStudent/", status_code=200)
def deleteStudent(nid: str, token: str, studentNID: str, projectUUID: str):
    """delete target student

    Args:
        nid (str): NID
        token (str): jwt
        studentNID (str): target student NID
        projectUUID (str): projectUUID

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [studentNID, projectUUID]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")
    params = {
        "nid": studentNID,
        "projectUUID": projectUUID
    }
    if SQLHandler().deleteStudent(params):
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.get("/getStudentInfo/", status_code=200)
def getStudentInfo(nid: str, token: str, studentNID: str):
    """get target student information

    Args:
        nid (str): NID
        token (str): jwt
        studentNID (str): target student NID

    Returns:
        name: [str] name of the student
        permission: [int] permission level 1-3
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=studentNID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    studentInfo = SQLHandler().getStudentInfo(studentNID)
    if studentInfo:
        return {
            "name": studentInfo[0],
            "permission": studentInfo[1]
        }
    else:
        return {
            "status_code": 500
        }


@app.post("/importStudent", status_code=200)
def importStudent(nid: str, token: str, projectUUID: str, file_: UploadFile):
    """import student data from xlsx file

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): target project
        file_ (UploadFile): xlsx file

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    if not AUTHENTICATION().SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    with open("./temp/tempStudent.temp", "wb+") as f:
        copyfileobj(file_.file, f)

    df = read_excel("./temp/tempStudent.temp")

    for i in df["NID"]:
        if not i.startswith("D"):
            continue
        params = {
            "nid": i,
            "projectUUID": projectUUID,
        }
        success = SQLHandler().newStudent(params)
        if not success:
            return {
                "status_code": 500
            }

    return {
        "status_code": 200
    }

# teacher


@app.get("/getTeacherData/", status_code=200)
def getTeacherData(nid: str, token: str, projectUUID: str):
    """get teacher items

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID

    Returns:
        teacher_list: [
            nid: [str]
            name: [str]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    teacherData = SQLHandler().getTeacherData(projectUUID)
    if teacherData or teacherData == []:
        data = []
        for i in teacherData:
            data.append({
                "nid": i[0],
                "name": i[1],
            })
        return data
    else:
        return {
            "status_code": 500,
        }


@app.get("/getTeacherList/", status_code=200)
def getTeacherList(nid: str, token: str, projectUUID):
    """get teacher list

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID

    Returns:
        teacher_list: [
            nid: [str]
            name: [str]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    teacherList = SQLHandler().getTeacherList()
    data = []
    if teacherList or teacherList == []:
        for i in teacherList:
            data.append({
                "nid": i[0],
                "name": i[1]
            })
        return data
    else:
        return {
            "status_code": 500
        }


@app.post("/newTeacher", status_code=200)
def newTeacher(nid: str, token: str, projectUUID: str, teacherNID: str):
    """add new teacher to project

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID
        teacherNID (str): target teacher NID

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")
    for i in [projectUUID, teacherNID]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }
    params = {
        "nid": teacherNID,
        "projectUUID": projectUUID,
    }
    success = SQLHandler().newTeacher(params)
    if success:
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.delete("/deleteTeacher/", status_code=200)
def deleteTeacher(nid: str, token: str, teacherNID: str, projectUUID: str):
    """delete target teacher from project

    Args:
        nid (str): NID
        token (str): jwt
        teacherNID (str): target teacher NID
        projectUUID (str): target projectUUID

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [teacherNID, projectUUID]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    params = {
        "nid": teacherNID,
        "projectUUID": projectUUID
    }

    if SQLHandler().deleteTeacher(params):
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.get("/getTeacherInfo/", status_code=200)
def getTeacherInfo(nid: str, token: str, teacherNID: str):
    """get target teacher info

    Args:
        nid (str): NID
        token (str): jwt
        teacherNID (str): target teacher NID

    Returns:
        name: [str] name of the teacher
        permission: [int] permission level 1-3
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=teacherNID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    teacherInfo = SQLHandler().getTeacherInfo(teacherNID)
    if teacherInfo:
        return {
            "name": teacherInfo[0],
            "permission": teacherInfo[1]
        }
    else:
        return {
            "status_code": 500
        }


@app.post("/importTeacher", status_code=200)
def importTeacher(nid: str, token: str, projectUUID: str, file_: UploadFile):
    """import teacher from xlsx file

    Args:
        nid (str): NID for
        token (str): jwt
        projectUUID (str): target projectUUID
        file_ (UploadFile): xlsx file

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    if not AUTHENTICATION().SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    with open("./temp/tempTeacher.temp", "wb+") as f:
        copyfileobj(file_.file, f)

    df = read_excel("./temp/tempTeacher.temp")

    for i in df["NID"]:
        if not i.startswith("T"):
            continue
        params = {
            "nid": i,
            "projectUUID": projectUUID,
        }
        success = SQLHandler().newTeacher(params)
        if not success:
            return {
                "status_code": 500
            }

    return {
        "status_code": 200
    }

# announcement


@app.get("/getAnnouncementData/", status_code=200)
def getAnnouncementData(nid: str, token: str, projectUUID: str):
    """get announcement data

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUDi

    Returns:
        project_data: [
            "announcementUUID": [str]
            "author": [str]
            "title": [str]
            "date": [str]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    announcementData = SQLHandler().getAnnouncementData(projectUUID)
    data = []
    if announcementData or announcementData == []:
        for i in announcementData:
            data.append({
                "announcementUUID": i[0],
                "author": i[1],
                "title": i[2],
                "date": i[3]
            })
        return data
    else:
        return {
            "status_code": 500
        }


@app.post("/createAnnouncement", status_code=200)
def createAnnouncement(nid: str, token: str, projectUUID: str, title: str, context: str):
    """create a new announcement

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID
        title (str): announcement title
        context (str): announcement content

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")
    for i in [projectUUID, title, context]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400,
            }

    params = {
        "PROJECT_ID": projectUUID,
        "ANNOUNCEMENTS_ID": str(uuid.uuid4()),
        "TITLE": title,
        "ANNOUNCEMENTS": context,
        "AUTHOR": nid,
        "LAST_EDIT": datetime.date.today()
    }
    success = SQLHandler().createAnnouncement(params)
    if success:
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.delete("/deleteAnnouncement/", status_code=200)
def deleteAnnouncement(nid: str, token: str, projectUUID: str, announcementUUID: str):
    """delete target announcement

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID
        announcementUUID (str): target announcementUUID

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    for i in [projectUUID, announcementUUID]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    params = {
        "projectUUID": projectUUID,
        "announcementUUID": announcementUUID
    }
    if SQLHandler().deleteAnnouncement(params):
        return {
            "status_code": 200
        }
    return {
        "status_code": 500
    }


@app.get("/getAnnouncementInfo/", status_code=200)
def getAnnouncementInfo(nid: str, token: str, announcementUUID: str):
    """get the announcement information

    Args:
        nid (str): NID
        token (str): jwt
        announcementUUID (str): announcementUUID

    Returns:
        author: [str] author of the announcement
        title: [str] title of the announcement
        context: [str] content
        date: [datetime] announcement create time
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=announcementUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    announcementInfo = SQLHandler().getAnnouncementInfo(announcementUUID)

    if announcementInfo:
        return {
            "author": announcementInfo[0],
            "title": announcementInfo[1],
            "context": announcementInfo[2],
            "date": announcementInfo[3]
        }
    else:
        return {
            "status_code": 500
        }

# group


@app.get("/getGroupData/", status_code=200)
def getGroupData(nid: str, token: str, projectUUID: str):
    """get group data

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): target projectUUID

    Returns:
        group_id: [str] groupUUID
        teacher_count: [int] number of teacher in a group
        student_count: [int] number of student in a group
        name: [str] group name
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    params = {
        "projectUUID": projectUUID,
        "nid": nid,
    }

    groupData = SQLHandler().getGroupData(params)
    if groupData or groupData == []:
        return groupData
    else:
        return {
            "status_code": 500
        }


@app.post("/newGroup/", status_code=200)
def newGroup(nid: str, token: str, projectUUID: str, member: str, group_name: str, GID: str):
    """create a new group

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID
        member (str): group member
        group_name (str): group name
        GID (str): groupUUID

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    if not AUTHENTICATION().SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    params = {
        "projectUUID": projectUUID,
        "name": group_name,
        "nid": member,
        "GID": GID
    }
    if SQLHandler().newGroup(params):
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.get("/getGroupToken/", status_code=200)
def getGroupToken(nid: str, token: str):
    """get group_id

    Args:
        nid (str): NID
        token (str): jwt

    Returns:
        GID: [str] a uuid4 string for group id
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    if not AUTHENTICATION().SQLInjectionCheck(prompt=nid):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    return {
        "GID": str(uuid.uuid4())
    }


@app.get("/getGroupTeacherData/", status_code=200)
def getGroupTeacherData(nid: str, token: str, projectUUID: str):
    """get the teacher list in project

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID

    Returns:
        teacher_list: [
            nid: [str] NID
            name: [str] name of teacher
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not AUTHENTICATION().SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    teacher_data = SQLHandler().getGroupTeacherData(projectUUID)
    teacher_list = []
    for i in teacher_data:
        teacher_list.append({
            "nid": i[0],
            "name": i[1],
        })

    if teacher_list:
        return teacher_list
    else:
        return []


@app.get("/getGroupStudentData/", status_code=200)
def getGroupStudentData(nid: str, token: str, projectUUID: str):
    """get the student list in project

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID

    Returns:
        teacher_list: [
            nid: [str] NID
            name: [str] name of student
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=projectUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    student_data = SQLHandler().getGroupStudentData(projectUUID)
    student_list = []
    for i in student_data:
        student_list.append({
            "nid": i[0],
            "name": i[1],
        })

    if student_list:
        return student_list
    else:
        return []


@app.get("/getGroupInfo/", status_code=200)
def getGroupInfo(nid: str, token: str, groupUUID: str):
    """get group information

    Args:
        nid (str): NID
        token (str): jwt
        groupUUID (str): groupUUID | GID

    Returns:
        group_info: [
            name: [str]
            count_member: [int]
            student_list: [list]
            teacher_list: [list]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=groupUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    groupInfo = SQLHandler().getGroupInfo(groupUUID)

    for i in groupInfo:
        if groupInfo[i] == []:
            groupInfo[i] = "None"
        if type(groupInfo[i]) == list:
            groupInfo[i] = ", ".join(groupInfo[i])

    return groupInfo


@app.delete("/deleteGroup/", status_code=200)
def deleteGroup(nid: str, token: str, groupUUID: str, projectUUID: str):
    """delete target group

    Args:
        nid (str): NID
        token (str): jwt
        groupUUID (str): target groupUUID
        projectUUID (str): projectUUID of target group

    Returns:
        _type_: _description_
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not access.SQLInjectionCheck(prompt=groupUUID):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")
    params = {
        "groupUUID": groupUUID,
        "projectUUID": projectUUID,
    }

    if SQLHandler().deleteGroup(params):
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 403
        }

# assignment

@app.get("/getAssignment/", status_code=200)
def getAssignment(nid: str, token: str, projectUUID: str):
    """get assignment list

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID

    Returns:
        assignment_data: [
            "assignmentUUID": [str] assignmentUUID
            "group": [str]  groupUUID
            "title": [str]  assignment title
            "status": [str] assignment status e.g. submitted, not submitted
            "date": [datetime] assignment submission date
            "uploader": [str] assignment file uploader
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [projectUUID]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    params = {
        "nid": nid,
        "projectUUID": projectUUID
    }
    assignment_data = SQLHandler().getAssignment(params)
    if assignment_data or assignment_data == []:
        return assignment_data
    else:
        return {
            "status_code": 500
        }


@app.get("/downloadAssignment/", status_code=200)
def downloadAssignment(
        nid: str,
        token: str,
        projectUUID: str,
        taskUUID: str,
        fileID: str):
    """download request for assignment

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID
        taskUUID (str): taskUUID
        fileID (str): fileUUID

    Returns:
        file: [File object] the assignment file
    """

    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [taskUUID, fileID]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")
    params = {
        "taskUUID": taskUUID,
        "fileID": fileID
    }
    file_name = SQLHandler().downloadAssignment(params)

    file_path = f"assignment/{projectUUID}/{params['taskUUID']}/{params['fileID']}/{file_name}"
    return FileResponse(path=file_path)


@app.post("/uploadAssignment", status_code=200)
def uploadAssignment(
        nid: str,
        token: str,
        projectUUID: str,
        taskUUID: str,
        filename: str,
        file_: UploadFile):
    """assignment upload api

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID
        taskUUID (str): taskUUID
        filename (str): name of the assignment or file
        file_ (UploadFile): file object

    Returns:
        status_code: [int] status code
    """

    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    for i in [projectUUID, taskUUID, filename]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    file_id = str(uuid.uuid4())
    file_path = f"./assignment/{projectUUID}/{taskUUID}/{file_id}/{filename}"
    path = f"./assignment/{projectUUID}/{taskUUID}/{file_id}/"

    os.makedirs(path)
    with open(file_path, "wb+") as f:
        copyfileobj(file_.file, f)

    params = {
        "TASK_ID": taskUUID,
        "FILE_ID": file_id,
        "FILE_NAME": filename,
        "AUTHOR": nid,
        "DATE": datetime.date.today(),
        "projectUUID": projectUUID,
    }
    if SQLHandler().uploadAssignment(params):
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.delete("/deleteAssignment/", status_code=200)
def deleteAssignment(nid: str, token: str, assignmentUUID: str, projectUUID: str):
    """delete target assignment not the file

    Args:
        nid (str): NID
        token (str): jwt
        assignmentUUID (str): assignmentUUID
        projectUUID (str): projectUUID

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [projectUUID]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")
    params = {
        "project_id": projectUUID,
        "task_id": assignmentUUID,
    }

    if SQLHandler().deleteAssignment(params):
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.delete("/deleteAssignmentItem/", status_code=200)
def deleteAssignmentItem(nid: str, token: str, taskUUID: str, fileUUID: str, author: str):
    """delete assignment item aka the file

    Args:
        nid (str): NID
        token (str): jwt
        taskUUID (str): taskUUID
        fileUUID (str): fileUUID
        author (str): the file uploader

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    for i in [taskUUID, fileUUID, author]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    params = {
        "taskID": taskUUID,
        "fileID": fileUUID,
        "author": author
    }

    if SQLHandler().deleteAssignmentItem(params):
        return {
            "status_code": 200,
        }
    else:
        return {
            "status_code": 500
        }


@app.post("/markAssignmentScore", status_code=200)
def markAssignmentScore(nid: str, token: str, projectUUID: str, taskUUID: str, marks: int):
    """mark assignment score

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID
        taskUUID (str): taskUUID
        marks (int): assignment scores

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    for i in [projectUUID, taskUUID, marks]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    params = {
        "projectUUID": projectUUID,
        "taskUUID": taskUUID,
        "marks": marks
    }
    if SQLHandler().markAssignmentScore(params):
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 500
        }


@app.post("/newAssignment", status_code=200)
def newAssignment(
        nid: str,
        token: str,
        projectUUID: str,
        gid: str,
        name: str,
        weight: int,
        date: str):
    """create a new assignment

    Args:
        nid (str): NID
        token (str): jwt
        projectUUID (str): projectUUID
        gid (str): groupUUID
        name (str): name of the assignment
        weight (int): the percentage of the assignment
        date (str): the deadline of the assignment

    Returns:
        : _description_
    """

    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    for i in [projectUUID, gid, name, weight, date]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    params = {
        "task_id": str(uuid.uuid4()),
        "projectUUID": projectUUID,
        "name": name,
        "status": "未完成",
        "submission_date": date,
        "gid": gid,
        "uploader": nid,
        "weight": weight,
        "mark": 0
    }

    if SQLHandler().newAssignment(params):
        return {
            "status_code": 200,
        }
    else:
        return {
            "status_code": 503
        }


@app.get("/getAssignmentInfo/", status_code=200)
def getAssignmentInfo(nid: str, token: str, assignmentUUID: str, projectUUID: str):
    """get assignment information

    Args:
        nid (str): NID
        token (str): jwt
        assignmentUUID (str): assignmentUUID
        projectUUID (str): projectUUID

    Returns:
        assignment_info: [
            "assignment_name": [str] name of the assignment
            "group_name": [str] name of the group
            "mark": [int] assignment score
            "weight": [int] percentage score of assignment
            "date": [datetime] deadline
            "assignment_file": [
                "taskID": [str] taskUUID
                "fileID": [str] fileUUID
                "filename": [str] name of the assignment file
                "author": [str] assignment author
                "date": [datetime] date of submission
            ]
        ]
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    for i in [projectUUID, assignmentUUID]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    params = {
        "task_id": assignmentUUID,
        "project_id": projectUUID,
    }

    info = SQLHandler().getAssignmentInfo(params)
    if info and info != ():
        return info
    else:
        return {
            "status_code": 500
        }

# profile


@app.post("/changePassword", status_code=200)
async def changePassword(nid: str, token: str, oldPassword: str, newPassword: str):
    """api of change password for user

    Args:
        nid (str): NID
        token (str): jwt
        oldPassword (str): the old password
        newPassword (str): the new password

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    for i in [oldPassword, newPassword]:
        if not AUTHENTICATION().SQLInjectionCheck(prompt=i):
            return {
                "SQLInjectionCheck": False,
                "status_code": 400
            }

    if access.change_password(nid, oldPassword, newPassword):
        return {
            "status_code": 200
        }
    else:
        return {
            "status_code": 400
        }


@app.get("/getIconImages/{nid}/", status_code=200)
async def getIconImages(nid: str) -> FileResponse:
    """api of the icon image

    Args:
        nid (str): NID

    Returns:
        icon_file: [File Object] the icon file
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if nid == "undefined" or nid == "null":
        return FileResponse(f"./icon/default.png")

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    icon_file_name = SQLHandler().getIconImage(nid)

    return FileResponse(f"./icon/{icon_file_name}")


@app.post("/changeIcon", status_code=200)
async def changeIcon(nid: str, token: str, file_: UploadFile, filename: str):
    """api of changing the icon image for user

    Args:
        nid (str): NID
        token (str): jwt
        file_ (UploadFile): icon file
        filename (str): file name for file type checking

    Returns:
        status_code: [int] status code
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]
    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    if not AUTHENTICATION().SQLInjectionCheck(prompt=filename):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    file_extension = filename.split(".")[-1]
    file_name = str(uuid.uuid4())

    path = f"./icon/{nid}/"
    file_path = f"./icon/{nid}/{file_name}.{file_extension}"

    params = {
        "filename": f"{file_name}.{file_extension}",
        "nid": nid,
    }
    if not os.path.exists(path):
        os.makedirs(path)

    with open(file_path, "wb+") as f:
        copyfileobj(file_.file, f)

    if SQLHandler().changeIcon(params):
        return {
            "status_code": 200,
        }
    else:
        return {
            "status_code": 500
        }


# dashboard

@app.get("/getDeadlineProject/", status_code=200)
def getDeadlineProject(nid: str, token: str):
    """get the deadline project (shown in dashboard page)

    Args:
        nid (str): NID
        token (str): jwt

    Returns:
        status_code: [int] status code
        assignment_data: [
            "TASK_ID": [str] taskUUID
            "PROJECT_ID": [str] projectUUID
            "NAME": [str] name of the project
            "SUBMISSION_DATE": [str] deadline
        ]

        assignment_data: None if no deadline assignment
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not AUTHENTICATION().SQLInjectionCheck(prompt=nid):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    data = SQLHandler().getDeadlineProject(nid)
    if data:
        return {
            "status_code": 200,
            "data": data
        }
    else:
        return {
            "status_code": 200,
            "data": None
        }

# about page

@app.get("/getAboutPage/", status_code=200)
def getAboutPage(nid: str, token: str, targetNID: str):
    """the information about the about page

    Args:
        nid (str): NID
        token (str): jwt
        targetNID (str): target NID

    Returns:
        user_info: {
            NID: [int] NID,
            name: [str] username,
            last_login: [datetime] last login,
            email: [str] email
        }
    """
    access = AUTHENTICATION()
    func_name = stack()[0][3]

    if not AUTHENTICATION().SQLInjectionCheck(prompt=nid):
        return {
            "SQLInjectionCheck": False,
            "status_code": 400
        }

    if not access.permission_check(nid, func_name):
        return HTTPException(403, "Access denied")

    token_validation = access.verify_jwt_token(nid, token)
    if not token_validation:
        return HTTPException(status_code=403, detail="Token invalid")

    user_info = SQLHandler().getAboutPage(targetNID)
    return user_info

if __name__ == "__main__":
    # development only
    # uvicorn main:app --reload
    app.run(debug=DEBUG)
