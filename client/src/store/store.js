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
import gtcs from "@/store/gtcs/gtcs";

import linnworks from "@/store/linnworks/linnworks";
import ebay from "@/store/ebay/search";
import user from "@/store/user/user";
import pricing from "@/store/pricing/pricing";

import locations from "@/store/locations/locations";

import auditLog from "@/store/auditLog/auditLog";
import analytics from "@/store/analytics/analytics";

import pricematch from "@/store/pricematch/pricematch";
import pricelist from "@/store/pricelist/pricelist";
import reports from "@/store/reports";

import repricer from "@/store/repricer";
import pricingService from "@/store/pricingService/pricingService";

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
    lots,
    gtcs,
    auditLog,
    analytics,
    pricematch,
    pricelist,
    reports,
    repricer,
    pricingService
  },
  state: {},
  mutations: {}
});
