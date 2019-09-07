import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import api from "@/store/api/api";
import search from "@/store/search/search";

export default new Vuex.Store({
  modules: {
    api,
    search
  },
  state: {},
  mutations: {},
  actions: {}
});
