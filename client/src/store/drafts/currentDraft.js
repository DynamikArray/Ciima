import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {} from "@/store/action-types";
import {
  CURRENT_DRAFT_ISSUE_ADD,
  CURRENT_DRAFT_ISSUE_REMOVE,
  CURRENT_DRAFT_COVER_PHOTO_UPDATE,
  CURRENT_DRAFT_COVER_PHOTO_CLEAR
} from "@/store/mutation-types";

const currentDraft = {
  namespaced: true,

  state: {
    title: false,
    coverPhoto: false,
    issues: []
  },
  mutations: {
    [CURRENT_DRAFT_ISSUE_ADD](state, issue) {
      //const stateCopy = state.issues;
      const doesExist = state.issues.some(item => {
        return item.id === issue.id;
      });
      if (!doesExist) state.issues = [...state.issues, issue];
    },
    [CURRENT_DRAFT_ISSUE_REMOVE](state, issue) {
      const stateCopy = state.issues;
      const filteredState = stateCopy.filter(item => {
        return item.id !== issue.id;
      });
      state.issues = filteredState;
    },
    [CURRENT_DRAFT_COVER_PHOTO_UPDATE](state, image) {
      state.coverPhoto = image;
    },
    [CURRENT_DRAFT_COVER_PHOTO_CLEAR](state) {
      state.coverPhoto = false;
    }
  },
  actions: {}
};

export default currentDraft;
