import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_TITLES,
  SEARCH_TITLES_RESULTS_CLEAR,
  SEARCH_TITLES_INVENTORY
} from "@/store/action-types";
import {
  SEARCH_TITLES_SELECTED_SET,
  SEARCH_TITLES_SELECTED_CLEAR,
  SEARCH_TITLES_RESULTS_SET,
  SEARCH_TITLES_RESULTS_LOADING,
  SEARCH_TITLES_INVENTORY_SET,
  SEARCH_TITLES_INVENTORY_CLEAR,
  SEARCH_TITLES_INVENTORY_LOADING
} from "@/store/mutation-types";

const titleSearch = {
  namespaced: true,

  state: {
    selected: false,
    items: false,
    inventory: false,
    inventory_loading: false,
    loading: false
  },

  mutations: {
    [SEARCH_TITLES_SELECTED_SET](state, data) {
      state.selected = data;
    },
    [SEARCH_TITLES_SELECTED_CLEAR](state) {
      state.selected = false;
    },
    [SEARCH_TITLES_INVENTORY_SET](state, data) {
      state.inventory = data;
    },
    [SEARCH_TITLES_INVENTORY_CLEAR](state) {
      state.inventory = false;
    },
    [SEARCH_TITLES_INVENTORY_LOADING](state, data) {
      state.inventory_loading = data.loading;
    },
    [SEARCH_TITLES_RESULTS_SET](state, data) {
      state.items = data;
    },
    [SEARCH_TITLES_RESULTS_CLEAR](state) {
      state.items = false;
    },
    [SEARCH_TITLES_RESULTS_LOADING](state, data) {
      state.loading = data.loading;
    }
  },

  actions: {
    [SEARCH_TITLES]({ dispatch, commit }, params) {
      dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/titleSearch",
          params: params,
          success: `titleSearch/${SEARCH_TITLES_RESULTS_SET}`,
          loading: `titleSearch/${SEARCH_TITLES_RESULTS_LOADING}`
        },
        { root: true }
      );
    },
    async [SEARCH_TITLES_INVENTORY]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/linnworks/search",
          params: params,
          success: `titleSearch/${SEARCH_TITLES_INVENTORY_SET}`,
          loading: `titleSearch/${SEARCH_TITLES_INVENTORY_LOADING}`
        },
        { root: true }
      );
      return resp;
    }
  }
};

export default titleSearch;
