import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {} from "@/store/action-types";
import {
  CURRENT_DRAFT_CLEAR,
  CURRENT_DRAFT_ISSUE_ADD,
  CURRENT_DRAFT_ISSUE_REMOVE,
  CURRENT_DRAFT_TITLE_ADD,
  CURRENT_DRAFT_TITLE_REMOVE,
  CURRENT_DRAFT_ISSUES_REORDER,
  CURRENT_DRAFT_COVER_PHOTO_SAVING,
  CURRENT_DRAFT_COVER_PHOTO_UPDATE,
  CURRENT_DRAFT_COVER_PHOTO_CLEAR
} from "@/store/mutation-types";

const currentDraft = {
  namespaced: true,

  state: {
    coverPhoto: false,
    savingCover: false,
    titles: [],
    issues: []
  },
  mutations: {
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
  actions: {}
};

export default currentDraft;
