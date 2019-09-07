import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import api from "@/store/api/api";
import titleSearch from "@/store/search/titleSearch";

export default new Vuex.Store({
  modules: {
    api,
    titleSearch
  },
  state: {},
  mutations: {},
  actions: {}
});
