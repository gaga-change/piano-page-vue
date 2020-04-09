import axios from "axios";
import { Notification, Message } from "element-ui";

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
    let message = error.response.data;
    if (error.message === "timeout of 1500ms exceeded") {
      Notification({
        title: "错误信息",
        message: "请求超时，请稍后再试！",
        type: "error",
        duration: 5000
      });
    }
    if (error.response.status === 401) {
      location.href = `/login`;
    } else {
      Message({
        type: "error",
        message: message || "系统异常",
        duration: 3000
      });
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
