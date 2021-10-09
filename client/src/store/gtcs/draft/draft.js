import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { getField, updateField } from "vuex-map-fields";

import { CURRENT_GTC_DRAFT_SAVE, NEW_GTC_DRAFT_LOAD, NEW_GTC_DRAFT_FROM_INVENTORY } from "@/store/action-types";

import {
  RESET_GTC_DRAFT,
  UPDATE_GTC_DRAFT_IMAGES,
  GTC_SET_IMAGE_TO_CROP,
  CURRENT_GTC_DRAFT_UPDATE,
  CURRENT_GTC_DRAFT_SAVING,
  CURRENT_GTC_DRAFT_LOAD,
  SET_DEFAULT_PRODUCT_TYPE,
  CURRENT_GTC_DRAFT_CATEGORY_FIELDS_LOAD_TO_FORM,
  CURRENT_GTC_DRAFT_CATEGORY_FIELDS_SET_FORM_VALUE
} from "@/store/mutation-types";

import router from "@/router/router.js";
import aspects from "@/store/gtcs/draft/aspects/aspects.js";

const defaultDraft = {
  inventoryTitle: "",
  locationCode: "EBAY-",

  quantity: null,
  price: null,
  declinePrice: null,

  ebaySiteCategoryId: null,
  ebaySiteCategoryFields: {},
  ebayStoreCategoryIdOne: null,
  ebayStoreCategoryIdTwo: null,

  mainCharacter: "",
  //characters: [],
  publisher: "",
  extraDescription: "",

  images: [],
  imageToCrop: false,
  savingGtcDraft: false,
  savingGtcDraftMessage: false,

  isCloned: false
};

const draft = {
  namespaced: true,
  modules: {
    aspects
  },
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
      state.isCloned = defaultDraft.isCloned;
      state.locationCode = defaultDraft.locationCode;
      state.inventoryTitle = defaultDraft.inventoryTitle;

      state.price = defaultDraft.price;
      state.declinePrice = defaultDraft.declinePrice;

      state.quantity = defaultDraft.quantity;

      state.mainCharacter = defaultDraft.mainCharacter;
      state.publisher = defaultDraft.publisher;
      state.extraDescription = defaultDraft.extraDescription;

      state.images = defaultDraft.images;
      state.imageToCrop = defaultDraft.imageToCrop;

      state.ebaySiteCategoryId = defaultDraft.ebaySiteCategoryId;
      state.ebayStoreCategoryIdOne = defaultDraft.ebayStoreCategoryIdOne;
      state.ebayStoreCategoryIdTwo = defaultDraft.ebayStoreCategoryIdTwo;

      state.savingGtcDraft = defaultDraft.savingGtcDraft;
      state.savingGtcDraftMessage = defaultDraft.savingGtcDraftMessage;

      state.ebaySiteCategoryFields = defaultDraft.ebaySiteCategoryFields;
    },
    [UPDATE_GTC_DRAFT_IMAGES](state, images) {
      state.images = [...images];
    },
    [GTC_SET_IMAGE_TO_CROP](state, image) {
      state.imageToCrop = image;
    },
    [CURRENT_GTC_DRAFT_LOAD](state, item) {
      state.isCloned = true;
      state.locationCode = defaultDraft.locationCode;
      state.inventoryTitle = item.inventoryTitle;

      state.price = item.price.toString();
      state.declinePrice = item.declinePrice.toString() || defaultDraft.declinePrice;

      state.quantity = item.quantity.toString() || defaultDraft.quantity;

      state.mainCharacter = item.mainCharacter;
      state.publisher = item.publisher;
      state.extraDescription = item.extraDescription;

      state.images = defaultDraft.images;
      state.imageToCrop = defaultDraft.imageToCrop;

      state.ebaySiteCategoryId = item.ebaySiteCategoryId;
      state.ebayStoreCategoryIdOne = item.ebayStoreCategoryIdOne;
      state.ebayStoreCategoryIdTwo = item.ebayStoreCategoryIdTwo;

      state.ebaySiteCategoryFields = item.ebaySiteCategoryFields;

      state.savingGtcDraft = defaultDraft.savingGtcDraft;
      state.savingGtcDraftMessage = defaultDraft.savingGtcDraftMessage;
    },
    [CURRENT_GTC_DRAFT_CATEGORY_FIELDS_LOAD_TO_FORM](state, ebaySiteCategoryFields) {
      state.ebaySiteCategoryFields = ebaySiteCategoryFields;
    },
    [CURRENT_GTC_DRAFT_CATEGORY_FIELDS_SET_FORM_VALUE](state, { key, value }) {
      state.ebaySiteCategoryFields[key] = value;
    }
  },
  actions: {
    async [CURRENT_GTC_DRAFT_SAVE]({ dispatch, commit }, params) {
      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "post",
            url: "/draft/gtcs",
            params,
            success: `gtcs/draft/${CURRENT_GTC_DRAFT_UPDATE}`,
            loading: `gtcs/draft/${CURRENT_GTC_DRAFT_SAVING}`
          },
          { root: true }
        );
        return resp;
      } catch (err) {
        throw err;
      }
    },
    async [NEW_GTC_DRAFT_LOAD]({ dispatch, commit }, item) {
      commit(`${RESET_GTC_DRAFT}`);
      commit(`${CURRENT_GTC_DRAFT_LOAD}`, item);
      commit(`settings/${SET_DEFAULT_PRODUCT_TYPE}`, "gtc", { root: true });
      router.push({ name: "draft" });
    },
    async [NEW_GTC_DRAFT_FROM_INVENTORY]({ dispatch, commit }, pkStockItemID) {
      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "post",
            url: "/inventory/selectItemToClone",
            params: { pkStockItemID },
            success: `gtcs/draft/${CURRENT_GTC_DRAFT_UPDATE}`,
            loading: `gtcs/draft/${CURRENT_GTC_DRAFT_SAVING}`
          },
          { root: true }
        );

        if (resp.result.length == 1) {
          commit(`${RESET_GTC_DRAFT}`);
          commit(`${CURRENT_GTC_DRAFT_LOAD}`, resp.result[0]);
          commit(`settings/${SET_DEFAULT_PRODUCT_TYPE}`, "gtc", { root: true });
          router.push({ name: "draft" });
          return true;
        }
      } catch (err) {
        throw err;
      }
    }
  }
};

export default draft;
