import Vue from "vue";
import Router from "vue-router";
import store from "../store/store.js";
Vue.use(Router);

let router = new Router({
  mode: "history",
  //// TODO: WHAT is this base for and what from process... ????
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "homepage",
      component: () =>
        import(/*webpackChunkName: "homepage" */ "@/views/Homepage.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "@/views/Login.vue")
    },
    {
      path: "/titles",
      name: "titles",
      component: () =>
        import(/*webpackChunkName: "titles"*/ "@/views/Titles.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/issues",
      props: true,
      name: "issues",
      component: () =>
        import(/*webpackChunkName: "issues"*/ "@/views/Issues.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/images",
      props: true,
      name: "images",
      component: () =>
        import(/*webpackChunkName: "images"*/ "@/views/Images.vue"),
      meta: {
        requiresAuth: true
      }
    },
    //
    //  DRAFT  create/edit
    //
    {
      path: "/draft",
      props: true,
      name: "draft",
      component: () =>
        import(/*webpackChunkName: "draft"*/ "@/views/Draft.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/draft/:id",
      props: true,
      name: "draft.edit",
      component: () =>
        import(/*webpackChunkName: "draft"*/ "@/views/EditDraft.vue"),
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    //
    //  DRAFTS
    //
    {
      path: "/drafts",
      props: true,
      name: "drafts",
      component: () =>
        import(/*webpackChunkName: "drafts"*/ "@/views/Drafts.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/inventory",
      props: true,
      name: "inventory",
      component: () =>
        import(/*webpackChunkName: "inventory"*/ "@/views/Inventory.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/ebay",
      props: true,
      name: "ebay",
      component: () => import(/*webpackChunkName: "ebay"*/ "@/views/Ebay.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      props: true,
      name: "404",
      component: () => import(/*webpackChunkName: "ebay"*/ "@/views/404.vue"),
      meta: {
        requiresAuth: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  //Requires Authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["user/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
