import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { AUDIT_LOG_FETCH } from "@/store/action-types";
import { AUDIT_LOG_LOADING, AUDIT_LOG_RESULTS } from "@/store/mutation-types";

const auditLog = {
  namespaced: true,
  state: {
    loading: false,
    items: [],
    page: 1,
    pageCount: 0,
    pageLimit: 0,
    rowsTotal: 0
  },
  mutations: {
    [AUDIT_LOG_LOADING](state, data) {
      state.loading = data.loading;
    },
    [AUDIT_LOG_RESULTS](state, data) {
      state.items = [...data.rows];
      state.rowsTotal = data.rowsTotal;
      state.pageLimit = data.pageLimit;
      state.pageCount = data.pageCount;
      state.page = data.page;
    }
  },
  actions: {
    async [AUDIT_LOG_FETCH]({ dispatch, commit }, params) {
      await dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/auditLog/search",
          params: params,
          success: `auditLog/${AUDIT_LOG_RESULTS}`,
          loading: `auditLog/${AUDIT_LOG_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default auditLog;
