import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_CATEGORY_SALES } from "@/store/action-types";
import {
  SEARCH_CATEGORY_SALES_LOADING,
  SEARCH_CATEGORY_SALES_RESULTS,
  SEARCH_CATEGORY_SALES_CLEAR
} from "@/store/mutation-types";

const categorySales = {
  namespaced: true,

  state: {
    loading: false,
    items: []
  },

  getters: {},

  mutations: {
    [SEARCH_CATEGORY_SALES_CLEAR](state) {
      state.items = [];
    },
    [SEARCH_CATEGORY_SALES_RESULTS](state, items) {
      state.items = items;
    },
    [SEARCH_CATEGORY_SALES_LOADING](state, { loading }) {
      state.loading = loading;
    }
  },

  actions: {
    [SEARCH_CATEGORY_SALES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/reporting/getCategorySales",
          params: params,
          success: `reports/categorySales/${SEARCH_CATEGORY_SALES_RESULTS}`,
          loading: `reports/categorySales/${SEARCH_CATEGORY_SALES_LOADING}`
        },
        { root: true }
      );
    }
  }
};
export default categorySales;
