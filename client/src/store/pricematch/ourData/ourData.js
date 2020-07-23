import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import issuesFilter from "./issuesFilter";

import {
  SEARCH_OUR_TITLES,
  SET_OUR_SELECTED_TITLE,
  CLEAR_OUR_SELECTED_TITLE,
  SEARCH_OUR_ISSUES,
  SET_OUR_SELECTED_ISSUE,
  CLEAR_OUR_SELECTED_ISSUE,
  UPDATE_ISSUE_MATCH
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
  ISSUE_MATCH_SET
} from "@/store/mutation-types";

const ourData = {
  namespaced: true,

  modules: {
    issuesFilter
  },

  state: {
    ourLoading: false,
    ourTitleSearchResults: [],
    ourSelectedTitle: false,

    ourIssuesResults: {
      rows: [],
      pager: {}
    },

    ourSelectedIssue: false
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
    [ISSUE_MATCH_SET](state, { slc_IssueId, issuePrices }) {
      let matchedIssue = {};
      const updateResults = state.ourIssuesResults.rows.map(issue => {
        if (issue.id == slc_IssueId) {
          matchedIssue = { ...issue, issuePrices, hasMatch: true };
          return matchedIssue;
        }
        return issue;
      });

      state.ourIssuesResults.rows = updateResults;
      state.ourSelectedIssue = { ...state.ourSelectedIssue, ...matchedIssue };
    }
  },
  getters: {
    getOurLoading: state => {
      return state.ourLoading;
    },
    getOurTitlesResults: state => {
      return state.ourTitleSearchResults;
    },
    getOurSelectedTitle: state => {
      return state.ourSelectedTitle;
    },
    getOurIssuesResults: state => {
      return state.ourIssuesResults.rows;
    },
    getOurIssuesPagination: state => {
      return state.ourIssuesResults.pager;
    },
    getOurSelectedIssue: state => {
      return state.ourSelectedIssue;
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
          success: `pricematch/ourData/${OUR_TITLES_SEARCH_RESULTS_SET}`,
          loading: `pricematch/ourData/${OUR_TITLES_SEARCH_RESULTS_LOADING}`
        },
        { root: true }
      );
    },
    [SEARCH_OUR_ISSUES]({ dispatch, commit, state }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/pricematch/searchOurIssues",
          params: {
            title: state.ourSelectedTitle.title || "",
            ...state.issuesFilter,
            ...params
          },
          success: `pricematch/ourData/${OUR_ISSUES_SEARCH_RESULTS_SET}`,
          loading: `pricematch/ourData/${OUR_ISSUES_SEARCH_RESULTS_LOADING}`
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
    [UPDATE_ISSUE_MATCH]({ dispatch, commit }, params) {
      //clear selectedIndex as well, and reload it with this item
      const { slc_IssueId, issuePrices } = params;
      commit(ISSUE_MATCH_SET, { slc_IssueId, issuePrices });
    }
  }
};

export default ourData;
