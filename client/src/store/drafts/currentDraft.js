import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//build a blankDraft object for mapping over to both set, and clear state
const blankDraft = {
  titles: [],
  issues: [],
  coverPhoto: false,
  savingCover: false,
  //form data
  savingDraft: false,
  inventoryTitle: "",
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

import { CURRENT_DRAFT_SAVE } from "@/store/action-types";
import {
  CURRENT_DRAFT_UPDATE,
  CURRENT_DRAFT_SAVING,
  CURRENT_DRAFT_CLEAR,
  CURRENT_DRAFT_ISSUE_ADD,
  CURRENT_DRAFT_ISSUE_REMOVE,
  CURRENT_DRAFT_ISSUES_REORDER,
  CURRENT_DRAFT_TITLE_ADD,
  CURRENT_DRAFT_TITLE_REMOVE,
  CURRENT_DRAFT_TITLES_REORDER,
  CURRENT_DRAFT_COVER_PHOTO_SAVING,
  CURRENT_DRAFT_COVER_PHOTO_UPDATE,
  CURRENT_DRAFT_COVER_PHOTO_CLEAR
} from "@/store/mutation-types";

import { getField, updateField } from "vuex-map-fields";

const currentDraft = {
  namespaced: true,

  state: {
    ...blankDraft
  },
  getters: {
    getField,
    hasTitles: state => {
      if (!state.titles) return false;
      if (state.titles.length > 0) return true;
      return false;
    },
    hasIssues: state => {
      if (!state.issues) return false;
      if (state.issues.length > 0) return true;
      return false;
    },
    hasCoverPhoto: state => {
      if (!state.coverPhoto) return false;
      return true;
    }
  },
  mutations: {
    updateField,

    [CURRENT_DRAFT_UPDATE](state, draft) {
      state = { ...state, ...draft };
    },
    [CURRENT_DRAFT_SAVING](state, data) {
      state.savingDraft = data.loading;
    },
    //Clear all properties of draft
    [CURRENT_DRAFT_CLEAR](state) {
      for (let [key, value] of Object.entries(blankDraft)) {
        state[key] = value;
      }
    },
    //add issue to draft issues list
    [CURRENT_DRAFT_ISSUE_ADD](state, issue) {
      //const stateCopy = state.issues;
      const doesExist = state.issues.some(item => {
        return item.id === issue.id;
      });
      if (!doesExist) state.issues = [...state.issues, issue];
    },
    //remove issue to draft issues list
    [CURRENT_DRAFT_ISSUE_REMOVE](state, issue) {
      const stateCopy = state.issues;
      const filteredState = stateCopy.filter(item => {
        return item.id !== issue.id;
      });
      state.issues = filteredState;
    },
    [CURRENT_DRAFT_ISSUES_REORDER](state, issues) {
      state.issues = issues;
    },
    [CURRENT_DRAFT_TITLE_ADD](state, title) {
      //const stateCopy = state.issues;
      const doesExist = state.titles.some(item => {
        return item.titleId === title.titleId;
      });
      if (!doesExist) state.titles = [...state.titles, title];
    },
    [CURRENT_DRAFT_TITLE_REMOVE](state, title) {
      const stateCopy = state.titles;
      const filteredState = stateCopy.filter(item => {
        return item.titleId !== title.titleId;
      });
      state.titles = filteredState;
    },

    [CURRENT_DRAFT_TITLES_REORDER](state, titles) {
      state.titles = titles;
    },

    [CURRENT_DRAFT_COVER_PHOTO_UPDATE](state, image) {
      state.coverPhoto = image;
    },
    [CURRENT_DRAFT_COVER_PHOTO_CLEAR](state) {
      state.coverPhoto = false;
    },
    [CURRENT_DRAFT_COVER_PHOTO_SAVING](state, data) {
      state.savingCover = data;
    }
  },
  actions: {
    async [CURRENT_DRAFT_SAVE]({ dispatch, commit }, params) {
      //pull off our toast obj if exsits
      //
      const { draft } = params;
      let toastr = false;

      if (draft.toastr) toastr = draft.toastr;
      if (toastr) delete draft.toastr;
      //pull off our draft

      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "post",
            url: "/draft/create",
            params: draft,
            success: `currentDraft/${CURRENT_DRAFT_UPDATE}`,
            loading: `currentDraft/${CURRENT_DRAFT_SAVING}`,
            toastr
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

export default currentDraft;
