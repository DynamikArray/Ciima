import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import settings from "@/store/settings/settings";
import api from "@/store/api/api";
import titleSearch from "@/store/search/titleSearch";
import issueSearch from "@/store/search/issueSearch";
import ebaySearch from "@/store/search/ebaySearch";
import currentDraft from "@/store/drafts/currentDraft";
import openDrafts from "@/store/drafts/openDrafts";
import linnworks from "@/store/inventory/linnworks";

// NEW protected routes
import user from "@/store/user/user";

export default new Vuex.Store({
  modules: {
    api,
    currentDraft,
    ebaySearch,
    issueSearch,
    linnworks,
    openDrafts,
    settings,
    titleSearch,
    user
  },
  state: {},
  mutations: {}
});
