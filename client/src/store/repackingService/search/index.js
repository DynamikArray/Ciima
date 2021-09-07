import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { getField, updateField } from "vuex-map-fields";

import {
  REPACKING_SERVICE_SEARCH_ITEMS,
  REPACKING_SERVICE_SEARCH_SUBMIT_ITEM,
  REPACKING_SERVICE_SEARCH_REMOVE_ITEM
} from "@/store/action-types";
import { REPACKING_SERVICE_SEARCH_RESULTS, REPACKING_SERVICE_SEARCH_LOADING } from "@/store/mutation-types";

const search = {
  namespaced: true,

  state: {
    thresholdPrice: 0.5,
    flaggedItemsOnly: true,
    items: [],
    loading: false
  },

  getters: {
    getField,
    perComicPrice: state => {
      return state.items;
    },
    perComicPriceLoading: state => {
      return state.loading;
    }
  },

  mutations: {
    updateField,
    [REPACKING_SERVICE_SEARCH_RESULTS](state, data) {
      state.items = data;
    },
    [REPACKING_SERVICE_SEARCH_LOADING](state, data) {
      state.loading = data.loading;
    }
  },
  actions: {
    [REPACKING_SERVICE_SEARCH_ITEMS]({ dispatch, commit, state }, params) {
      const searchParams = {
        thresholdPrice: state.thresholdPrice,
        flaggedItemsOnly: state.flaggedItemsOnly,
        ...params
      };

      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repackingService/searchItems",
          params: searchParams,
          success: `repackingService/search/${REPACKING_SERVICE_SEARCH_RESULTS}`,
          loading: `repackingService/search/${REPACKING_SERVICE_SEARCH_LOADING}`
        },
        { root: true }
      );
    },
    async [REPACKING_SERVICE_SEARCH_SUBMIT_ITEM]({ dispatch, commit, state }, params) {
      const searchParams = {
        ...params
      };
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repackingService/submitItem",
          params: searchParams,
          success: false,
          loading: `repackingService/search/${REPACKING_SERVICE_SEARCH_LOADING}`
        },
        { root: true }
      );
    },
    async [REPACKING_SERVICE_SEARCH_REMOVE_ITEM]({ dispatch, commit, state }, params) {
      const results = state.items.filter(item => item.pkStockItemID !== params.pkStockItemId);
      commit(REPACKING_SERVICE_SEARCH_RESULTS, results);
    }
  }
};

export default search;
