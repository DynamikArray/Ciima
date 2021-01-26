import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  GET_SELECTED_LINNWORKS_ITEM,
  UPDATE_FIELD_SELECTED_LINNWORKS_ITEM,
  UPDATE_PRICE_SELECTED_LINNWORKS_ITEM,
  UPDATE_EXTENDED_PROPERTY_SELECTED_LINNWORKS_ITEM,
  UPDATE_TEMPLATE_INSTANT_SELECTED_LINNWORKS_ITEM,
  ADD_PRICE_SELECTED_LINNWORKS_ITEM
} from "@/store/action-types";

import { SELECTED_LINNWORKS_ITEM_LOADING, SELECTED_LINNWORKS_ITEM_RESULT } from "@/store/mutation-types";

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
    async [GET_SELECTED_LINNWORKS_ITEM]({ commit, dispatch }, payload) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: `/inventory/selectItem`,
          params: payload,
          success: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_RESULT}`,
          loading: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_LOADING}`
        },
        { root: true }
      );
    },
    async [UPDATE_FIELD_SELECTED_LINNWORKS_ITEM]({ commit, dispatch }, payload) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: `/inventory/updateItemField`,
          params: payload,
          //success: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_RESULT}`,
          loading: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_LOADING}`
        },
        { root: true }
      );
    },
    async [UPDATE_EXTENDED_PROPERTY_SELECTED_LINNWORKS_ITEM]({ commit, dispatch }, payload) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: `/inventory/updateItemExtenedProperties`,
          params: payload,
          //success: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_RESULT}`,
          loading: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_LOADING}`
        },
        { root: true }
      );
    },
    async [UPDATE_TEMPLATE_INSTANT_SELECTED_LINNWORKS_ITEM]({ commit, dispatch }, payload) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: `/inventory/updateItemTemplateInstant`,
          params: payload,
          //success: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_RESULT}`,
          loading: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_LOADING}`
        },
        { root: true }
      );
    },
    async [UPDATE_PRICE_SELECTED_LINNWORKS_ITEM]({ commit, dispatch }, payload) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: `/inventory/updateItemPrice`,
          params: payload,
          //success: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_RESULT}`,
          loading: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_LOADING}`
        },
        { root: true }
      );
    },
    async [ADD_PRICE_SELECTED_LINNWORKS_ITEM]({ commit, dispatch }, payload) {
      return await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: `/inventory/addItemPrice`,
          params: payload,
          //success: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_RESULT}`,
          loading: `linnworks/inventory/selectedItem/${SELECTED_LINNWORKS_ITEM_LOADING}`
        },
        { root: true }
      );
    }
  }
};

export default selectedItem;
