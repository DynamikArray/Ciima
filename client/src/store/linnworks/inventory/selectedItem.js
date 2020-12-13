import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { GET_SELECTED_LINNWORKS_ITEM } from "@/store/action-types";
import {
  SELECTED_LINNWORKS_ITEM_LOADING,
  SELECTED_LINNWORKS_ITEM_RESULT
} from "@/store/mutation-types";

const selectedItem = {
  namespaced: true,

  state: {
    loading: false,
    item: {}
  },

  mutations: {
    [SELECTED_LINNWORKS_ITEM_RESULT](state, data) {
      state.item = data;
    },
    [SELECTED_LINNWORKS_ITEM_LOADING](state, data) {
      state.loading = data.loading;
    }
  },

  getters: {
    getLoading: state => {
      return state.loading;
    },
    getItem: state => {
      return state.item;
    }
  },

  actions: {
    async [GET_SELECTED_LINNWORKS_ITEM](
      { commit, dispatch },
      { pkStockItemID }
    ) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: `/inventory/item/${pkStockItemID}`,
          success: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_RESULT}`,
          loading: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default selectedItem;
