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
    {
      path: "*",
      props: true,
      name: "404",
      component: () => import(/*webpackChunkName: "404"*/ "@/views/404.vue"),
      meta: {
        requiresAuth: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store
      .dispatch("user/loginCheck", false)
      .then(resp => {
        if (resp) next(); //proceed
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
