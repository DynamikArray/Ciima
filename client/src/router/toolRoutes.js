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
    path: "/pricingService",
    props: true,
    name: "pricingService",
    component: () => import(/*webpackChunkName: "pricingService"*/ "@/views/Tools/PricingService.vue"),
    meta: {
      requiresAuth: true,
      requiresManager: true
    }
  }
];

export default toolRoutes;
