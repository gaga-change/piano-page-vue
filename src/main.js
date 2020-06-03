import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Empty from "./components/Empty";

import MintUI, { MessageBox, Indicator } from "mint-ui";

import "./assets/less/main.less";
import "./assets/css/normalize.css";
// import "./assets/css/font/iconfont.css";
import "mint-ui/lib/style.css";
import moment from "moment";

Vue.use(MintUI);
Vue.component("Empty", Empty);

Vue.prototype.$moment = moment;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$loading = () => Indicator.open({ spinnerType: "fading-circle" });
Vue.prototype.$loaded = () => Indicator.close();

Vue.config.productionTip = false;

const whiteList = ["/login", "/temp"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  const { openid } = store.state;
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  if (whiteList.includes(to.path)) {
    next();
  } else if (!openid) {
    // 本地是否有openid，无请求当前cookie中openid
    store.dispatch("accout").then(res => {
      const { openid } = res;
      if (!openid) {
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
