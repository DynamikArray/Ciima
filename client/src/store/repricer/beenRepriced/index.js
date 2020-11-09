import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_BEEN_REPRICED_ITEMS } from "@/store/action-types";
import {
  SEARCH_BEEN_REPRICED_ITEMS_LOADING,
  SEARCH_BEEN_REPRICED_ITEMS_RESULTS,
  SEARCH_BEEN_REPRICED_ITEMS_CLEAR
} from "@/store/mutation-types";

const beenRepriced = {
  namespaced: true,

  state: {
    items: [],
    loading: false
  },

  getters: {
    getItems: state => {
      return state.items;
    },
    getLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    [SEARCH_BEEN_REPRICED_ITEMS_CLEAR](state) {
      state.items = [];
    },
    [SEARCH_BEEN_REPRICED_ITEMS_RESULTS](state, items) {
      state.items = items;
    },
    [SEARCH_BEEN_REPRICED_ITEMS_LOADING](state, { loading }) {
      state.loading = loading;
    }
  },

  actions: {
    [SEARCH_BEEN_REPRICED_ITEMS]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repricingService/getItemsList",
          params: params,
          success: `repricer/beenRepriced/${SEARCH_BEEN_REPRICED_ITEMS_RESULTS}`,
          loading: `repricer/beenRepriced/${SEARCH_BEEN_REPRICED_ITEMS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default beenRepriced;
