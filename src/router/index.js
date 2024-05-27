import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import LoginPage from "../views/LoginView.vue";
import RegisterPage from "../views/RegisterView.vue";
import Dashboard from "../views/DashboardView.vue";
import Profile from "../views/ProfileView.vue";
import Home from "../views/HomeView.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
  }
];

let isAuthenticated = false;

onAuthStateChanged(auth, (user) => {
  isAuthenticated = !!user;
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "LoginPage" }); 
  } else {
    next();
  }
});

export default router;
