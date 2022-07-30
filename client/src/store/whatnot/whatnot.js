import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { WHATNOT_SEARCH_SALES_RESULTS, WHATNOT_SEARCH_SALES_LOADING } from "@/store/mutation-types";

import { WHATNOT_SEARCH_SALES } from "@/store/action-types";

const whatnot = {
  namespaced: true,
  state: {
    loading: false,
    items: []
  },
  getters: {
    getLoading: state => state.loading,
    getItems: state => state.items
  },
  mutations: {
    [WHATNOT_SEARCH_SALES_RESULTS](state, data) {
      state.items = data;
    },
    [WHATNOT_SEARCH_SALES_LOADING](state, data) {
      state.loading = data.loading;
    }
  },
  actions: {
    async [WHATNOT_SEARCH_SALES]({ commit, dispatch }, payload) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/whatnot/search",
          params: payload,
          success: `whatnot/${WHATNOT_SEARCH_SALES_RESULTS}`,
          loading: `whatnot/${WHATNOT_SEARCH_SALES_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default whatnot;
