<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="height: 80px;">
    <div class="container-fluid" style="padding-top: 20px; padding-bottom: 20px;">
      <a class="navbar-brand" href="#">
        <router-link to="/" class="nav-item nav-link">  
        <div class="logo-container">
        <img class="logo" src="../assets/chitchat.png" alt="CHITCHAT" style="height: 80px;">
        <h4>CHITCHAT</h4>
      </div>
    </router-link>
      </a>
      <div class="navbar-nav ml-auto">
        <router-link v-if="!isAuthenticated" to="/register" class="nav-item nav-link">Register</router-link>
        <router-link v-if="!isAuthenticated" to="/login" class="nav-item nav-link">Login</router-link>
        <button v-if="isAuthenticated" @click="logout" class="nav-item nav-link">Logout</button>
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

.logo-container{
  display:flex;
  align-items: center;
  flex-direction: row;
}
</style>
