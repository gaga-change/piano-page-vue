import axios from "axios";
import { Toast } from "mint-ui";
import router from "../router";

let newAxios = axios.create({
  timeout: 15000 // 请求超时时间
});

// 响应拦截器
newAxios.interceptors.response.use(
  function(response) {
    if (response.status === 204) return {};
    return response.data;
  },
  function(error) {
    let data = error.response.data;
    let message = "";
    if (typeof data === "string") {
      message = data;
    }
    if (data.errcode) {
      return Promise.resolve(data);
    }
    if (error.message === "timeout of 1500ms exceeded") {
      Toast("请求超时，请稍后再试！");
    } else if (error.response.status === 401) {
      // 未登录
      router.push({ name: "Login", query: { backUrl: location.pathname } });
      // Toast(message);
    } else if (error.response.status === 402) {
      // 已登录，未提交资料
      if (~location.hostname.indexOf("teacher")) {
        router.push({ name: "TeacherRegister" });
      } else {
        router.push({ name: "StudentRegister" });
      }
      // Toast(message);
    } else {
      Toast(message || "系统异常");
    }
    return Promise.reject(error);
  }
);

const http = {
  get(url, params) {
    return newAxios
      .get(url, { params })
      .then(res => res)
      .catch(() => null);
  },
  post(url, params) {
    return newAxios
      .post(url, params)
      .then(res => res)
      .catch(() => null);
  },
  delete(url, params) {
    return newAxios
      .delete(url, { params })
      .then(res => res)
      .catch(() => null);
  },
  put(url, params) {
    return newAxios
      .put(url, params)
      .then(res => res)
      .catch(() => null);
  }
};

export default http;
