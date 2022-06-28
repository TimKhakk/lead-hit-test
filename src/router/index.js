import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AnalyticsView from "../views/AnalyticsView.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/analytics",
    name: "analytics",
    beforeEnter: (to, from, next) => {
      if (!store.state.isLoggedIn) {
        alert("Вы не авторизованы");
        next(false);
      } else next();
    },
    // route level code-splitting
    // this generates a separate chunk (analytics.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AnalyticsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem("leadhit-site-id")) {
//     next({ path: "/" });
//   } else {
//     next();
//   }
// });

export default router;
