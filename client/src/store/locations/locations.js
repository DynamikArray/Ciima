import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SEARCH_BOXES_RESULTS,
  SEARCH_BOXES_LOADING,
  SEARCH_CARDS_RESULTS,
  SEARCH_CARDS_LOADING,
  SEARCH_PRODUCTS_RESULTS,
  SEARCH_PRODUCTS_LOADING,
  BOX_ACTION_RESULTS,
  BOX_ACTION_LOADING,
  CARD_ACTION_RESULTS,
  CARD_ACTION_LOADING
} from "@/store/mutation-types";

import {
  SEARCH_BOXES,
  SEARCH_BOXES_PRODUCTS,
  SEARCH_CARDS,
  SEARCH_CARDS_PRODUCTS,
  CREATE_BOX,
  UPDATE_BOX,
  DELETE_BOX,
  CREATE_CARD,
  CREATE_CARDS,
  UPDATE_CARD,
  DELETE_CARD
} from "@/store/action-types";

const locations = {
  namespaced: true,
  state: {
    boxes: [],
    boxes_loading: false,
    cards: [],
    cards_loading: false,
    products: [],
    products_loading: false,
    selectedBox: false,
    selectedCard: false,
    action_loading: false,
    actionResult: false
  },

  mutations: {
    //Create Box
    [BOX_ACTION_RESULTS](state, data) {
      state.actionResult = data;
    },
    [BOX_ACTION_LOADING](state, data) {
      state.action_loading = data.loading;
    },
    //Create Box
    [CARD_ACTION_RESULTS](state, data) {
      state.actionResult = data;
    },
    [CARD_ACTION_LOADING](state, data) {
      state.action_loading = data.loading;
    },
    //Search Boxes
    [SEARCH_BOXES_RESULTS](state, data) {
      state.boxes = data.rows;
    },
    [SEARCH_BOXES_LOADING](state, data) {
      state.boxes_loading = data.loading;
    },
    //Search Cards
    [SEARCH_CARDS_RESULTS](state, data) {
      state.cards = data.rows;
    },
    [SEARCH_CARDS_LOADING](state, data) {
      state.cards_loading = data.loading;
    },
    //Search Products
    [SEARCH_PRODUCTS_RESULTS](state, data) {
      state.products = data.rows;
    },
    [SEARCH_PRODUCTS_LOADING](state, data) {
      state.products_loading = data.loading;
    }
  },
  getters: {
    getCurrentProducts: state => () => {
      const { products } = state;

      const filteredItems = Array.from(new Set(products.map(a => a.location)))
        .map(location => {
          return products.find(a => {
            if (a.location === location) {
              return true;
            }
            return false;
          });
        })
        .filter(item => {
          if (item.hasEnded && item.quantitySold > 0) {
            return false;
          }
          return true;
        });

      return filteredItems;
    }
  },
  actions: {
    //
    //
    async [SEARCH_BOXES]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/location/boxes/search",
          params: params,
          success: `locations/${SEARCH_BOXES_RESULTS}`,
          loading: `locations/${SEARCH_BOXES_LOADING}`
        },
        { root: true }
      );
      return resp;
    },
    //
    //
    async [SEARCH_CARDS]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/location/cards/search",
          params: params,
          success: `locations/${SEARCH_CARDS_RESULTS}`,
          loading: `locations/${SEARCH_CARDS_LOADING}`
        },
        { root: true }
      );
      return resp;
    },
    //
    //
    async [CREATE_BOX]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/location/box",
          params: params,
          success: `locations/${BOX_ACTION_RESULTS}`,
          loading: `locations/${BOX_ACTION_LOADING}`
        },
        { root: true }
      );
      return resp;
    },
    //
    //
    async [UPDATE_BOX]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "put",
          url: `/inventory/location/box/${params.id}`,
          params: params,
          success: `locations/${BOX_ACTION_RESULTS}`,
          loading: `locations/${BOX_ACTION_LOADING}`
        },
        { root: true }
      );
      return resp;
    },
    //
    //
    async [DELETE_BOX]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "delete",
          url: `/inventory/location/box/${params.id}`,
          params: false,
          success: `locations/${BOX_ACTION_RESULTS}`,
          loading: `locations/${BOX_ACTION_LOADING}`
        },
        { root: true }
      );
      return resp;
    },

    async [CREATE_CARD]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/location/card",
          params: params,
          success: `locations/${CARD_ACTION_RESULTS}`,
          loading: `locations/${CARD_ACTION_LOADING}`
        },
        { root: true }
      );
      return resp;
    },

    async [CREATE_CARDS]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/inventory/location/cards",
          params: params,
          success: `locations/${CARD_ACTION_RESULTS}`,
          loading: `locations/${CARD_ACTION_LOADING}`
        },
        { root: true }
      );
      return resp;
    },
    //
    //
    async [UPDATE_CARD]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "put",
          url: `/inventory/location/card/${params.id}`,
          params: params,
          success: `locations/${CARD_ACTION_RESULTS}`,
          loading: `locations/${CARD_ACTION_LOADING}`
        },
        { root: true }
      );
      return resp;
    },
    //
    //
    async [DELETE_CARD]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "delete",
          url: `/inventory/location/card/${params.id}`,
          params: false,
          success: `locations/${CARD_ACTION_RESULTS}`,
          loading: `locations/${CARD_ACTION_LOADING}`
        },
        { root: true }
      );
      return resp;
    },
    //
    //
    async [SEARCH_BOXES_PRODUCTS]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: `/inventory/location/box/${params.id}/products`,
          params: params,
          success: `locations/${SEARCH_PRODUCTS_RESULTS}`,
          loading: `locations/${SEARCH_PRODUCTS_LOADING}`
        },
        { root: true }
      );
      return resp;
    },
    //
    //
    async [SEARCH_CARDS_PRODUCTS]({ dispatch, commit }, params) {
      const resp = await dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: `/inventory/location/card/${params.id}/products`,
          params: params,
          success: `locations/${SEARCH_PRODUCTS_RESULTS}`,
          loading: `locations/${SEARCH_PRODUCTS_LOADING}`
        },
        { root: true }
      );
      return resp;
    }
  } //end actions
};

export default locations;
