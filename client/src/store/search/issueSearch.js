import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_ISSUES,
  SEARCH_ISSUES_RESULTS_CLEAR
} from "@/store/action-types";
import {
  SEARCH_ISSUES_RESULTS_SET,
  SEARCH_ISSUES_RESULTS_LOADING
} from "@/store/mutation-types";

const issueSearch = {
  namespaced: true,

  state: {
    items: false,
    loading: false
  },

  mutations: {
    [SEARCH_ISSUES_RESULTS_SET](state, data) {
      state.items = data;
    },
    [SEARCH_ISSUES_RESULTS_CLEAR](state) {
      state.items = false;
    },
    [SEARCH_ISSUES_RESULTS_LOADING](state, data) {
      state.loading = data.loading;
    }
  },

  actions: {
    [SEARCH_ISSUES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/v1/issueSearch",
          params: params,
          success: `issueSearch/${SEARCH_ISSUES_RESULTS_SET}`,
          loading: `issueSearch/${SEARCH_ISSUES_RESULTS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default issueSearch;
