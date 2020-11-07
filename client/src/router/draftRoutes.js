const draftRoutes = [
  //
  //  DRAFT  create/edit
  //
  {
    path: "/draft",
    props: true,
    name: "draft",
    component: () => import(/*webpackChunkName: "draft"*/ "@/views/Draft.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/draft/:id",
    props: true,
    name: "draft.edit",
    component: () =>
      import(/*webpackChunkName: "draft"*/ "@/views/EditDraft.vue"),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  //
  //  DRAFTS
  //
  {
    path: "/drafts",
    props: true,
    name: "drafts",
    component: () =>
      import(/*webpackChunkName: "drafts"*/ "@/views/Drafts.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

export default draftRoutes;
