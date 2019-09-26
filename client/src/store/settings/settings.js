import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { TOGGLE_DRAFT_DRAWER } from "@/store/mutation-types";

const settings = {
  namespaced: true,

  state: {
    draftDrawer: false //helps us open/close draft photo/titles/issues drawer
  },

  mutations: {
    [TOGGLE_DRAFT_DRAWER](state, blnOpen) {
      state.draftDrawer = blnOpen;
    }
  },
  actions: {}
};

export default settings;
