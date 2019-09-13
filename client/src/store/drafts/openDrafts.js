import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { OPEN_DRAFTS_FETCH, OPEN_DRAFTS_SUBMIT } from "@/store/action-types";
import {
  OPEN_DRAFTS_LISTED,
  OPEN_DRAFTS_RESULTS,
  OPEN_DRAFTS_LOADING
} from "@/store/mutation-types";

const openDrafts = {
  namespaced: true,
  state: {
    items: [],
    loading: false,
    lastItemListed: false
  },
  mutations: {
    [OPEN_DRAFTS_RESULTS](state, data) {
      state.items = data;
    },
    [OPEN_DRAFTS_LISTED](state, data) {
      state.lastItemListed = data;
    },
    [OPEN_DRAFTS_LOADING](state, data) {
      state.loading = data.loading;
    }
  },
  actions: {
    [OPEN_DRAFTS_FETCH]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/v1/drafts",
          params: params,
          success: `openDrafts/${OPEN_DRAFTS_RESULTS}`,
          loading: `openDrafts/${OPEN_DRAFTS_LOADING}`
        },
        { root: true }
      );
    },
    [OPEN_DRAFTS_SUBMIT]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/v1/submitDraft",
          params: params,
          success: `openDrafts/${OPEN_DRAFTS_LISTED}`,
          loading: `openDrafts/${OPEN_DRAFTS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default openDrafts;
