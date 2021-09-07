const toolRoutes = [
  {
    path: "/tools",
    props: true,
    name: "tools",
    component: () => import(/*webpackChunkName: "tools" */ "@/views/Tools/Tools.vue"),
    meta: {
      requiresAuth: true,
      requiresManager: true
    }
  },
  {
    path: "/pricesync",
    props: true,
    name: "pricesync",
    component: () => import(/*webpackChunkName: "pricesync"*/ "@/views/Tools/PriceSync.vue"),
    meta: {
      requiresAuth: true,
      requiresManager: true
    }
  },

  {
    path: "/repricer",
    props: true,
    name: "repricer",
    component: () => import(/*webpackChunkName: "pricesync"*/ "@/views/Tools/Repricer.vue"),
    meta: {
      requiresAuth: true,
      requiresManager: true
    }
  },

  {
    path: "/repackingService",
    props: true,
    name: "repackingService",
    component: () => import(/*webpackChunkName: "repackingService"*/ "@/views/Tools/RepackingService.vue"),
    meta: {
      requiresAuth: true,
      requiresManager: true
    }
  }
];

export default toolRoutes;
