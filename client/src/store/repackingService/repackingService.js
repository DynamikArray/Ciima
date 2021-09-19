import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import search from "./search";
import pending from "./pending";
import completed from "./completed";

const repackingService = {
  namespaced: true,
  modules: {
    search,
    pending,
    completed
  },
  state: {}
};

export default repackingService;
