<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="height: 80px;">
    <div class="container-fluid" style="padding-top: 20px; padding-bottom: 20px;">
      <a class="navbar-brand" href="#">
        <router-link to="/" class="nav-item nav-link">
          <div class="logo-container">
            <img class="logo" src="../assets/chitchat.png" alt="CHITCHAT" style="height: 100px;">
            <h3><strong>CHITCHAT</strong></h3>
          </div>
        </router-link>
      </a>
      <div class="navbar-nav ml-auto">
        <router-link to="/register" v-if="!isAuthenticated"
          class="nav-link px-0 align-middle text-center btn btn-lg btn-block btn-outline-light register">
          <div style="display: flex; align-items: center; gap:10px;">
            <img src="../assets/verify.png" alt="register" class="nav-icon mr-2 ">
            <span><strong>Register</strong></span>
          </div>
        </router-link>
        <router-link to="/login" v-if="!isAuthenticated"
          class="nav-link px-0 align-middle text-center btn btn-lg btn-block btn-outline-light login">
          <div style="display: flex; align-items: center; gap:10px;">
            <img src="../assets/next.png" alt="Login" class="nav-icon mr-2 ">
            <span><strong>Login</strong></span>
          </div>
        </router-link>
        <button v-if="isAuthenticated" @click="logout"
          class="nav-item nav-link logout btn btn-lg btn-block btn-outline-light">
          <div style="display: flex; align-items: center; gap:10px;">
            <img src="../assets/arrow.png" alt="Login" class="nav-icon mr-2">
            <span><strong>Logout</strong></span>
          </div>
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
let isAuthenticated = ref(false);

onAuthStateChanged(auth, user => {
  isAuthenticated.value = !!user;
});

const logout = async () => {
  await signOut(auth);
  router.push('/login');
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  margin: 0 10px;
}

.router-link:visited {
  color: white;
}

.logo-container {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.logout {
  font-size: 20px;
  font-weight: bolder;
  background-color: var(--primary-color);
  /* Set background color */
  border: none;
  /* Remove border */
  margin: 0 10px;
  /* Adjust margin */
}

.login {
  font-size: 20px;
  font-weight: bolder;
}

.register {
  font-size: 20px;
  font-weight: bolder;
}

.nav-icon {
  width: 50px;
  height: 50px;
}

.register {
  margin-right: 10px;
  /* Add margin to the right of the register button */
}

.register:hover,
.login:hover,
.logout:hover {
  color: black;
  /* Change text color to black when hovering */
}
</style>
