import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { getField, updateField } from "vuex-map-fields";

import {
  CURRENT_LOT_DRAFT_SAVE,
  LOTS_DRAFT_TITLE_CHECK
} from "@/store/action-types";

import {
  RESET_LOT_DRAFT,
  UPDATE_LOT_DRAFT_IMAGES,
  SET_IMAGE_TO_CROP,
  CURRENT_LOT_DRAFT_UPDATE,
  CURRENT_LOT_DRAFT_SAVING
} from "@/store/mutation-types";

const defaultDraft = {
  locationCode: "EBAY-LOTS-",
  issuesCount: "",
  inventoryTitle: "25 Comic Book Collection Lot Sets Box",
  characters: [],
  publisher: "",
  price: "",
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

    [CURRENT_LOT_DRAFT_UPDATE](state, draft) {
      state = { ...state, ...draft };
    },
    [CURRENT_LOT_DRAFT_SAVING](state, data) {
      state.savingLotDraft = data.loading;
      state.savingLotDraftMessage = data.loadingMessage || "Saving ...";
    },
    [RESET_LOT_DRAFT](state) {
      state.locationCode = defaultDraft.locationCode;
      state.issuesCount = defaultDraft.issuesCount;
      state.inventoryTitle = defaultDraft.inventoryTitle;
      state.characters = defaultDraft.characters;
      state.publisher = defaultDraft.publisher;
      state.price = defaultDraft.price;
      state.images = defaultDraft.images;
      state.imageToCrop = defaultDraft.imageToCrop;
      state.extraDescription = defaultDraft.extraDescription;
    },
    [UPDATE_LOT_DRAFT_IMAGES](state, images) {
      state.images = [...images];
    },
    [SET_IMAGE_TO_CROP](state, image) {
      state.imageToCrop = image;
    }
  },
  actions: {
    async [CURRENT_LOT_DRAFT_SAVE]({ dispatch, commit }, params) {
      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "post",
            url: "/draft/lots",
            params,
            success: `lots/draft/${CURRENT_LOT_DRAFT_UPDATE}`,
            loading: `lots/draft/${CURRENT_LOT_DRAFT_SAVING}`
          },
          { root: true }
        );
        return resp;
      } catch (err) {
        throw err;
      }
    },
    async [LOTS_DRAFT_TITLE_CHECK]({ dispatch, commit }, params) {
      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "post",
            url: "/draft/lots/checkTitle",
            params,
            success: false,
            loading: `lots/draft/${CURRENT_LOT_DRAFT_SAVING}`
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
