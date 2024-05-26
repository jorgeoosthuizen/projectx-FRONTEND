<template>
    <div class="bar">
  <nav class="navbar-nav mx-auto mb-2 mb-lg-0 d-flex flex-row">
    <!-- Changed 'ul' to 'nav' -->
    <!-- Changed 'me-auto' to 'mx-auto' -->
    <router-link to="/foryou" class="nav-item router-link">For You</router-link>
    <!-- Removed 'li' and 'nav-item' classes -->
    <router-link to="/following" class="nav-item router-link"
      >Following</router-link
    >
    <!-- Removed 'li' and 'nav-item' classes -->
  </nav>
  </div>
</template>

<script setup></script>

<style scoped>

.bar{
    height:fit-content;
}
.router-link {
  text-decoration: none;
  margin: 0 10px;
  font-size: 18px; /* Adjust the font size as desired */
  display: inline-block; /* Change display to inline-block */
}

.router-link:visited {
  color: rgb(5, 4, 4);
}
</style>
