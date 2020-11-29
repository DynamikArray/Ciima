import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_REPRICING_LOG } from "@/store/action-types";
import {
  SEARCH_REPRICING_LOG_LOADING,
  SEARCH_REPRICING_LOG_RESULTS
} from "@/store/mutation-types";

const repricingLog = {
  namespaced: true,

  state: {
    loading: false,
    items: [],
    page: 1,
    pageCount: 0,
    pageLimit: 10,
    rowsTotal: 0
  },

  getters: {
    getRepricingLog: state => {
      return state.items;
    },
    getRepricingLogPager: state => {
      return {
        page: state.page,
        count: state.pageCount,
        limit: state.pageLimit,
        total: state.rowsTotal
      };
    },
    getRepricingLogLoading: state => {
      return state.loading;
    }
  },

  mutations: {
    [SEARCH_REPRICING_LOG_RESULTS](state, items) {
      if (items.rows) state.items = items.rows;
      if (items.page) state.page = items.page;
      if (items.pageCount) state.pageCount = items.pageCount;
      if (items.pageLimit) state.pageLimit = items.pageLimit;
      if (items.rowsTotal) state.rowsTotal = items.rowsTotal;
    },
    [SEARCH_REPRICING_LOG_LOADING](state, { loading }) {
      state.loading = loading;
    }
  },

  actions: {
    [SEARCH_REPRICING_LOG]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repricingService/getRepricingLog",
          params: params,
          success: `repricer/repricingLog/${SEARCH_REPRICING_LOG_RESULTS}`,
          loading: `repricer/repricingLog/${SEARCH_REPRICING_LOG_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default repricingLog;
