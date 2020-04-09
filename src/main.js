import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log("???");
  if (whiteList.includes(to.path)) {
    next();
  } else if (store.state.openid === null) {
    store.dispatch("getOpenid").then(res => {
      if (typeof res === "string") {
        next();
      } else {
        router.push("/login");
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
