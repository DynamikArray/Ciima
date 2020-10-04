import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import draft from "@/store/gtcs/draft/draft";

const gtcs = {
  namespaced: true,
  modules: {
    draft
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {}
};

export default gtcs;
