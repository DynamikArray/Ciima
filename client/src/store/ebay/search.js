import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_EBAY_RESULTS,
  SEARCH_EBAY_LOADING
} from "@/store/mutation-types";

import { SEARCH_EBAY } from "@/store/action-types";

const search = {
  namespaced: true,
  state: {
    loading: false,
    items: [],
    meta: false
  },
  mutations: {
    [SEARCH_EBAY_RESULTS](state, data) {
      state.meta = data.$;
      state.items = data.item;
    },
    [SEARCH_EBAY_LOADING](state, data) {
      state.loading = data.loading;
    }
  },
  actions: {
    [SEARCH_EBAY]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/ebay/search",
          params: params,
          success: `ebay/${SEARCH_EBAY_RESULTS}`,
          loading: `ebay/${SEARCH_EBAY_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default search;
