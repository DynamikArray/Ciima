import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  /* theirs */
  SEARCH_THEIR_TITLES,
  SET_THEIR_SELECTED_TITLE,
  CLEAR_THEIR_SELECTED_TITLE,
  SEARCH_THEIR_ISSUES,
  GET_THEIR_ISSUES_PAGE,
  SET_THEIR_SELECTED_ISSUE,
  CLEAR_THEIR_SELECTED_ISSUE
} from "@/store/action-types";
import {
  /* theirs */
  THEIR_TITLES_SEARCH_RESULTS_LOADING,
  THEIR_TITLES_SEARCH_RESULTS_SET,
  THEIR_TITLES_SELECTED_SET,
  THEIR_TITLES_SELECTED_CLEAR,
  THEIR_ISSUES_SEARCH_RESULTS_SET,
  THEIR_ISSUES_SEARCH_RESULTS_LOADING,
  THEIR_ISSUES_SELECTED_SET,
  THEIR_ISSUES_SELECTED_CLEAR
} from "@/store/mutation-types";

const theirData = {
  namespaced: true,

  state: {
    theirLoading: false,
    theirTitleSearchString: "",
    theirTitleSearchResults: false,
    theirSelectedTitle: false,
    theirIssuesResults: [],
    theirSelectedIssue: false
  },
  mutations: {
    /* Theirs */
    [THEIR_TITLES_SEARCH_RESULTS_LOADING](state, data) {
      state.theirLoading = data.loading;
    },
    [THEIR_TITLES_SEARCH_RESULTS_SET](state, data) {
      state.theirTitleSearchResults = data;
    },
    [THEIR_TITLES_SELECTED_SET](state, data) {
      state.theirSelectedTitle = data;
    },
    [THEIR_TITLES_SELECTED_CLEAR](state) {
      state.theirSelectedTitle = false;
    },
    [THEIR_ISSUES_SEARCH_RESULTS_LOADING](state, data) {
      state.theirLoading = data.loading;
    },
    [THEIR_ISSUES_SEARCH_RESULTS_SET](state, data) {
      state.theirIssuesResults = data;
    },
    [THEIR_ISSUES_SELECTED_SET](state, data) {
      state.theirSelectedIssue = data;
    },
    [THEIR_ISSUES_SELECTED_CLEAR](state) {
      state.theirSelectedIssue = false;
    }
  },
  getters: {
    getTheirLoading: state => {
      return state.theirLoading;
    },
    getTheirSelectedTitle: state => {
      return state.theirSelectedTitle;
    },
    getTheirIssuesResults: state => {
      return state.theirIssuesResults.issues;
    },
    getTheirIssuesPagination: state => {
      return state.theirIssuesResults.pagination;
    },
    getTheirSelectedIssue: state => {
      return state.theirSelectedIssue;
    }
  },
  actions: {
    [SEARCH_THEIR_TITLES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/pricematch/searchTheirTitles",
          params: params,
          success: `pricematch/theirData/${THEIR_TITLES_SEARCH_RESULTS_SET}`,
          loading: `pricematch/theirData/${THEIR_TITLES_SEARCH_RESULTS_LOADING}`
        },
        { root: true }
      );
    },
    [SEARCH_THEIR_ISSUES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/pricematch/searchTheirIssues",
          params: params,
          success: `pricematch/theirData/${THEIR_ISSUES_SEARCH_RESULTS_SET}`,
          loading: `pricematch/theirData/${THEIR_ISSUES_SEARCH_RESULTS_LOADING}`
        },
        { root: true }
      );
    },
    [GET_THEIR_ISSUES_PAGE]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/pricematch/getPageTheirIssues",
          params: params,
          success: `pricematch/theirData/${THEIR_ISSUES_SEARCH_RESULTS_SET}`,
          loading: `pricematch/theirData/${THEIR_ISSUES_SEARCH_RESULTS_LOADING}`
        },
        { root: true }
      );
    },
    [SET_THEIR_SELECTED_TITLE]({ dispatch, commit }, title) {
      commit(THEIR_TITLES_SELECTED_SET, title);
      dispatch(SEARCH_THEIR_ISSUES, { TID: title.titleId });
    },
    [CLEAR_THEIR_SELECTED_TITLE]({ dispatch, commit }, params) {
      commit(THEIR_TITLES_SELECTED_CLEAR);
    },
    [SET_THEIR_SELECTED_ISSUE]({ dispatch, commit }, issue) {
      commit(THEIR_ISSUES_SELECTED_SET, issue);
    },
    [CLEAR_THEIR_SELECTED_ISSUE]({ dispatch, commit }, params) {
      commit(THEIR_ISSUES_SELECTED_CLEAR);
    }
  }
};

export default theirData;
