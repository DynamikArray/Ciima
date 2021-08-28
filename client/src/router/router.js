import Vue from "vue";
import Router from "vue-router";
import store from "../store/store.js";
Vue.use(Router);

import baseRoutes from "./baseRoutes";
import draftRoutes from "./draftRoutes";
import inventoryRoutes from "./inventoryRoutes";
import priceMatchRoutes from "./priceMatchRoutes";
import reportRoutes from "./reportRoutes";
import toolRoutes from "./toolRoutes";
import utilityRoutes from "./utilityRoutes";

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...baseRoutes,
    ...draftRoutes,
    ...inventoryRoutes,
    ...priceMatchRoutes,
    ...reportRoutes,
    ...toolRoutes,
    ...utilityRoutes
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store
      .dispatch("user/loginCheck", false)
      .then(resp => {
        if (resp) {
          /* Check for our isManger flag */
          if (to.matched.some(record => record.meta.requiresManager)) {
            /* if not manager deny this route */
            if (!store.getters["user/isManager"]) next("/denied");
          }
          /*Made it through, let em continue*/
          next();
        }
        if (!resp) next("/login"); //fail to login
      })
      .catch(err => {
        next("/login"); //fail to login
      });
  } else {
    //NO AUTH REQUIRED
    next();
  }
});

export default router;
