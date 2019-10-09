import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_ISSUES } from "@/store/action-types";
import {
  SEARCH_ISSUES_RESULTS_CLEAR,
  SEARCH_ISSUES_RESULTS_SET,
  SEARCH_ISSUES_RESULTS_LOADING,
  SEARCH_ISSUES_SHOW_SELECTED_ITEM,
  SEARCH_ISSUES_SELECTED_ITEM
} from "@/store/mutation-types";

const issueSearch = {
  namespaced: true,

  state: {
    items: [],
    loading: false,
    //image modal helpers
    selectedItem: false,
    blnShowSelectedItem: false
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
    },
    [SEARCH_ISSUES_SHOW_SELECTED_ITEM](state, blnShow) {
      state.blnShowSelectedItem = blnShow;
    },
    [SEARCH_ISSUES_SELECTED_ITEM](state, selectedItem) {
      state.selectedItem = selectedItem;
    }
  },

  actions: {
    [SEARCH_ISSUES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/issueSearch",
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
