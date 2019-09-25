import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import vuetify from "./plugins/vuetify";

//Filters for date's from db
import { createDateFilter } from "vue-date-fns";
Vue.filter("date", createDateFilter("MMM DD, YYYY"));
Vue.filter("dateTime", createDateFilter("MMM DD, YYYY hh:mm a"));

// register the plugin on vue for Sweet Alerts
import VueSwal from "vue-swal";
Vue.use(VueSwal);

// import plugin
import VueToastr from "vue-toastr";
// use plugin
Vue.use(VueToastr, {
  defaultPosition: "toast-top-right",
  progressbar: true,
  timeout: 3500,
  classNames: "ourToast"
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
