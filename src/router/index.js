import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import HomeComponent from "../components/Home.vue";
import UsersView from "../components/Users.vue";
import dashboardView from "../components/dashboard.vue";
import loginView from "../components/login.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeComponent,
    // },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: dashboardView,
    },
    {
      path: "/login",
      name: "login",
      component: loginView,
    },
    {
      path: "/",
      name: "home",
      component: () => import('../views/HomeView.vue')
    }
  ],
});

export default router;
