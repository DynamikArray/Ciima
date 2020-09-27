import Vue from "vue";
import App from "./App.vue";
import store from "./store/store.js";
import router from "./router/router.js";
import vuetify from "./plugins/vuetify.js";

/*
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
Sentry.init({
  dsn:
    "https://c239a0d730584cbea513baf394a8d470@o437408.ingest.sentry.io/5399968",
  integrations: [
    new VueIntegration({ Vue, attachProps: true, logErrors: true })
  ]
});
*/

import { axiosInstance } from "./util/axios/axiosInstance";
Vue.prototype.$http = axiosInstance;

//Filters for date's from db
import { createDateFilter } from "vue-date-fns";
Vue.filter("date", createDateFilter("MMM DD, YYYY"));
Vue.filter("dateTime", createDateFilter("MMM DD, YYYY hh:mm a"));
Vue.filter("capitalizeFirst", val => {
  return val.charAt(0).toUpperCase() + val.slice(1);
});

Vue.filter("monthDayYear", val => {
  const nDate = new Date(val);
  const formatted = `${nDate.getMonth()}-${nDate.getDate()}-${nDate.getFullYear()} `;
  return val;
});

Vue.filter("daysAsString", days => {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days === 5) return "This Week";
  if (days === 14) return "2 Weeks";
  if (days === 30) return "Past Month";
  return `Last ${days} Days`;
});

//for handling currencys
import VueCurrencyFilter from "vue-currency-filter";
Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "front",
  symbolSpacing: true
});

// import plugin
import VueToastr from "vue-toastr";
// use plugin
Vue.use(VueToastr, {
  defaultPosition: "toast-top-right",
  progressbar: true,
  timeout: 2500,
  classNames: "ourToast"
});

//import vuetify-confirm
import VuetifyConfirm from "vuetify-confirm";
Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: "Ok",
  buttonTrueColor: "success",
  buttonFalseText: "Cancel",
  buttonFalseColor: "red",
  color: "red",
  icon: "fa-exclamation-circle",
  title: "Are you sure?",
  width: 350,
  property: "$confirm"
});

//shortkey
Vue.use(require("vue-shortkey"), { prevent: ["input", "textarea"] });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
