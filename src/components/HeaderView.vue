<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ProjectX</a>
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
</style>