<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ProjectX</a>
      <div class="navbar-nav ml-auto">
        <router-link to="/register" class="nav-item nav-link">Register</router-link>
        <router-link to="/login" class="nav-item nav-link">Login</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.router-link {
  text-decoration: none;
  margin: 0 10px;
}

.router-link:visited {
  color: white;
}
</style>