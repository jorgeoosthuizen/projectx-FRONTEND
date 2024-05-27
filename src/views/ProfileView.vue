<template>
  <div>
    <h1>Profile</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <!-- Add more fields as necessary -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = ref(null);
const loading = ref(true);

const getUserData = async () => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userDoc);

  if (userSnap.exists()) {
    user.value = userSnap.data();
  } else {
    console.log("No such user!");
  }
  loading.value = false;
};

onMounted(getUserData);
</script>
