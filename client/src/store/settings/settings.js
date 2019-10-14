import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  TOGGLE_DRAFT_DRAWER,
  SET_DEFAULT_PRODUCT_TYPE
} from "@/store/mutation-types";

const settings = {
  namespaced: true,

  state: {
    draftDrawer: false, //helps us open/close draft photo/titles/issues drawer
    defaultProductType: "sets" //sets, singles
  },
  mutations: {
    [TOGGLE_DRAFT_DRAWER](state, blnOpen) {
      state.draftDrawer = blnOpen;
    },
    [SET_DEFAULT_PRODUCT_TYPE](state, productType) {
      state.defaultProductType = productType;
    }
  },
  actions: {}
};

export default settings;
