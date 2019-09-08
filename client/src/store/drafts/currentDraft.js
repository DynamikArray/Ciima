import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {} from "@/store/action-types";
import {
  CURRENT_DRAFT_ISSUE_ADD,
  CURRENT_DRAFT_ISSUE_REMOVE
} from "@/store/mutation-types";

const currentDraft = {
  namespaced: true,

  state: {
    title: false,
    issues: []
  },

  mutations: {
    [CURRENT_DRAFT_ISSUE_ADD](state, issue) {
      //const stateCopy = state.issues;
      const doesExist = state.issues.some(item => {
        return item.id === issue.id;
      });
      if (!doesExist) state.issues = [...state.issues, issue];
    },
    [CURRENT_DRAFT_ISSUE_REMOVE](state, issue) {
      const stateCopy = state.issues;
      const filteredState = stateCopy.filter(item => {
        return item.id !== issue.id;
      });
      state.issues = filteredState;
    }
    /*
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
