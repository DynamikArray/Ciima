const priceMatchRoutes = [
  {
    path: "/pricematch",
    props: true,
    name: "pricematch",
    component: () =>
      import(/*webpackChunkName: "pricematch"*/ "@/views/PriceMatch.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/pricelist",
    props: true,
    name: "pricelist",
    component: () =>
      import(/*webpackChunkName: "pricelist"*/ "@/views/PriceList.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

export default priceMatchRoutes;
