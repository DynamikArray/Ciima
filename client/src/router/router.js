import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
    },
    {
      path: "/titles",
      name: "titles",
      component: () =>
        import(/*webpackChunkName: "titles"*/ "@/views/Input.vue")
    },
    {
      path: "/issues/:titleId",
      props: true,
      name: "issues",
      component: () =>
        import(/*webpackChunkName: "issues"*/ "@/views/Issues.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    }
  ]
});
