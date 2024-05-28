<template>
    <div class="container">
      <div class="search-container">
        <input v-model="searchQuery" @keypress.enter="searchUsers" type="text" placeholder="Search by name...">
      </div>
      <div v-if="selectedUser">
        <div class="profile-container">
          <img :src="selectedUser.profileImage" alt="Profile Image" class="profile-image">
          <h2>{{ selectedUser.firstName }} {{ selectedUser.lastName }}</h2>
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>
          <p><strong>Birthday:</strong> {{ selectedUser.birthday }}</p>
          <p><strong>Location:</strong> {{ selectedUser.location }}</p>
          <p><strong>Website:</strong> <a :href="selectedUser.website" target="_blank">{{ selectedUser.website }}</a></p>
          <button @click="editUser">Edit Profile</button>
          <button @click="deleteUser">Delete Profile</button>
        </div>
        <div class="tweets-container">
          <h3>{{ selectedUser.firstName }}'s Tweets</h3>
          <div v-for="tweet in selectedUserTweets" :key="tweet.id" class="tweet">
            <p>{{ tweet.tweet }}</p>
            <img :src="tweet.imageUrl" alt="Tweet image" v-if="tweet.imageUrl" class="tweet-image">
            <p v-if="tweet.timestamp">{{ new Date(tweet.timestamp.seconds * 1000).toLocaleString() }}</p>
            <p v-else>Timestamp not available</p>
            <p>Likes: {{ tweet.likes }}</p>
            <button @click="deleteTweet(tweet.id)">Delete Tweet</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No user selected.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { db } from '../firebase/firebase';
  import { collection, getDocs, query, where, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
  
  const searchQuery = ref('');
  const selectedUser = ref(null);
  const selectedUserTweets = ref([]);
  
  const searchUsers = async () => {
    console.log('Search query:', searchQuery.value.trim());
    if (searchQuery.value.trim() !== '') {
      const q = query(collection(db, 'users'), where('firstName',  '==', searchQuery.value.trim()));
      const querySnapshot = await getDocs(q);
      console.log('Query snapshot:', querySnapshot);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        selectedUser.value = userDoc.data();
        selectedUser.value.id = userDoc.id;
        await loadTweets(userDoc.id);
      } else {
        selectedUser.value = null;
        selectedUserTweets.value = [];
      }
    } else {
      selectedUser.value = null;
      selectedUserTweets.value = [];
    }
  };
  
  const loadTweets = async (userId) => {
    const userTweetsQuery = query(
      collection(db, "tweets"),
      where("uid", "==", userId),
      orderBy("timestamp", "desc")
    );
  
    const userTweetsSnapshot = await getDocs(userTweetsQuery);
    selectedUserTweets.value = userTweetsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    console.log('Selected user tweets:', selectedUserTweets.value);
  };
  
  const deleteTweet = async (tweetId) => {
    await deleteDoc(doc(db, "tweets", tweetId));
    selectedUserTweets.value = selectedUserTweets.value.filter(tweet => tweet.id !== tweetId);
  };
  
  const editUser = async () => {
    const newFirstName = prompt("Enter new first name", selectedUser.value.firstName);
    if (newFirstName !== null) {
      const userDocRef = doc(db, "users", selectedUser.value.id);
      await updateDoc(userDocRef, { firstName: newFirstName });
      selectedUser.value.firstName = newFirstName;
    }
  };
  
  const deleteUser = async () => {
    const userDocRef = doc(db, "users", selectedUser.value.id);
    await deleteDoc(userDocRef);
    selectedUser.value = null;
    selectedUserTweets.value = [];
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .search-container {
    margin-bottom: 20px;
  }
  
  .profile-container {
    margin-bottom: 20px;
  }
  
  .profile-image {
    max-width: 150px;
    height: auto;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .tweet {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .tweet-image {
    max-width: 100%;
    height: auto;
  }
  </style>
  