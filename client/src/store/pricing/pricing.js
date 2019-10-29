import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { PRICE_SEARCH } from "@/store/action-types";
import {
  PRICE_SEARCH_LOADING,
  PRICE_SEARCH_STRING,
  PRICE_SEARCH_RESULTS,
  PRICE_SEARCH_CLEAR
} from "@/store/mutation-types";

const pricing = {
  namespaced: true,

  state: {
    searchString: "",
    loading: false,
    items: []
  },
  mutations: {
    [PRICE_SEARCH_CLEAR](state) {
      state.items = [];
    },
    [PRICE_SEARCH_STRING](state, searchString) {
      state.searchString = searchString;
    },
    [PRICE_SEARCH_RESULTS](state, items) {
      state.items = [...state.items, ...items];
    },
    [PRICE_SEARCH_LOADING](state, loading) {
      if (loading) state.loading = state.loading++;
      if (!loading) state.loading = state.loading--;
    }
  },
  getters: {
    getEbayActive: state => {
      return state.items.filter(item => {
        if (item.site === "ebay") {
          const listingType = (((item || {}).meta || {}).listingDate || {})
            .type;
          if (listingType === "findItemsAdvanced") return item;
        }
      });
    },
    getEbayEnded: state => {
      return state.items.filter(item => {
        if (item.site === "ebay") {
          const listingType = (((item || {}).meta || {}).listingDate || {})
            .type;
          if (listingType === "findCompletedItems") return item;
        }
      });
    },
    getMyComicShop: state => {
      return state.items.filter(item => item.site === "mycomicshop");
    }
  },

  actions: {
    [PRICE_SEARCH]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/pricing",
          params: params,
          success: `pricing/${PRICE_SEARCH_RESULTS}`,
          loading: `pricing/${PRICE_SEARCH_LOADING}`
        },
        { root: true }
      );

      //
    }
  }
};

export default pricing;
