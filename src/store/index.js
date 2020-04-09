import Vue from "vue";
import Vuex from "vuex";
import { getOpenid } from "@/api/index";

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
    getOpenid({ commit }) {
      return getOpenid().then(res => {
        if (typeof res === "string") {
          commit("setOpenid", res);
        }
        return res;
      });
    }
  },
  modules: {}
});
