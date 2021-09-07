import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { getField, updateField } from "vuex-map-fields";
import {
  REPACKING_SERVICE_PENDING_ITEMS,
  REPACKING_SERVICE_PENDING_FINALIZE_ITEM,
  REPACKING_SERVICE_PENDING_REMOVE_ITEM
} from "@/store/action-types";
import { REPACKING_SERVICE_PENDING_RESULTS, REPACKING_SERVICE_PENDING_LOADING } from "@/store/mutation-types";

const pending = {
  namespaced: true,

  state: {
    items: [],
    loading: false
  },

  getters: {
    getField,
    pendingItems: state => {
      return state.items;
    },
    pendingItemsLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    updateField,
    [REPACKING_SERVICE_PENDING_RESULTS](state, data) {
      state.items = data;
    },
    [REPACKING_SERVICE_PENDING_LOADING](state, data) {
      state.loading = data.loading;
    }
  },
  actions: {
    [REPACKING_SERVICE_PENDING_ITEMS]({ dispatch, commit, state }, params) {
      const searchParams = {
        ...params
      };

      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repackingService/pendingItems",
          params: searchParams,
          success: `repackingService/pending/${REPACKING_SERVICE_PENDING_RESULTS}`,
          loading: `repackingService/pending/${REPACKING_SERVICE_PENDING_LOADING}`
        },
        { root: true }
      );
    },
    async [REPACKING_SERVICE_PENDING_FINALIZE_ITEM]({ dispatch, commit, state }, params) {
      const searchParams = {
        ...params
      };
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repackingService/finalizeItem",
          params: searchParams,
          success: false,
          loading: `repackingService/pending/${REPACKING_SERVICE_PENDING_LOADING}`
        },
        { root: true }
      );
    },
    async [REPACKING_SERVICE_PENDING_REMOVE_ITEM]({ dispatch, commit, state }, params) {
      const results = state.items.filter(item => item.pkStockItemID !== params.pkStockItemId);
      commit(REPACKING_SERVICE_PENDING_RESULTS, results);
    }
  }
};

export default pending;
