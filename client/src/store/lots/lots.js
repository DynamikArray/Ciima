import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import draft from "@/store/lots/draft/draft";

const lots = {
  namespaced: true,
  modules: {
    draft
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {}
};

export default lots;
