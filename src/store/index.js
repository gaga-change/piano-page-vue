import Vue from "vue";
import Vuex from "vuex";
import { accout, enumsTotal } from "@/api";

const localEnum = [];
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openid: null,
    user: null,
    mapConfig: {},
    isTeacher: !!~location.hostname.indexOf("teacher"),
    type: ~location.hostname.indexOf("teacher") ? "teacher" : "student"
  },
  getters: {
    userId: state => state.user && state.user._id,
    mapConfig: state => state.mapConfig
  },
  mutations: {
    setOpenid(state, val) {
      state.openid = val.openid;
      state.user = val.user;
    },
    setMap: (state, config) => {
      state.mapConfig = config;
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
    },
    gitMap({ commit }) {
      config().then(res => {
        commit("setMap", res);
      });
    }
  },
  modules: {}
});

async function config() {
  let config = {};
  const data = await enumsTotal();
  data.forEach(v => {
    config[v.name] = v.keyValue;
  });
  Object.keys(localEnum).forEach(key => {
    config[key] = localEnum[key];
  });
  return config;
}
