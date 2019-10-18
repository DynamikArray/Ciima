import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_INVENTORY_RESULTS,
  SEARCH_INVENTORY_LOADING,
  UPDATE_INVENTORY_LOADING,
  UPDATE_INVENTORY_RESPONSE,
  UPDATE_API_STATUS
} from "@/store/mutation-types";
import {
  SEARCH_INVENTORY,
  UPDATE_INVENTORY_ITEM_LEVELS
} from "@/store/action-types";

const linnworks = {
  namespaced: true,
  state: {
    loading: false,
    items: []
  },

  mutations: {
    [SEARCH_INVENTORY_RESULTS](state, data) {
      state.items = data;
    },
    [SEARCH_INVENTORY_LOADING](state, data) {
      state.loading = data.loading;
    },
    [UPDATE_INVENTORY_LOADING](state, data) {
      state.loading = data.loading;
    },
    [UPDATE_INVENTORY_RESPONSE](state, data) {}
  },
  actions: {
    async [SEARCH_INVENTORY]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/linnworks/search",
          params: params,
          success: `linnworks/${SEARCH_INVENTORY_RESULTS}`,
          loading: `linnworks/${SEARCH_INVENTORY_LOADING}`
        },
        { root: true }
      );
      return resp;
    },

    async [UPDATE_INVENTORY_ITEM_LEVELS]({ dispatch, commit }, params) {
      const { toastr } = params;
      delete params.toastr;

      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/linnworks/update",
          params: params,
          success: `linnworks/${UPDATE_INVENTORY_RESPONSE}`,
          loading: `linnworks/${UPDATE_INVENTORY_LOADING}`,
          toastr
        },
        { root: true }
      );
      return resp;
    }
  }
};

export default linnworks;
