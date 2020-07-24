import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { SEARCH_PRICELIST, GET_PRICELIST_RECORD } from "@/store/action-types";
import {
  SEARCH_PRICELIST_RESULTS_SET,
  GET_PRICELIST_RECORD_SET,
  PRICELIST_LOADING
} from "@/store/mutation-types";

const pricelist = {
  namespaced: true,
  modules: {},
  state: {
    selectedRecord: false,
    items: [],
    pager: false,
    loading: false
  },
  getters: {
    getSelectedRecord: state => {
      return state.selectedRecord;
    },
    getItems: state => {
      return state.items;
    },
    getItemsPager: state => {
      return state.pager;
    },
    getLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    [GET_PRICELIST_RECORD_SET](state, data) {
      state.selectedRecord = data;
    },
    [SEARCH_PRICELIST_RESULTS_SET](state, data) {
      state.items = data.rows;
      state.pager = data.pager;
    },
    [PRICELIST_LOADING](state, data) {
      state.loading = data.loading;
    }
  },
  actions: {
    [SEARCH_PRICELIST]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/pricelist/search",
          params: params,
          success: `pricelist/${SEARCH_PRICELIST_RESULTS_SET}`,
          loading: `pricelist/${PRICELIST_LOADING}`
        },
        { root: true }
      );
    },
    [GET_PRICELIST_RECORD]({ dispatch, commit }, issueId) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: `/pricelist/${issueId}`,
          params: false,
          success: `pricelist/${GET_PRICELIST_RECORD_SET}`,
          loading: `pricelist/${PRICELIST_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default pricelist;
