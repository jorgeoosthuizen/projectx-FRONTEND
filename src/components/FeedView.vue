<template>
  <div class="tweet-form">
    <img :src="profileImage" alt="Profile" class="profile-image" />
    <div class="post-container">
    <textarea v-model="tweet" placeholder="What's happening?"></textarea>
    <input type="file" @change="onImageChange" />
    <button @click="postTweet">Tweet</button>
    </div>
  </div>
  <div class="feed">
    <h2>Home</h2>
    <div v-for="tweet in tweets" :key="tweet.id" class="tweet">
      <p>{{ tweet.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tweets = ref([
  { id: 1, content: 'This is a tweet' },
  { id: 2, content: 'Another tweet' },
])

const tweet = ref("");
const profileImage = ref("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ALtLfFX6o3KXfDw57OohwBS4-s8MU2f_VePXPx0zbA&s");
const tweetImage = ref(null);

const postTweet = () => {
  console.log(tweet.value, tweetImage.value);
  tweet.value = "";
  tweetImage.value = null;
};

const onImageChange = (event) => {
  tweetImage.value = event.target.files[0];
};
</script>

<style scoped>
.feed {
  max-width: 100%;
  margin: 0 auto;
}

.tweet {
  padding: 10px;
  border-bottom: 1px solid #e1e8ed;
}

.tweet-form {
  display: flex;
  width: 500px;
  margin: 0 auto;
}
.profile-image {
  width: 80px;
  height: 80px;
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
  background-color: #1da1f2;
  color: white;
  border: none;
  cursor: pointer;
}
.tweet-form button:hover {
  background-color: #0e80d2;
}

.post-container {
  margin-left: 20px;
}
</style>


