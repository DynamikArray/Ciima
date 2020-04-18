import Vue from "vue";
import App from "./App.vue";
import store from "./store/store.js";
import router from "./router/router.js";
import vuetify from "./plugins/vuetify.js";

import { axiosInstance } from "./util/axios/axiosInstance";
Vue.prototype.$http = axiosInstance;

//Filters for date's from db
import { createDateFilter } from "vue-date-fns";
Vue.filter("date", createDateFilter("MMM DD, YYYY"));
Vue.filter("dateTime", createDateFilter("MMM DD, YYYY hh:mm a"));
Vue.filter("capitalizeFirst", val => {
  return val.charAt(0).toUpperCase() + val.slice(1);
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

// register the plugin on vue for Sweet Alerts
//import VueSwal from "vue-swal";
//Vue.use(VueSwal);

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
Vue.use(require("vue-shortkey"));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
