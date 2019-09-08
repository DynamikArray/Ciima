import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {} from "@/store/action-types";
import {} from "@/store/mutation-types";

const currentDraft = {
  namespaced: true,

  state: {
    title: false,
    issues: []
  },

  mutations: {
    /*
    [SEARCH_TITLES_SELECTED_SET](state, data) {
      state.selected = data;
    },
    [SEARCH_TITLES_SELECTED_CLEAR](state) {
      state.selected = false;
    },
    [SEARCH_TITLES_RESULTS_LOADING](state, data) {
      state.loading = data.loading;
    }
    */
  },

  actions: {
    /*
    [SEARCH_TITLES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/v1/titleSearch",
          params: params,
          success: `currentDraft/${SEARCH_TITLES_RESULTS_SET}`,
          loading: `currentDraft/${SEARCH_TITLES_RESULTS_LOADING}`
        },
        { root: true }
      );
    }*/
  }
};

export default currentDraft;
