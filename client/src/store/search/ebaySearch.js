import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_EBAY_CATEGORIES } from "@/store/action-types";

import {
  SEARCH_EBAY_CATEGORIES_LOADING,
  SEARCH_EBAY_CATEGORIES_RESULTS,
  SEARCH_EBAY_CATEGORIES_CLEAR
} from "@/store/mutation-types";

const ebaySearch = {
  namespaced: true,

  state: {
    items: [],
    loading: false
  },

  mutations: {
    [SEARCH_EBAY_CATEGORIES_RESULTS](state, data) {
      state.items = data;
    },
    [SEARCH_EBAY_CATEGORIES_CLEAR](state) {
      state.items = false;
    },
    [SEARCH_EBAY_CATEGORIES_LOADING](state, data) {
      state.loading = data.loading;
    }
  },

  actions: {
    [SEARCH_EBAY_CATEGORIES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/v1/ebayCategories",
          params: params,
          success: `ebaySearch/${SEARCH_EBAY_CATEGORIES_RESULTS}`,
          loading: `ebaySearch/${SEARCH_EBAY_CATEGORIES_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default ebaySearch;
