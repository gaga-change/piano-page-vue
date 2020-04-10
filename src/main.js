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
  console.log(to);
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  if (whiteList.includes(to.path)) {
    next();
  } else if (store.state.openid === null) {
    store.dispatch("getOpenid").then(res => {
      if (typeof res === "string") {
        next();
      } else {
        router.push({ name: "Login", query: { backUrl: to.fullPath } });
      }
    });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
