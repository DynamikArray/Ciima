const inventoryRoutes = [
  /*
  {
    path: "/inventory",
    props: true,
    name: "inventory",
    component: () =>
      import(/*webpackChunkName: "inventory"*/ /* "@/views/Inventory.vue"),
    meta: {
      requiresAuth: true
    }
  },
  */
  {
    path: "/inventory",
    props: true,
    name: "inventory",
    component: () => import(/*webpackChunkName: "inventory"*/ "@/views/LinnworksInventory.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/locations",
    props: true,
    name: "locations",
    component: () => import(/*webpackChunkName: "inventory"*/ "@/views/Locations.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

export default inventoryRoutes;
