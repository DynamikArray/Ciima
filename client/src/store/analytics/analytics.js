import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { ANALYTICS_FETCH } from "@/store/action-types";
import { ANALYTICS_LOADING, ANALYTICS_RESULTS } from "@/store/mutation-types";

const analytics = {
  namespaced: true,
  state: {
    loading: false,
    items: false
  },
  mutations: {
    [ANALYTICS_LOADING](state, data) {
      state.loading = data.loading;
    },
    [ANALYTICS_RESULTS](state, data) {
      state.items = data;
    }
  },
  getters: {
    newItems: state => {
      if (state.items) {
        return state.items.newItems || [];
      }
      return [];
    },
    existingItems: state => {
      if (state.items) {
        return state.items.existingItems || [];
      }
      return [];
    },
    dailyTotals: state => {
      if (state.items) {
        return state.items.dailyTotals || [];
      }
      return [];
    },
    weeklyTotals: state => {
      if (state.items) {
        return state.items.weeklyTotals || [];
      }
      return [];
    }
  },
  actions: {
    async [ANALYTICS_FETCH]({ dispatch, commit }, params) {
      await dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/analytics",
          params: params,
          success: `analytics/${ANALYTICS_RESULTS}`,
          loading: `analytics/${ANALYTICS_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default analytics;
