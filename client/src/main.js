import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import vuetify from "./plugins/vuetify";

//Filters for date's from db
import { createDateFilter } from "vue-date-fns";
Vue.filter("date", createDateFilter("MMM DD, YYYY"));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
