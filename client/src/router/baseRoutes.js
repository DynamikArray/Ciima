const baseRoutes = [
  {
    path: "/",
    name: "homepage",
    component: () =>
      import(/*webpackChunkName: "homepage" */ "@/views/Homepage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
  },
  //
  //
  //
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
  }
];

export default baseRoutes;
