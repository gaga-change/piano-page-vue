import http from "./http";
// import axios from "axios";

export const getOpenid = () => http.get("/api/wx/account");

// /** 枚举接口 */
// export const enumsAdd = params => http.post(`/api/enums`, params)
// export const enumsDel = id => http.delete(`/api/enums/${id}`)
// export const enumsModify = (id, params) => http.put(`/api/enums/${id}`, params)
// export const enumsDetail = id => http.get(`/api/enums/${id}`)
// export const enumsList = params => http.get(`/api/enums`, params)
// /** 获取所有枚举（简化字段） */
// export const enumsTotal = params => http.get('/api/enumsTotal', params)

// /** 老师接口 */
// export const teachersAdd = params => http.post(`/api/teachers`, params)
// export const teachersDel = id => http.delete(`/api/teachers/${id}`)
// export const teachersModify = (id, params) => http.put(`/api/teachers/${id}`, params)
// export const teachersDetail = id => http.get(`/api/teachers/${id}`)
// export const teachersList = params => http.get(`/api/teachers`, params)

// /** 学生接口 */
// export const studentsAdd = params => http.post(`/api/students`, params)
// export const studentsDel = id => http.delete(`/api/students/${id}`)
// export const studentsModify = (id, params) => http.put(`/api/students/${id}`, params)
// export const studentsDetail = id => http.get(`/api/students/${id}`)
// export const studentsList = params => http.get(`/api/students`, params)

// /** 登录 */
// export const userlogin = params => http.post(`/api/auth/login`, params)
// /** 退出登录 */
// export const logout = () => http.post(`/api/auth/logout`)
// /** 获取用户信息 */
// export const getInfo = () => http.get(`/api/auth/account`)
