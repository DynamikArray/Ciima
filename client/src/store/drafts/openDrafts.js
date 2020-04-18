import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  OPEN_DRAFTS_FETCH,
  OPEN_DRAFTS_SUBMIT_DRAFT
} from "@/store/action-types";
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
    lastItemListed: false,
    page: 1,
    pageCount: 0,
    pageLimit: 10,
    rowsTotal: 0
  },
  mutations: {
    [OPEN_DRAFTS_RESULTS](state, data) {
      state.items = data.rows;
      state.rowsTotal = data.rowsTotal;
      state.pageLimit = data.pageLimit;
      state.pageCount = data.pageCount;
      state.page = data.page;
    },

    //TBD how this hsould work
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
          url: "/drafts",
          params: params,
          success: `openDrafts/${OPEN_DRAFTS_RESULTS}`,
          loading: `openDrafts/${OPEN_DRAFTS_LOADING}`
        },
        { root: true }
      );
    },
    async [OPEN_DRAFTS_SUBMIT_DRAFT]({ dispatch, commit }, params) {
      //pull off our toast obj if exsits
      const { toastr } = params;
      if (toastr) delete params.toastr;

      await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/submitDraft",
          params: params,
          success: `openDrafts/${OPEN_DRAFTS_LISTED}`,
          loading: `openDrafts/${OPEN_DRAFTS_LOADING}`,
          toastr
        },
        { root: true }
      );
    }
  }
};

export default openDrafts;
