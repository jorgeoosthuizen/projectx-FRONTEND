<template>
  <div class="container-fluid">
    <div class="search-bar">
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
    <nav>
      <ul>
        <!-- Add your trending topics here -->
      </ul>
    </nav>
    <div class="suggestions">
      <!-- Add your who to follow suggestions here -->
    </div>
  </div>
</template>

<script setup>
// Import your components here
</script>

<style scoped>
.container-fluid {
  background-color: #f5f8fa;
  padding: 20px;
  width: 300px; /* Set a fixed width */
}

.search-bar {
  /* Style your search bar here */
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
  color: #1da1f2; /* Twitter blue */
}

.suggestions {
  /* Style your suggestions here */
}
</style>
