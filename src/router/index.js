import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import LoginPage from "../views/LoginView.vue";
import RegisterPage from "../views/RegisterView.vue";
import ProfilePage from "../views/ProfileView.vue";
import TweetView from "../views/TweetView.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: TweetView
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
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage
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
    next({ name: "/login" }); 
  } else {
    next();
  }
});

export default router;
