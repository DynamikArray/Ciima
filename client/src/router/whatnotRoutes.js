const whatnotRoutes = [
  {
    path: "/whatnot",
    props: true,
    name: "whatnot",
    component: () => import(/*webpackChunkName: "404"*/ "@/views/Whatnot/Whatnot.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

export default whatnotRoutes;
