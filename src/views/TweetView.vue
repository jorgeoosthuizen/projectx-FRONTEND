<template>
    <div class="tweet-form">
      <img :src="profileImage" alt="Profile" class="profile-image" />
      <textarea v-model="tweet" placeholder="What's happening?"></textarea>
      <input type="file" @change="onImageChange" />
      <button @click="postTweet">Tweet</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const tweet = ref('');
  const profileImage = ref('path/to/profile/image.jpg'); // Replace with actual path
  const tweetImage = ref(null);
  
  const postTweet = () => {
    console.log(tweet.value, tweetImage.value); // Replace this with your tweet posting logic
    tweet.value = '';
    tweetImage.value = null;
  };
  
  const onImageChange = (event) => {
    tweetImage.value = event.target.files[0];
  };
  </script>
  
  <style scoped>
  .tweet-form {
    width: 500px;
    margin: 0 auto;
  }
  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .tweet-form textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    resize: none;
  }
  .tweet-form button {
    width: 100%;
    padding: 10px;
    background-color: #1DA1F2;
    color: white;
    border: none;
    cursor: pointer;
  }
  .tweet-form button:hover {
    background-color: #0e80d2;
  }
  </style>