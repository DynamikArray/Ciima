import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  INIT_SETTINGS,
  TOGGLE_UTILITY_DRAWER,
  SET_DEFAULT_PRODUCT_TYPE,
  UTILITY_DRAWER_WIDTH,
  UTILITY_DRAWER_TAB
} from "@/store/mutation-types";

const settings = {
  namespaced: true,

  state: {
    //draftDrawer: false, //helps us open/close draft photo/titles/issues drawer
    utilityDrawer: false,
    utilityDrawerWidth: 60,
    utilityDrawerTab: 0,
    defaultProductType: "sets" //lots, sets, singles
  },
  mutations: {
    [INIT_SETTINGS](state, tab) {
      const rawSettings = localStorage.getItem("settings");
      //do our local store settings lookup
      if (rawSettings) {
        const settings = JSON.parse(rawSettings);

        //defaultProductType
        if (settings.defaultProductType)
          state.defaultProductType = settings.defaultProductType;
      }
    },
    [UTILITY_DRAWER_TAB](state, tab) {
      state.utilityDrawerTab = tab;
    },
    [UTILITY_DRAWER_WIDTH](state, width) {
      state.utilityDrawerWidth = width;
    },
    [TOGGLE_UTILITY_DRAWER](state, blnOpen) {
      state.utilityDrawer = blnOpen;
    },
    [SET_DEFAULT_PRODUCT_TYPE](state, productType) {
      state.defaultProductType = productType;
      localStorage.setItem("settings", JSON.stringify(state));
    }
  },
  actions: {}
};

export default settings;
