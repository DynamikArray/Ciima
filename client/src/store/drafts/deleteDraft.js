import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { DELETE_DRAFT } from "@/store/action-types";
import {
  DELETE_DRAFT_STATUS,
  DELETE_DRAFT_LOADING
} from "@/store/mutation-types";

const deleteDraft = {
  namespaced: true,
  state: {
    loading: false,
    status: ""
  },
  mutations: {
    [DELETE_DRAFT_LOADING](state, data) {
      state.loading = data.loading;
    },
    [DELETE_DRAFT_STATUS](state, data) {
      state = { ...state, ...data };
    }
  },
  actions: {
    async [DELETE_DRAFT]({ dispatch, commit }, params) {
      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "delete",
            url: `/draft/${params.draftId}`,
            success: `deleteDraft/${DELETE_DRAFT_STATUS}`,
            loading: `deleteDraft/${DELETE_DRAFT_LOADING}`
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

export default deleteDraft;
