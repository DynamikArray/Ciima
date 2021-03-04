const reportRoutes = [
  {
    path: "/sold-items-report",
    props: true,
    name: "sold.items.report",
    component: () => import(/*webpackChunkName: "reports"*/ "@/views/SoldItemsReport.vue"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/category-sales-report",
    props: true,
    name: "category.sales.report",
    component: () => import(/*webpackChunkName: "reports"*/ "@/views/CategorySalesReport.vue"),
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
    component: () => import(/*webpackChunkName: "analytics"*/ "@/views/Analytics.vue"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/commish",
    props: true,
    name: "commish",
    component: () => import(/*webpackChunkName: "commish"*/ "@/views/Commish.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

export default reportRoutes;
