import Vue from "vue";
import Router from "vue-router";

const titles = () =>
  import(/*webpackChunkName: "titles"*/ "@/views/Titles.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  //// TODO: WHAT is this base for and what from process... ????
  base: process.env.BASE_URL,
  routes: [
    /*
    {
      path: "/",
      name: "home",
      component: () => import(/ webpackChunkName: "home" / "@/views/Home.vue")
    },
    */
    {
      path: "/",
      name: "home",
      component: titles
    },
    {
      path: "/titles",
      name: "titles",
      component: () =>
        import(/*webpackChunkName: "titles"*/ "@/views/Titles.vue")
    },
    {
      path: "/issues",
      props: true,
      name: "issues",
      component: () =>
        import(/*webpackChunkName: "issues"*/ "@/views/Issues.vue")
    },
    {
      path: "/images",
      props: true,
      name: "images",
      component: () =>
        import(/*webpackChunkName: "images"*/ "@/views/Images.vue")
    }
  ]
});
