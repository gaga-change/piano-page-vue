import http from "./http";

/** 获取当前登录账号信息 */
export const accout = () => http.get("/api/wx/account");
export const login = params => http.get("/api/wx/login", params);

/** 获取所有枚举（简化字段） */
export const enumsTotal = params => http.get("/api/enums/enumsTotal", params);

/** 老师 提交资料 */
export const teacherRegister = params =>
  http.post("/api/wx/teacher/register", params);
export const teacherSelfCode = params =>
  http.get("/api/wx/teacher/selfCode", params);
/** 老师端抢课 */
export const teacherTakeCourse = params =>
  http.post("/api/wx/teacher/takeCourse", params);

/** 学生 提交资料 */
export const studentRegister = params =>
  http.post("/api/wx/student/register", params);
export const studentSelfCode = params =>
  http.get("/api/wx/student/selfCode", params);

/** 抢课单接口 */
// export const takeCoursesAdd = params => http.post(`/api/takeCourses`, params)
// export const takeCoursesDel = id => http.delete(`/api/takeCourses/${id}`)
// export const takeCoursesModify = (id, params) => http.put(`/api/takeCourses/${id}`, params)
export const takeCoursesDetail = id => http.get(`/api/takeCourses/${id}`);
// export const takeCoursesList = params => http.get(`/api/takeCourses`, params)

export const teachersList = params => http.get(`/api/teachers`, params);
export const teachersDetail = id => http.get(`/api/teachers/${id}`);
export const studentsList = params => http.get(`/api/students`, params);
/** 获取周期内的课程 */
export const coursesActivateArea = params =>
  http.get(`/api/courses/coursesActivateArea`, params);
/** 获取个人未开始的课程 */
export const getReadyCourses = params =>
  http.get(`/api/wx/getReadyCourses`, params);
export const spaceRulesList = params => http.get(`/api/spaceRules`, params);
/** 请假 */
export const leaveAreasAdd = params => http.post(`/api/leaveAreas`, params);
export const leaveAreasList = params => http.get(`/api/leaveAreas`, params);
/** 查询某人某个月的所有课程 */
export const coursesFindByPersonAndMonth = params =>
  http.get(`/api/courses/findByPersonAndMonth`, params);
/** 工资规则 */
export const bonusRulesList = params => http.get(`/api/bonusRules`, params);
