import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { getField, updateField } from "vuex-map-fields";

import { CURRENT_GTC_DRAFT_SAVE } from "@/store/action-types";

import {
  RESET_GTC_DRAFT,
  UPDATE_GTC_DRAFT_IMAGES,
  GTC_SET_IMAGE_TO_CROP,
  CURRENT_GTC_DRAFT_UPDATE,
  CURRENT_GTC_DRAFT_SAVING
} from "@/store/mutation-types";

const defaultDraft = {
  inventoryTitle: "",
  locationCode: "EBAY-GTC-",

  quantity: null,
  price: null,

  ebaySiteCategoryId: null,
  ebayStoreCategoryIdOne: null,
  ebayStoreCategoryIdTwo: null,

  mainCharacter: "",
  //characters: [],
  publisher: "",

  extraDescription: "",
  images: [],
  imageToCrop: false,
  savingLotDraft: false,
  savingLotDraftMessage: false
};

const draft = {
  namespaced: true,
  state: {
    ...defaultDraft
  },
  getters: {
    getField
  },
  mutations: {
    updateField,

    [CURRENT_GTC_DRAFT_UPDATE](state, draft) {
      state = { ...state, ...draft };
    },
    [CURRENT_GTC_DRAFT_SAVING](state, data) {
      state.savingGtcDraft = data.loading;
      state.savingGtcDraftMessage = data.loadingMessage || "Saving ...";
    },
    [RESET_GTC_DRAFT](state) {
      state.locationCode = defaultDraft.locationCode;
      state.inventoryTitle = defaultDraft.inventoryTitle;
      state.mainCharacter = defaultDraft.mainCharacter;
      //state.characters = defaultDraft.characters;
      state.publisher = defaultDraft.publisher;
      state.price = defaultDraft.price;
      state.images = defaultDraft.images;
      state.imageToCrop = defaultDraft.imageToCrop;
      state.extraDescription = defaultDraft.extraDescription;
    },
    [UPDATE_GTC_DRAFT_IMAGES](state, images) {
      state.images = [...images];
    },
    [GTC_SET_IMAGE_TO_CROP](state, image) {
      state.imageToCrop = image;
    }
  },
  actions: {
    async [CURRENT_GTC_DRAFT_SAVE]({ dispatch, commit }, params) {
      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "post",
            url: "/draft/gtc",
            params,
            success: `gtc/draft/${CURRENT_GTC_DRAFT_UPDATE}`,
            loading: `gtc/draft/${CURRENT_GTC_DRAFT_SAVING}`
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

export default draft;
