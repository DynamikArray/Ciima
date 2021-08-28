import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { getField, updateField } from "vuex-map-fields";

import { PRICING_SERVICE_SEARCH_ITEMS } from "@/store/action-types";
import { PRICING_SERVICE_SEARCH_RESULTS, PRICING_SERVICE_SEARCH_LOADING } from "@/store/mutation-types";

const pricingService = {
  namespaced: true,

  state: {
    thresholdPrice: 0.5,
    flaggedItemsOnly: true,
    loading: false,
    items: []
  },

  mutations: {
    [PRICING_SERVICE_SEARCH_RESULTS](state, data) {
      state.items = data;
    },
    [PRICING_SERVICE_SEARCH_LOADING](state, data) {
      state.loading = data.loading;
    },
    updateField
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

  actions: {
    [PRICING_SERVICE_SEARCH_ITEMS]({ dispatch, commit, state }, params) {
      const searchParams = {
        thresholdPrice: state.thresholdPrice,
        flaggedItemsOnly: state.flaggedItemsOnly,
        ...params
      };

      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/pricingService/getItemsList",
          params: searchParams,
          success: `pricingService/${PRICING_SERVICE_SEARCH_RESULTS}`,
          loading: `pricingService/${PRICING_SERVICE_SEARCH_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default pricingService;
