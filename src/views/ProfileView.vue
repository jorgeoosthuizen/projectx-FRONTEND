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
          Error updating profile: {{ updateError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "ProfilePage",
  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const dob = ref("");
    const userId = ref("");
    const updateStatus = ref(false);
    const updateError = ref("");

    const getUser = async () => {
      try {
        const response = await axios.get("/api/user", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        const user = response.data;
        name.value = user.name;
        email.value = user.email;
        dob.value = user.dob;
        userId.value = user.id;
      } catch (error) {
        console.error(error);
      }
    };

    const updateProfile = async () => {
      try {
        await axios.put(
          `/api/user/${userId.value}`,
          {
            name: name.value,
            email: email.value,
            dob: dob.value,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        updateStatus.value = true;
        updateError.value = "";
      } catch (error) {
        updateStatus.value = false;
        updateError.value = error.message;
      }
    };

    const goBack = () => {
      router.push("/dashboard");
    };

    onMounted(() => {
      if (!localStorage.getItem("token")) {
        router.push("/");
      } else {
        getUser();
      }
    });

    return {
      name,
      email,
      dob,
      updateProfile,
      goBack,
      updateStatus,
      updateError,
    };
  },
};
</script>

<style scoped>
.card-header {
  font-weight: bold;
}
</style>
