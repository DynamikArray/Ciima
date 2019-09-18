import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

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
  CURRENT_DRAFT_COVER_PHOTO_SAVING,
  CURRENT_DRAFT_COVER_PHOTO_UPDATE,
  CURRENT_DRAFT_COVER_PHOTO_CLEAR
} from "@/store/mutation-types";

import { getField, updateField } from "vuex-map-fields";

const currentDraft = {
  namespaced: true,

  state: {
    titles: [],
    issues: [],
    coverPhoto: false,
    savingCover: false,
    //form data
    inventoryTitle: "",
    locationCode: "",
    grade: "",
    quantity: "",
    price: "",
    ebaySiteCategoryId: 0,
    ebayStoreCategoryIdOne: "",
    ebayStoreCategoryIdTwo: "",
    series: "",
    mainCharacter: "",
    issueNumbers: "",
    publisher: "",
    publishedYear: "",
    publishedDate: "",
    main_image: false,
    other_images: [],
    savingDraft: false
  },
  getters: {
    getField
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
      state.coverPhoto = false;
      state.issues = [];
      state.titles = [];
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
    [CURRENT_DRAFT_SAVE]({ dispatch, commit }, params) {
      //pull off our toast obj if exsits
      //
      const { draft } = params;
      let toastr = false;
      if (draft.toastr) toastr = draft.toastr;
      if (toastr) delete draft.toastr;
      //pull off our draft

      dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/v1/draft",
          params: draft,
          success: `currentDraft/${CURRENT_DRAFT_UPDATE}`,
          loading: `currentDraft/${CURRENT_DRAFT_SAVING}`,
          toastr
        },
        { root: true }
      );
    }
  }
};

export default currentDraft;
