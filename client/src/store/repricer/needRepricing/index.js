import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_NEED_REPRICING_ITEMS,
  SUBMIT_NEED_REPRICING_ITEM
} from "@/store/action-types";
import {
  SEARCH_NEED_REPRICING_ITEMS_LOADING,
  SEARCH_NEED_REPRICING_ITEMS_RESULTS,
  SEARCH_NEED_REPRICING_ITEMS_CLEAR,
  REMOVE_NEED_REPRICING_ITEM_BY_ID
} from "@/store/mutation-types";

const needRepricing = {
  namespaced: true,

  state: {
    items: [],
    loading: false
  },

  getters: {
    getItems: state => {
      return state.items;
    },
    getLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    [SEARCH_NEED_REPRICING_ITEMS_CLEAR](state) {
      state.items = [];
    },
    [SEARCH_NEED_REPRICING_ITEMS_RESULTS](state, items) {
      state.items = items;
    },
    [SEARCH_NEED_REPRICING_ITEMS_LOADING](state, { loading }) {
      state.loading = loading;
    },
    [REMOVE_NEED_REPRICING_ITEM_BY_ID](state, pkStockItemID) {
      state.items = state.items.filter(
        item => item.pkStockItemID != pkStockItemID
      );
    }
  },

  actions: {
    [SEARCH_NEED_REPRICING_ITEMS]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repricingService/getItemsList",
          params: params,
          success: `repricer/needRepricing/${SEARCH_NEED_REPRICING_ITEMS_RESULTS}`,
          loading: `repricer/needRepricing/${SEARCH_NEED_REPRICING_ITEMS_LOADING}`
        },
        { root: true }
      );
    },

    async [SUBMIT_NEED_REPRICING_ITEM]({ dispatch, commit }, params) {
      return dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repricingService/repriceItemById",
          params: params,
          //success: `repricer/needRepricing/${SEARCH_NEED_REPRICING_ITEMS_RESULTS}`,
          loading: `repricer/needRepricing/${SEARCH_NEED_REPRICING_ITEMS_LOADING}`
        },
        { root: true }
      ).then(res => {
        if (res.result) {
          commit(`${REMOVE_NEED_REPRICING_ITEM_BY_ID}`, params.pkStockItemID);
        }
        return res;
      });
    }
  }
};

export default needRepricing;
