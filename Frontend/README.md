# pms [![](https://wakatime.com/badge/user/09ce4786-a8a5-43eb-8a65-50ad8684b5da/project/7e57b855-98dd-4e41-b974-e1700377fa86.svg)](https://wakatime.com/badge/user/09ce4786-a8a5-43eb-8a65-50ad8684b5da/project/7e57b855-98dd-4e41-b974-e1700377fa86)

permission level:
    lv.0 = no access
    lv.1 = user
    lv.2 = teacher user
    lv.3 = admin

1.  student
    - view
        - subject
            - project
                - announcement
                - student
                - assignment
                - teacher
                - group
    - create
        - announcement
    - edit
        - announcement `is_owner`
        - profile
2.  teacher
    - view
        - student.view
    - create
        - student.create
        - project
        - subject
        - assignment
        - group
    - add
        - student
        - teacher
        - group
    - edit
        - student.edit
        - group
        - student
        - assignment
        - teacher
3.  admin
    - view
        - teacher.view
        - system log
    - create
        - teacher.create
    - add
        - teacher.add
    - edit
        - teacher.edit

todo:
    all input warning => border-danger