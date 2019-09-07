import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_TITLES, SEARCH_RESULTS_CLEAR } from "@/store/action-types";
import {
  SEARCH_RESULTS_SET,
  SEARCH_RESULTS_LOADING
} from "@/store/mutation-types";

const titleSearch = {
  namespaced: true,

  state: {
    items: false,
    loading: false
  },

  mutations: {
    [SEARCH_RESULTS_CLEAR](state) {
      state.items = false;
    },
    [SEARCH_RESULTS_SET](state, data) {
      state.items = data;
    },
    [SEARCH_RESULTS_LOADING](state, data) {
      state.loading = data.loading;
    }
  },

  actions: {
    [SEARCH_TITLES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/v1/titleSearch",
          params: params,
          success: `titleSearch/${SEARCH_RESULTS_SET}`,
          loading: `titleSearch/${SEARCH_RESULTS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default titleSearch;
