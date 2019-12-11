import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//build a blankDraft object for mapping over to both set, and clear state
const defaultState = {
  //loading indicators
  loadingDraft: false,
  savingDraft: false,
  //form data
  id: null,
  inventoryTitle: "",
  extraDescription: "",
  locationCode: "",
  grade: "",
  quantity: null,
  price: null,
  upc: "",
  ebaySiteCategoryId: null,
  ebayStoreCategoryIdOne: null,
  ebayStoreCategoryIdTwo: null,
  series: "",
  mainCharacter: "",
  issueNumbers: "",
  publisher: "",
  publishedYear: "",
  publishedDate: "",
  main_image: false,
  other_images: []
};

import { EDIT_DRAFT_FETCH, EDIT_DRAFT_SAVE } from "@/store/action-types";
import {
  EDIT_DRAFT_CLEAR,
  EDIT_DRAFT_LOAD,
  EDIT_DRAFT_LOADING,
  EDIT_DRAFT_UPDATED
} from "@/store/mutation-types";
import { getField, updateField } from "vuex-map-fields";

const editDraft = {
  namespaced: true,
  state: {
    ...defaultState
  },
  getters: {
    getField
  },
  mutations: {
    updateField,

    [EDIT_DRAFT_LOAD](state, draft) {
      Object.keys(draft).forEach(key => {
        state[key] = draft[key];
      });
    },
    [EDIT_DRAFT_LOADING](state, data) {
      state.loadingDraft = data.loading;
    },
    [EDIT_DRAFT_CLEAR](state) {
      state = { ...defaultState };
    },
    [EDIT_DRAFT_UPDATED](state) {
      state = { ...defaultState };
    }
  },
  actions: {
    async [EDIT_DRAFT_FETCH]({ dispatch, commit }, params) {
      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "get",
            url: `/draft/${params.id}`,
            success: `editDraft/${EDIT_DRAFT_LOAD}`,
            loading: `editDraft/${EDIT_DRAFT_LOADING}`
          },
          { root: true }
        );
        return resp;
      } catch (err) {
        throw err;
      }
    },

    async [EDIT_DRAFT_SAVE]({ dispatch, commit }, params) {
      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "put",
            url: `/draft/${params.id}`,
            params,
            success: `editDraft/${EDIT_DRAFT_UPDATED}`,
            loading: `editDraft/${EDIT_DRAFT_LOADING}`
          },
          { root: true }
        );
        return resp;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default editDraft;
