const toolRoutes = [
  {
    path: "/tools",
    props: true,
    name: "tools",
    component: () => import(/*webpackChunkName: "tools" */ "@/views/Tools.vue"),
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: "pricesync",
        props: true,
        name: "pricesync",
        component: () =>
          import(/*webpackChunkName: "pricesync"*/ "@/views/PriceSync.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  {
    path: "/ebay",
    props: true,
    name: "ebay",
    component: () => import(/*webpackChunkName: "ebay"*/ "@/views/Ebay.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

export default toolRoutes;
