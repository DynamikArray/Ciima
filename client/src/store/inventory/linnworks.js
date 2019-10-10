import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_INVENTORY_RESULTS,
  SEARCH_INVENTORY_LOADING
} from "@/store/mutation-types";
import { SEARCH_INVENTORY } from "@/store/action-types";

const linnworks = {
  namespaced: true,
  state: {
    loading: false,
    items: []
  },

  mutations: {
    [SEARCH_INVENTORY_RESULTS](state, data) {
      state.items = data;
    },
    [SEARCH_INVENTORY_LOADING](state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    [SEARCH_INVENTORY]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/linnworks/search",
          params: params,
          success: `linnworks/${SEARCH_INVENTORY_RESULTS}`,
          loading: `linnworks/${SEARCH_INVENTORY_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default linnworks;
