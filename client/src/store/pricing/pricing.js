import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { PRICE_SEARCH } from "@/store/action-types";
import {
  PRICE_SEARCH_LOADING,
  PRICE_SEARCH_STRING,
  PRICE_SEARCH_RESULTS_EBAY_ACTIVE,
  PRICE_SEARCH_RESULTS_EBAY_ENDED,
  PRICE_SEARCH_RESULTS_MYCOMICSHOP,
  PRICE_SEARCH_CLEAR
} from "@/store/mutation-types";

const pricing = {
  namespaced: true,

  state: {
    searchString: "",
    loading: 0,
    ebayActive: [],
    ebayEnded: [],
    mycomicshop: []
  },
  mutations: {
    [PRICE_SEARCH_CLEAR](state) {
      state.ebayActive = [];
      state.ebayEnded = [];
      state.mycomicshop = [];
    },
    [PRICE_SEARCH_STRING](state, searchString) {
      state.searchString = searchString;
    },
    [PRICE_SEARCH_RESULTS_EBAY_ACTIVE](state, items) {
      state.ebayActive = items;
    },
    [PRICE_SEARCH_RESULTS_EBAY_ENDED](state, items) {
      state.ebayEnded = items;
    },
    [PRICE_SEARCH_RESULTS_MYCOMICSHOP](state, items) {
      state.mycomicshop = items;
    },
    [PRICE_SEARCH_LOADING](state, { loading }) {
      if (loading) state.loading = ++state.loading;
      if (!loading) state.loading = --state.loading;
    }
  },
  getters: {
    getEbayActive: state => {
      return state.ebayActive.filter(item => {
        if (item.site === "ebay") {
          if (!item.meta.sellingStatus.blnSold) return item;
        }
      });
    },
    getEbayEnded: state => {
      return state.ebayEnded.filter(item => {
        if (item.site === "ebay") {
          if (item.meta.sellingStatus.blnSold) return item;
        }
      });
    },
    getMyComicShop: state => {
      return state.mycomicshop.filter(item => item.site === "mycomicshop");
    }
  },

  actions: {
    [PRICE_SEARCH]({ dispatch, commit }, params) {
      let success_mutation = false;

      switch (params.searchType) {
        case "ebayActive":
          success_mutation = `pricing/${PRICE_SEARCH_RESULTS_EBAY_ACTIVE}`;
          break;
        case "ebayEnded":
          success_mutation = `pricing/${PRICE_SEARCH_RESULTS_EBAY_ENDED}`;
          break;
        case "myComicShop":
          success_mutation = `pricing/${PRICE_SEARCH_RESULTS_MYCOMICSHOP}`;
          break;
        default:
      }

      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/pricing",
          params: params,
          success: success_mutation,
          loading: `pricing/${PRICE_SEARCH_LOADING}`
        },
        { root: true }
      );

      //
    }
  }
};

export default pricing;
