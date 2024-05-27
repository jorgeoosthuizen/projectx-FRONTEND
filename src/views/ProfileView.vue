<template>
  <div class="profile-container">
    <h1>Profile</h1>
    <div v-if="loading">Loading...</div>
    <div v-else class="profile-info">
      <img :src="user.profileImage" alt="Profile" class="profile-image" />
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Joined: {{ user.joinedDate }}</p>
      <p>Bio: {{ user.bio }}</p>
      <p>Location: {{ user.location }}</p>
      <p>Website: {{ user.website }}</p>
      <p>Birthday: {{ user.birthday }}</p>
      <button @click="editing = true" class="edit-button">Edit Profile</button>
    </div>
    <div v-if="editing" class="edit-form">
      <h2>Edit Profile</h2>
      <form @submit.prevent="editProfile">
        <label for="name">Name:</label>
        <input id="name" v-model="user.name" type="text" />
        <label for="bio">Bio:</label>
        <input id="bio" v-model="user.bio" type="text" />
        <label for="location">Location:</label>
        <input id="location" v-model="user.location" type="text" />
        <label for="website">Website:</label>
        <input id="website" v-model="user.website" type="text" />
        <label for="birthday">Birthday:</label>
        <input id="birthday" v-model="user.birthday" type="date" />
        <button type="submit" class="save-button">Save</button>
        <button @click="editing = false" class="cancel-button">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = ref(null);
const loading = ref(true);
const editing = ref(false);

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

const editProfile = async () => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userDoc, {
    name: user.value.name,
    bio: user.value.bio,
    location: user.value.location,
    website: user.value.website,
    birthday: user.value.birthday
  });
  editing.value = false;
};

onMounted(getUserData);
</script>
