import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_TITLES } from "@/store/action-types";
import {
  SEARCH_RESULTS_SET,
  SEARCH_RESULTS_LOADING
} from "@/store/mutation-types";

const search = {
  namespaced: true,

  state: {
    items: false,
    loading: false
  },

  mutations: {
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
          url: "/v1/search",
          params: params,
          success: `search/${SEARCH_RESULTS_SET}`,
          loading: `search/${SEARCH_RESULTS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default search;
