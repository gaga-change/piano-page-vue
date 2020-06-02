import Vue from "vue";
import Vuex from "vuex";
import { accout } from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openid: null,
    user: null,
    isTeacher: !!~location.hostname.indexOf("teacher"),
    type: ~location.hostname.indexOf("teacher") ? "teacher" : "student"
  },
  mutations: {
    setOpenid(state, val) {
      state.openid = val.openid;
      state.user = val.user;
    }
  },
  actions: {
    accout({ commit }) {
      return accout().then(res => {
        if (res) {
          commit("setOpenid", res);
          return res;
        } else {
          return {};
        }
      });
    }
  },
  modules: {}
});
