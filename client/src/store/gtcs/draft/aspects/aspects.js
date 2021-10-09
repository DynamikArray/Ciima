import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { CURRENT_GTC_DRAFT_FETCH_CATEGORY_FIELDS } from "@/store/action-types";
import {
  CURRENT_GTC_DRAFT_CATEGORY_FIELDS_LOADING,
  CURRENT_GTC_DRAFT_CATEGORY_FIELDS_UPDATE,
  CURRENT_GTC_DRAFT_CATEGORY_FIELDS_RESET
} from "@/store/mutation-types";

const aspects = {
  namespaced: true,
  state: {
    requiredAspectsLoading: false,
    requiredAspects: []
  },
  mutations: {
    [CURRENT_GTC_DRAFT_CATEGORY_FIELDS_LOADING](state, { loading }) {
      state.requiredAspectsLoading = loading;
    },
    [CURRENT_GTC_DRAFT_CATEGORY_FIELDS_UPDATE](state, { requiredAspects }) {
      state.requiredAspects = requiredAspects;
    },
    [CURRENT_GTC_DRAFT_CATEGORY_FIELDS_RESET](state) {
      state.requiredAspects = [];
    }
  },
  actions: {
    async [CURRENT_GTC_DRAFT_FETCH_CATEGORY_FIELDS]({ dispatch, commit }, params) {
      try {
        const resp = await dispatch(
          "api/requestHandler",
          {
            method: "get",
            url: "/ebayV2/getItemAspectsForCategory",
            params,
            success: `gtcs/draft/aspects/${CURRENT_GTC_DRAFT_CATEGORY_FIELDS_UPDATE}`,
            loading: `gtcs/draft/aspects/${CURRENT_GTC_DRAFT_CATEGORY_FIELDS_LOADING}`
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
export default aspects;
