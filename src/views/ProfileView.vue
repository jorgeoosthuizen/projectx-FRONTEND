<template>
  <div class="container mt-5">
    <div class="card">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <span>Edit Profile</span>
        <button class="btn btn-secondary" @click="goBack">
          Back to Dashboard
        </button>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateProfile">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="name" />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
            />
          </div>
          <div class="mb-3">
            <label for="dob" class="form-label">Date of Birth</label>
            <input type="date" class="form-control" id="dob" v-model="dob" />
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <div v-if="updateStatus" class="alert alert-success mt-3" role="alert">
          Profile updated successfully!
        </div>
        <div v-if="updateError" class="alert alert-danger mt-3" role="alert">
          Error updating profile: 
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.card-header {
  font-weight: bold;
}
</style>
