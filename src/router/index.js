import Vue from "vue";
import Router from "vue-router";
import store from "@/store"; // import your Vuex store

Vue.use(Router);

const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import(/* webpackChunkName: "home" */ "../views/Home"),
    },
    {
      path: "/Editor",
      name: "Editor",
      component: () => import(/* webpackChunkName: "editor" */ "../views/EditorPage"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import(/* webpackChunkName: "login" */ "../views/LoginPage"),
      meta: { guestOnly: true },
    },
    {
      path: "/:Name",
      name: "GroupByName",
      component: () => import(/* webpackChunkName: "group" */ "../views/Group"),
    },
    {
      path: "/:Name/:ID",
      name: "GroupByID",
      component: () => import(/* webpackChunkName: "group" */ "../views/Group"),
    },
  ],
});

// Title & route tracking
const DEFAULT_TITLE = "Workspace";
router.afterEach((to, from) => {
  document.querySelector("#app").__vue__.$store.commit("setRoute", to);
  document.querySelector("#app").__vue__.$store.commit("setRouteFrom", from);
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

// Route Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.isLoggedIn;
  const userRoles = store.state.userRoles || [];

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next("/login");
  }

  if (to.meta.requiresAdmin && !userRoles.includes("Administrator")) {
    return next("/unauthorized");
  }

  if (to.meta.guestOnly && isLoggedIn) {
    return next("/");
  }

  return next();
});

export default router;
