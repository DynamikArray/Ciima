import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import ourData from "./ourData/ourData";
import theirData from "./theirData/theirData";

import {
  /**/
  SAVE_ISSUE_MATCH,
  UPDATE_ISSUE_MATCH,
  DELETE_ISSUE_MATCH
} from "@/store/action-types";

import { REMOVE_ISSUE_MATCH_FROM_ISSUE_LIST } from "@/store/mutation-types";

const pricematch = {
  namespaced: true,

  modules: {
    ourData,
    theirData
  },

  state: {},
  mutations: {
    [REMOVE_ISSUE_MATCH_FROM_ISSUE_LIST](state, data) {
      const selected = state.ourData.ourSelectedIssue;
      const ours = state.ourData.ourIssuesResults.rows;

      let updatedRow = {};
      const newData = ours.map(row => {
        if (row.id == selected.id) {
          updatedRow = { ...row, hasMatch: 0, issuePrices: null };
          return updatedRow;
        }
        return row;
      });
      state.ourData.ourSelectedIssue = {
        ...state.ourData.ourSelectedIssue,
        ...updatedRow
      };
      state.ourData.ourIssuesResults.rows = newData;
    }
  },
  getters: {},
  actions: {
    async [SAVE_ISSUE_MATCH]({ dispatch, commit }, params) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/pricematch/createIssueMatch",
          params: params,
          success: false,
          loading: false
        },
        { root: true }
      );
    },
    async [UPDATE_ISSUE_MATCH]({ dispatch, commit }, params) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "put",
          url: "/pricematch/updateIssueMatch",
          params: params,
          success: false,
          loading: false
        },
        { root: true }
      );
    },
    async [DELETE_ISSUE_MATCH]({ dispatch, commit }, params) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "delete",
          url: `/pricematch/deleteIssueMatch/${params}`,
          params: false,
          success: `pricematch/${REMOVE_ISSUE_MATCH_FROM_ISSUE_LIST}`,
          loading: false
        },
        { root: true }
      );
    }
  }
};

export default pricematch;
