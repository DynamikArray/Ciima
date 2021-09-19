import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { getField, updateField } from "vuex-map-fields";
import { REPACKING_SERVICE_COMPLETED_ITEMS } from "@/store/action-types";
import { REPACKING_SERVICE_COMPLETED_RESULTS, REPACKING_SERVICE_COMPLETED_LOADING } from "@/store/mutation-types";

const completed = {
  namespaced: true,

  state: {
    items: [],
    loading: false
  },

  getters: {
    getField,
    completedItems: state => {
      return state.items;
    },
    completedItemsLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    updateField,
    [REPACKING_SERVICE_COMPLETED_RESULTS](state, data) {
      state.items = data;
    },
    [REPACKING_SERVICE_COMPLETED_LOADING](state, data) {
      state.loading = data.loading;
    }
  },
  actions: {
    [REPACKING_SERVICE_COMPLETED_ITEMS]({ dispatch, commit, state }, params) {
      const searchParams = {
        ...params
      };

      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/repackingService/completedItems",
          params: searchParams,
          success: `repackingService/completed/${REPACKING_SERVICE_COMPLETED_RESULTS}`,
          loading: `repackingService/completed/${REPACKING_SERVICE_COMPLETED_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default completed;
