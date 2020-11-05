import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { GET_OUT_OF_SYNC_PRICES } from "@/store/action-types";
import {
  OUT_OF_SYNC_PRICES_LOADING,
  SET_OUT_OF_SYNC_PRICES
} from "@/store/mutation-types";

const priceSync = {
  namespaced: true,

  state: {
    loading: false,
    items: []
  },

  mutations: {
    [SET_OUT_OF_SYNC_PRICES](state, data) {
      state.items = data;
    },
    [OUT_OF_SYNC_PRICES_LOADING](state, data) {
      state.loading = data.loading;
    }
  },

  getters: {
    getLoading: state => {
      return state.loading;
    },
    getItems: state => {
      return state.items;
    }
  },

  actions: {
    async [GET_OUT_OF_SYNC_PRICES]({ commit, dispatch }, payload) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/inventory/linnworks/outOfSyncPrices",
          params: payload,
          success: `linnworks/priceSync/${SET_OUT_OF_SYNC_PRICES}`,
          loading: `linnworks/priceSync/${OUT_OF_SYNC_PRICES_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default priceSync;
