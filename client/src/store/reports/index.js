import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_SOLD_ITEMS } from "@/store/action-types";
import { SEARCH_SOLD_ITEMS_LOADING, SEARCH_SOLD_ITEMS_RESULTS, SEARCH_SOLD_ITEMS_CLEAR } from "@/store/mutation-types";

import categorySales from "./categorySales/categorySales";

const pricing = {
  namespaced: true,

  modules: {
    categorySales
  },

  state: {
    loading: false,
    items: []
  },
  mutations: {
    [SEARCH_SOLD_ITEMS_CLEAR](state) {
      state.items = [];
    },
    [SEARCH_SOLD_ITEMS_RESULTS](state, items) {
      state.items = items;
    },
    [SEARCH_SOLD_ITEMS_LOADING](state, { loading }) {
      state.loading = loading;
    }
  },
  getters: {
    getSoldItems: state => {
      return state.items;
    }
  },
  actions: {
    [SEARCH_SOLD_ITEMS]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/reporting/getSoldItems",
          params: params,
          success: `reports/${SEARCH_SOLD_ITEMS_RESULTS}`,
          loading: `reports/${SEARCH_SOLD_ITEMS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default pricing;
