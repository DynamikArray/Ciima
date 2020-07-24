import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {
  SET_OUR_FILTER_COMIC_TYPES,
  SET_OUR_FILTER_VARIANTS,
  SET_OUR_FILTER_HAS_MATCH,
  SEARCH_OUR_ISSUES
} from "@/store/action-types";
import {
  FILTER_COMIC_TYPES_SET,
  FILTER_VARIANTS_SET,
  FILTER_HAS_MATCH_SET
} from "@/store/mutation-types";

const issuesFilter = {
  namespaced: true,

  state: {
    filterComicTypes: true,
    filterVariants: true,
    filterHasMatch: false
  },
  getters: {
    getFilterHasMatch: state => {
      return state.filterHasMatch;
    },
    getFilterComicTypes: state => {
      return state.filterComicTypes;
    },
    getFilterVariants: state => {
      return state.filterVariants;
    }
  },
  mutations: {
    [FILTER_COMIC_TYPES_SET](state, bln) {
      state.filterComicTypes = bln;
    },
    [FILTER_VARIANTS_SET](state, bln) {
      state.filterVariants = bln;
    },
    [FILTER_HAS_MATCH_SET](state, bln) {
      state.filterHasMatch = bln;
    }
  },

  actions: {
    /* filters */
    [SET_OUR_FILTER_COMIC_TYPES]({ dispatch, commit }, bln) {
      commit(FILTER_COMIC_TYPES_SET, bln);
      dispatch(`pricematch/ourData/${SEARCH_OUR_ISSUES}`, {}, { root: true });
    },
    [SET_OUR_FILTER_VARIANTS]({ dispatch, commit }, bln) {
      commit(FILTER_VARIANTS_SET, bln);
      dispatch(`pricematch/ourData/${SEARCH_OUR_ISSUES}`, {}, { root: true });
    },
    [SET_OUR_FILTER_HAS_MATCH]({ dispatch, commit }, bln) {
      commit(FILTER_HAS_MATCH_SET, bln);
      dispatch(`pricematch/ourData/${SEARCH_OUR_ISSUES}`, {}, { root: true });
    }
  }
};

export default issuesFilter;
