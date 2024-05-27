import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import LoginPage from "../views/LoginView.vue";
import RegisterPage from "../views/RegisterView.vue";
import DashboardPage from "../views/DashboardView.vue";
import ProfilePage from "../views/ProfileView.vue";
import TweetView from "../views/TweetView.vue";

const routes = [
  {
    path: "/tweets",
    name: "tweets",
    component: TweetView,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    name: "DashboardPage",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/tweets",
    name: "Tweets",
    component: TweetView,
    meta: { requiresAuth: true },
  },
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
    next({ name: "/" }); // Redirect to LoginPage if not authenticated
  } else {
    next();
  }
});

export default router;
