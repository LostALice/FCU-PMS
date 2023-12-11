# 逢甲大學專題管理系統

# Permission level

| Level | Role      |
| ----- | --------- |
| 0     | No access |
| 1     | Student   |
| 2     | Teacher   |
| 3     | Admin     |


# Role permissions

```
1.  Student
    - view
      - subject
        - project
          - announcement
          - student
          - assignment
          - teacher
          - group
    - edit
      - profile

2.  Teacher
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

3.  Admin
    - view
      - teacher.view
      - system log
    - create
      - teacher.create
    - add
      - teacher.add
    - edit
      - password
```

# Route structure

```

- dashboard
- subject
  - project
    - info
    - announcement panel
      - info
      - new
    - student panel
      - info
      - new
        - import
    - assignment panel
      - info
        - submit
      - new
    - teacher panel
      - info
      - new
        - import
    - group panel
      - info
      - new
- profile
- about
- Error pages (404, 403)
```
