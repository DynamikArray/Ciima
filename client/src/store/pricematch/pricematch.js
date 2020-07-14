import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_OUR_TITLES,
  SET_OUR_SELECTED_TITLE,
  CLEAR_OUR_SELECTED_TITLE,
  SEARCH_OUR_ISSUES,
  SET_OUR_SELECTED_ISSUE,
  CLEAR_OUR_SELECTED_ISSUE,
  /* theirs */
  SEARCH_THEIR_TITLES,
  SET_THEIR_SELECTED_TITLE,
  CLEAR_THEIR_SELECTED_TITLE,
  SEARCH_THEIR_ISSUES,
  SET_THEIR_SELECTED_ISSUE,
  CLEAR_THEIR_SELECTED_ISSUE
} from "@/store/action-types";

import {
  /* ours */
  OUR_TITLES_SEARCH_RESULTS_LOADING,
  OUR_TITLES_SEARCH_RESULTS_SET,
  OUR_TITLES_SELECTED_SET,
  OUR_TITLES_SELECTED_CLEAR,
  OUR_ISSUES_SEARCH_RESULTS_LOADING,
  OUR_ISSUES_SEARCH_RESULTS_SET,
  OUR_ISSUES_SELECTED_SET,
  OUR_ISSUES_SELECTED_CLEAR,
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

const pricematch = {
  namespaced: true,

  state: {
    ourLoading: false,
    ourTitleSearchResults: false,
    ourSelectedTitle: false,
    ourIssuesResults: [],
    ourSelectedIssue: false,
    theirLoading: false,
    theirTitleSearchString: "",
    theirTitleSearchResults: false,
    theirSelectedTitle: false,
    theirIssuesResults: [],
    theirSelectedIssue: false
  },
  mutations: {
    [OUR_TITLES_SEARCH_RESULTS_LOADING](state, data) {
      state.ourLoading = data.loading;
    },
    [OUR_TITLES_SEARCH_RESULTS_SET](state, data) {
      state.ourTitleSearchResults = data;
    },
    [OUR_TITLES_SELECTED_SET](state, data) {
      state.ourSelectedTitle = data;
    },
    [OUR_TITLES_SELECTED_CLEAR](state) {
      state.ourSelectedTitle = false;
    },
    [OUR_ISSUES_SEARCH_RESULTS_LOADING](state, data) {
      state.ourLoading = data.loading;
    },
    [OUR_ISSUES_SEARCH_RESULTS_SET](state, data) {
      state.ourIssuesResults = data;
    },
    [OUR_ISSUES_SELECTED_SET](state, data) {
      state.ourSelectedIssue = data;
    },
    [OUR_ISSUES_SELECTED_CLEAR](state) {
      state.ourSelectedIssue = false;
    },

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
    getOurSelectedTitle: state => {
      return state.ourSelectedTitle;
    },
    getTheirSelectedTitle: state => {
      return state.theirSelectedTitle;
    },

    getOurIssuesResults: state => {
      return state.ourIssuesResults;
    },
    getOurSelectedIssue: state => {
      return state.ourSelectedIssue;
    },

    getTheirIssuesResults: state => {
      return state.theirIssuesResults.issues;
    },
    getTheirSelectedIssue: state => {
      return state.theirSelectedIssue;
    }
  },
  actions: {
    [SEARCH_OUR_TITLES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/titleSearch",
          params: params,
          success: `pricematch/${OUR_TITLES_SEARCH_RESULTS_SET}`,
          loading: `pricematch/${OUR_TITLES_SEARCH_RESULTS_LOADING}`
        },
        { root: true }
      );
    },
    [SEARCH_OUR_ISSUES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/issueSearch",
          params: params,
          success: `pricematch/${OUR_ISSUES_SEARCH_RESULTS_SET}`,
          loading: `pricematch/${OUR_ISSUES_SEARCH_RESULTS_LOADING}`
        },
        { root: true }
      );
    },
    [SET_OUR_SELECTED_TITLE]({ dispatch, commit }, title) {
      commit(OUR_TITLES_SELECTED_SET, title);
      dispatch(SEARCH_OUR_ISSUES, { title: title.title });
    },
    [CLEAR_OUR_SELECTED_TITLE]({ dispatch, commit }, params) {
      commit(OUR_TITLES_SELECTED_CLEAR);
    },
    [SET_OUR_SELECTED_ISSUE]({ dispatch, commit }, issue) {
      commit(OUR_ISSUES_SELECTED_SET, issue);
    },
    [CLEAR_OUR_SELECTED_ISSUE]({ dispatch, commit }, params) {
      commit(OUR_ISSUES_SELECTED_CLEAR);
    },
    [SEARCH_THEIR_TITLES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/pricematch/searchTheirTitles",
          params: params,
          success: `pricematch/${THEIR_TITLES_SEARCH_RESULTS_SET}`,
          loading: `pricematch/${THEIR_TITLES_SEARCH_RESULTS_LOADING}`
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
          success: `pricematch/${THEIR_ISSUES_SEARCH_RESULTS_SET}`,
          loading: `pricematch/${THEIR_ISSUES_SEARCH_RESULTS_LOADING}`
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

export default pricematch;
