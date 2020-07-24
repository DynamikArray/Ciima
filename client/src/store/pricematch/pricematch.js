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

import {} from "@/store/mutation-types";

const pricematch = {
  namespaced: true,

  modules: {
    ourData,
    theirData
  },

  state: {},
  mutations: {},
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
          success: false,
          loading: false
        },
        { root: true }
      );
    }
  }
};

export default pricematch;
