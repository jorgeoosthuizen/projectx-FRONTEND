<template>
  <div class="tweet-form">
    <img :src="profileImage" alt="Profile" class="profile-image" />
    <div class="post-container">
      <textarea v-model="tweet" placeholder="What's happening?"></textarea>
      <input type="file" @change="onImageChange" />
      <button @click="postTweet">Tweet</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth } from '../firebase/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();
const tweet = ref("");
const profileImage = ref("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ALtLfFX6o3KXfDw57OohwBS4-s8MU2f_VePXPx0zbA&s");
const tweetImage = ref(null);
const userEmail = ref("");

onMounted(async () => {
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    userEmail.value = docSnap.data().email;
  } else {
    console.log('No such document!');
  }
});

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
.card-header {
  font-weight: bold;
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


