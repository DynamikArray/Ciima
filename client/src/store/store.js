import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import api from "@/store/api/api";
import titleSearch from "@/store/search/titleSearch";
import issueSearch from "@/store/search/issueSearch";
import ebaySearch from "@/store/search/ebaySearch";
import currentDraft from "@/store/drafts/currentDraft";
import openDrafts from "@/store/drafts/openDrafts";

export default new Vuex.Store({
  modules: {
    api,
    titleSearch,
    issueSearch,
    ebaySearch,
    currentDraft,
    openDrafts
  },
  state: {},
  mutations: {}
});
