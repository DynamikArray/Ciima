import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import beenRepriced from "./beenRepriced";
import needRepricing from "./needRepricing";
import inProgress from "./inProgress";

const pricing = {
  namespaced: true,
  modules: {
    beenRepriced,
    needRepricing,
    inProgress
  }
};

export default pricing;
