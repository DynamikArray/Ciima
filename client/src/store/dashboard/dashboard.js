import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { DASHBOARD_DAILY_FETCH } from "@/store/action-types";
import { DASHBOARD_LOADING, DASHBOARD_DAILY_RESULTS, DASHBOARD_DAILY_RESULTS_CLEAR } from "@/store/mutation-types";

const dashboard = {
  namespaced: true,
  state: {
    loading: false,
    dailyResults: [],
    userDraftsSummary: [],
    userTargetDollars: 0
  },
  getters: {
    dailyResults: state => state.dailyResults,
    userDraftsSummary: state => state.userDraftsSummary,
    targetInDollars: state => state.userTargetDollars,
    percentComplete: state => {
      return state.dailyResults.reduce((acc, item) => {
        return acc + item.percentOfTarget;
      }, 0);
    }
  },
  mutations: {
    [DASHBOARD_LOADING](state, data) {
      state.loading = data.loading;
    },
    [DASHBOARD_DAILY_RESULTS](state, data) {
      state.dailyResults = data.userTotals;
      state.userDraftsSummary = data.userDrafts;
      state.userTargetDollars = data.userTarget.targetValue;
    },
    [DASHBOARD_DAILY_RESULTS_CLEAR](state) {
      state.dailyResults = [];
      state.userDraftsSummary = [];
      state.userTargetDollars = 0;
    }
  },
  actions: {
    async [DASHBOARD_DAILY_FETCH]({ dispatch, commit }, params) {
      await dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/dashboard",
          params: params,
          success: `dashboard/${DASHBOARD_DAILY_RESULTS}`,
          loading: `dashboard/${DASHBOARD_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default dashboard;
