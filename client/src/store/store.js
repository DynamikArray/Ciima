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
import editDraft from "@/store/drafts/editDraft";
import deleteDraft from "@/store/drafts/deleteDraft";

import lots from "@/store/lots/lots";

import linnworks from "@/store/inventory/linnworks";
import ebay from "@/store/ebay/search";
import user from "@/store/user/user";
import pricing from "@/store/pricing/pricing";

import locations from "@/store/locations/locations";

export default new Vuex.Store({
  modules: {
    api,
    currentDraft,
    openDrafts,
    editDraft,
    deleteDraft,
    ebaySearch,
    issueSearch,
    linnworks,
    ebay,
    settings,
    titleSearch,
    user,
    pricing,
    locations,
    lots
  },
  state: {},
  mutations: {}
});
