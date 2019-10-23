import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_EBAY_ACTIVE_RESULTS,
  SEARCH_EBAY_ACTIVE_LOADING,
  SEARCH_EBAY_ENDED_RESULTS,
  SEARCH_EBAY_ENDED_LOADING
} from "@/store/mutation-types";

import { SEARCH_EBAY_ACTIVE, SEARCH_EBAY_ENDED } from "@/store/action-types";

const search = {
  namespaced: true,
  state: {
    active_meta: false,
    active_items: [],
    active_loading: false,
    ended_meta: false,
    ended_items: [],
    ended_loading: false
  },
  mutations: {
    [SEARCH_EBAY_ACTIVE_RESULTS](state, data) {
      state.active_meta = data.$;
      state.active_items = data.item;
    },
    [SEARCH_EBAY_ACTIVE_LOADING](state, data) {
      state.active_loading = data.loading;
    },
    [SEARCH_EBAY_ENDED_RESULTS](state, data) {
      state.ended_meta = data.$;
      state.ended_items = data.item;
    },
    [SEARCH_EBAY_ENDED_LOADING](state, data) {
      state.ended_loading = data.loading;
    }
  },
  actions: {
    [SEARCH_EBAY_ACTIVE]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/ebay/search",
          params: params,
          success: `ebay/${SEARCH_EBAY_ACTIVE_RESULTS}`,
          loading: `ebay/${SEARCH_EBAY_ACTIVE_LOADING}`
        },
        { root: true }
      );
    },
    [SEARCH_EBAY_ENDED]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/ebay/search",
          params: params,
          success: `ebay/${SEARCH_EBAY_ENDED_RESULTS}`,
          loading: `ebay/${SEARCH_EBAY_ENDED_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default search;
