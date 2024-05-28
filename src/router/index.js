import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

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
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/home"
  }
];

const isAuthenticated = ref(false);

// Create a promise to handle the initial authentication state check
let authReady = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
    resolve();
  });
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Wait for the auth state to be determined before proceeding
  await authReady;
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;
