import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  //TOGGLE_DRAFT_DRAWER, //// TODO:  DEPREcATE
  TOGGLE_UTILITY_DRAWER,
  SET_DEFAULT_PRODUCT_TYPE
} from "@/store/mutation-types";

const settings = {
  namespaced: true,

  state: {
    //draftDrawer: false, //helps us open/close draft photo/titles/issues drawer
    utilityDrawer: false,
    defaultProductType: "sets" //sets, singles
  },
  mutations: {
    /*
    [TOGGLE_DRAFT_DRAWER](state, blnOpen) {
      state.draftDrawer = blnOpen;
    },
    */
    [TOGGLE_UTILITY_DRAWER](state, blnOpen) {
      state.utilityDrawer = blnOpen;
    },
    [SET_DEFAULT_PRODUCT_TYPE](state, productType) {
      state.defaultProductType = productType;
    }
  },
  actions: {}
};

export default settings;
