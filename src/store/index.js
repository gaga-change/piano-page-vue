import Vue from "vue";
import Vuex from "vuex";
import { getOpenid } from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openid: null,
    teacherOpenid: null,
    studentOpenid: null,
    user: null
  },
  mutations: {
    setOpenid(state, val) {
      state.teacherOpenid = val.teacherOpenid;
      state.studentOpenid = val.studentOpenid;
      state.user = val.user;
    }
  },
  actions: {
    getOpenid({ commit }) {
      return getOpenid().then(res => {
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
