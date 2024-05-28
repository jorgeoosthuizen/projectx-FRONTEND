<template>
    <div class="container-fluid col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 justify-content-center">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
              <li class="nav-item w-100 mb-3">
                <router-link to="/home" class="nav-link px-0 align-middle text-center btn btn-lg btn-block btn-outline-light">Home</router-link>
              </li>
              <li class="w-100 mb-3">
                <router-link to="/dashboard" class="nav-link px-0 align-middle text-center btn btn-lg btn-block btn-outline-light">Dashboard</router-link>
              </li>
              <li class="w-100 mb-3">
                <router-link to="/profile" class="nav-link px-0 align-middle text-center btn btn-lg btn-block btn-outline-light">Profile</router-link>
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
  .container-fluid {
    background-color: #000000;
    padding: 20px;
  }
  
  nav ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }
  
  nav li {
    width: 100%;
  }
  
  .nav-link {
    text-decoration: none;
    color: white;
    width: 100%;
    display: block;
    padding: 10px;
    font-size: 1.2rem; /* Increase font size */
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
    color: white;
  }
  
  @media (max-width: 768px) {
    .container-fluid {
      padding: 10px;
    }
  
    .nav-link {
      padding: 8px;
      font-size: 1rem; /* Adjust font size for smaller screens */
    }
  }
  </style>
  