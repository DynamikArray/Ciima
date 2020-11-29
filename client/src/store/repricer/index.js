import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import beenRepriced from "./beenRepriced";
import needRepricing from "./needRepricing";
import repricingLog from "./repricingLog";

const pricing = {
  namespaced: true,
  modules: {
    beenRepriced,
    needRepricing,
    repricingLog
  }
};

export default pricing;
