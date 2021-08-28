const utilityRoutes = [
  {
    path: "*",
    props: true,
    name: "404",
    component: () => import(/*webpackChunkName: "404"*/ "@/views/Utility/404.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/denied",
    props: true,
    name: "denied",
    component: () => import(/*webpackChunkName: "404"*/ "@/views/Utility/Denied.vue"),
    meta: {
      requiresAuth: false
    }
  }
];

export default utilityRoutes;
