<template>
<div class="container-fluid col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <router-link to="/home" class="nav-link px-0 align-middle">Home </router-link>
                    </li>
                    <li>
                        <router-link to="/profile" class="nav-link px-0 align-middle">Profile </router-link>
                    </li>
                </ul>
                <hr>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
</script>

<style scoped>
/* Remove the width property from the .container-fluid style */
/* Keep other styles as is */
.container-fluid {
  /* width: 200px; */ /* Remove this line */
  background-color: #000000;
  padding: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  margin-bottom: 10px;
}

nav a {
  text-decoration: none;
  color: #ffffff;
}

.nav-link{
    text-decoration: none;
    color:white;
}

.nav-link:hover{
    text-decoration: none;
    color:white;
}
</style>
