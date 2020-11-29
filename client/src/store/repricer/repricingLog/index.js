import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

/*
import { SEARCH_IN_PROGRESS_REPRICING_ITEMS } from "@/store/action-types";
import {
  SEARCH_IN_PROGRESS_REPRICING_ITEMS_LOADING,
  SEARCH_IN_PROGRESS_REPRICING_ITEMS_RESULTS,
  SEARCH_IN_PROGRESS_REPRICING_ITEMS_CLEAR
} from "@/store/mutation-types";
*/

const repricingLog = {
  namespaced: true,

  state: {
    items: [],
    loading: false
  },

  getters: {
    /*
      getSoldItems: state => {
        return state.items;
      }
      */
  },

  mutations: {
    /*
    [SEARCH_IN_PROGRESS_REPRICING_ITEMS_CLEAR](state) {
      state.items = [];
    },
    [SEARCH_IN_PROGRESS_REPRICING_ITEMS_RESULTS](state, items) {
      state.items = items;
    },
    [SEARCH_IN_PROGRESS_REPRICING_ITEMS_LOADING](state, { loading }) {
      state.loading = loading;
    }
    */
  },

  actions: {
    /*
    [SEARCH_IN_PROGRESS_REPRICING_ITEMS]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/reporting/getSoldItems",
          params: params,
          success: `reports/${SEARCH_IN_PROGRESS_REPRICING_ITEMS_RESULTS}`,
          loading: `reports/${SEARCH_IN_PROGRESS_REPRICING_ITEMS_LOADING}`
        },
        { root: true }
      );
    }
    */
  }
};

export default repricingLog;
