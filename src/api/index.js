import http from "./http";

/** 获取当前登录账号信息 */
export const accout = () => http.get("/api/wx/account");
export const login = params => http.get("/api/wx/login", params);

/** 老师 提交资料 */
export const teacherRegister = params =>
  http.post("/api/wx/teacher/register", params);
export const teacherSelfCode = params =>
  http.get("/api/wx/teacher/selfCode", params);

/** 学生 提交资料 */
export const studentRegister = params =>
  http.post("/api/wx/student/register", params);
export const studentSelfCode = params =>
  http.get("/api/wx/student/selfCode", params);

export const teachersList = params => http.get(`/api/teachers`, params);
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
