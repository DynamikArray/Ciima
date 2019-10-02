import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_TITLES,
  SEARCH_TITLES_RESULTS_CLEAR
} from "@/store/action-types";
import {
  SEARCH_TITLES_SELECTED_SET,
  SEARCH_TITLES_SELECTED_CLEAR,
  SEARCH_TITLES_RESULTS_SET,
  SEARCH_TITLES_RESULTS_LOADING
} from "@/store/mutation-types";

const titleSearch = {
  namespaced: true,

  state: {
    selected: false,
    items: false,
    loading: false
  },

  mutations: {
    [SEARCH_TITLES_SELECTED_SET](state, data) {
      state.selected = data;
    },
    [SEARCH_TITLES_SELECTED_CLEAR](state) {
      state.selected = false;
    },
    [SEARCH_TITLES_RESULTS_SET](state, data) {
      state.items = data;
    },
    [SEARCH_TITLES_RESULTS_CLEAR](state) {
      state.items = false;
    },
    [SEARCH_TITLES_RESULTS_LOADING](state, data) {
      state.loading = data.loading;
    }
  },

  actions: {
    [SEARCH_TITLES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
        url: "/titleSearch",
          params: params,
          success: `titleSearch/${SEARCH_TITLES_RESULTS_SET}`,
          loading: `titleSearch/${SEARCH_TITLES_RESULTS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default titleSearch;
