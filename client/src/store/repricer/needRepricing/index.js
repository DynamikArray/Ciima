import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_NEED_REPRICING_ITEMS } from "@/store/action-types";
import {
  SEARCH_NEED_REPRICING_ITEMS_LOADING,
  SEARCH_NEED_REPRICING_ITEMS_RESULTS,
  SEARCH_NEED_REPRICING_ITEMS_CLEAR
} from "@/store/mutation-types";

const needRepricing = {
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
    [SEARCH_NEED_REPRICING_ITEMS_CLEAR](state) {
      state.items = [];
    },
    [SEARCH_NEED_REPRICING_ITEMS_RESULTS](state, items) {
      state.items = items;
    },
    [SEARCH_NEED_REPRICING_ITEMS_LOADING](state, { loading }) {
      state.loading = loading;
    }
  },

  actions: {
    [SEARCH_NEED_REPRICING_ITEMS]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repricingService/getItemsList",
          params: params,
          success: `repricer/needRepricing/${SEARCH_NEED_REPRICING_ITEMS_RESULTS}`,
          loading: `repricer/needRepricing/${SEARCH_NEED_REPRICING_ITEMS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default needRepricing;
