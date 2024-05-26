<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ProjectX</a>
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent"> <!-- Added 'd-flex justify-content-end' -->
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
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
