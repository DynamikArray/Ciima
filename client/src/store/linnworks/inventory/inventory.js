import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_LINNWORKS_INVENTORY } from "@/store/action-types";
import {
  SEARCH_LINNWORKS_INVENTORY_LOADING,
  SEARCH_LINNWORKS_INVENTORY_RESULTS
} from "@/store/mutation-types";

const priceSync = {
  namespaced: true,

  state: {
    loading: false,
    items: []
  },

  mutations: {
    [SEARCH_LINNWORKS_INVENTORY_RESULTS](state, data) {
      state.items = data;
    },
    [SEARCH_LINNWORKS_INVENTORY_LOADING](state, data) {
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
    async [SEARCH_LINNWORKS_INVENTORY]({ commit, dispatch }, payload) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/search",
          params: payload,
          success: `linnworks/inventory/${SEARCH_LINNWORKS_INVENTORY_RESULTS}`,
          loading: `linnworks/inventory/${SEARCH_LINNWORKS_INVENTORY_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default priceSync;
