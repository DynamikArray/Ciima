const reportRoutes = [
  {
    path: "/reports",
    props: true,
    name: "reports",
    component: () =>
      import(/*webpackChunkName: "reports"*/ "@/views/Reports.vue"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/audit",
    props: true,
    name: "audit",
    component: () => import(/*webpackChunkName: "audit"*/ "@/views/Audit.vue"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/analytics",
    props: true,
    name: "analytics",
    component: () =>
      import(/*webpackChunkName: "analytics"*/ "@/views/Analytics.vue"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/commish",
    props: true,
    name: "commish",
    component: () =>
      import(/*webpackChunkName: "commish"*/ "@/views/Commish.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

export default reportRoutes;
