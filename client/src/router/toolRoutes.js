const toolRoutes = [
  {
    path: "/tools",
    props: true,
    name: "tools",
    component: () => import(/*webpackChunkName: "tools" */ "@/views/Tools.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/pricesync",
    props: true,
    name: "pricesync",
    component: () =>
      import(/*webpackChunkName: "pricesync"*/ "@/views/PriceSync.vue"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/repricer",
    props: true,
    name: "repricer",
    component: () =>
      import(/*webpackChunkName: "pricesync"*/ "@/views/Repricer.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

export default toolRoutes;
