import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_PRICELIST,
  SEARCH_PRICELIST_RESULTS_SET,
  SEARCH_PRICELIST_RESULTS_LOADING
} from "@/store/action-types";
import {} from "@/store/mutation-types";

const pricelist = {
  namespaced: true,
  modules: {},
  state: {
    items: [],
    pager: false,
    loading: false
  },
  getters: {
    getItems: state => {
      return state.items;
    },
    getItemsPager: state => {
      return state.pager;
    },
    getLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    [SEARCH_PRICELIST_RESULTS_SET](state, data) {
      state.items = data.rows;
      state.pager = data.pager;
    },
    [SEARCH_PRICELIST_RESULTS_LOADING](state, data) {
      state.loading = data.loading;
    }
  },
  actions: {
    [SEARCH_PRICELIST]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/pricelist/search",
          params: params,
          success: `pricelist/${SEARCH_PRICELIST_RESULTS_SET}`,
          loading: `pricelist/${SEARCH_PRICELIST_RESULTS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default pricelist;
