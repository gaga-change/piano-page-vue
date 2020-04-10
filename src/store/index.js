import Vue from "vue";
import Vuex from "vuex";
import { getTeacherOpenid, getStudentOpenid } from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openid: null
  },
  mutations: {
    setOpenid(state, val) {
      state.openid = val;
    }
  },
  actions: {
    getTeacherOpenid({ commit }) {
      return getTeacherOpenid().then(res => {
        if (typeof res === "string") {
          commit("setOpenid", res);
        }
        return res;
      });
    },
    getStudentOpenid({ commit }) {
      return getStudentOpenid().then(res => {
        if (typeof res === "string") {
          commit("setOpenid", res);
        }
        return res;
      });
    }
  },
  modules: {}
});
