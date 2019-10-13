import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import settings from "@/store/settings/settings";
import api from "@/store/api/api";
import titleSearch from "@/store/search/titleSearch";
import issueSearch from "@/store/search/issueSearch";

//todo rewrite this later, buts its for Categories in DRAFT Listings
import ebaySearch from "@/store/search/ebaySearch";
import currentDraft from "@/store/drafts/currentDraft";
import openDrafts from "@/store/drafts/openDrafts";
import linnworks from "@/store/inventory/linnworks";
import ebay from "@/store/ebay/search";
import user from "@/store/user/user";

export default new Vuex.Store({
  modules: {
    api,
    currentDraft,
    ebaySearch,
    issueSearch,
    linnworks,
    ebay,
    openDrafts,
    settings,
    titleSearch,
    user
  },
  state: {},
  mutations: {}
});
