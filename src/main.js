import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import MintUI from "mint-ui";
import "./assets/less/main.less";
import "./assets/css/normalize.css";
import "mint-ui/lib/style.css";

Vue.use(MintUI);

Vue.config.productionTip = false;

const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log("to ", to);
  const { studentOpenid, teacherOpenid } = store.state;
  const isTeacher = to.path.includes("/teacher/");
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  if (whiteList.includes(to.path)) {
    next();
  } else if ((isTeacher && !teacherOpenid) || (!isTeacher && !studentOpenid)) {
    // 本地是否有openid，无请求当前cookie中openid
    store.dispatch("getOpenid").then(res => {
      const { studentOpenid, teacherOpenid } = res;
      if ((isTeacher && !teacherOpenid) || (!isTeacher && !studentOpenid)) {
        // cookie中依旧没有，则跳转登录
        router.push({ name: "Login", query: { backUrl: to.fullPath } });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});
Vue.prototype.$copy = obj => JSON.parse(JSON.stringify(obj));
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
