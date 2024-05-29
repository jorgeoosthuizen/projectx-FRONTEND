<template>
  <div class="container mt-4">
    <div class="row">
      <!-- Feed de Notícias -->
      <div class="col-md-8">
        <h2>Feed de Notícias</h2>
        <div v-if="loading" class="text-center">Carregando notícias...</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-else>
          <div v-for="article in articles" :key="article.url" class="card mb-4">
            <img
              :src="article.urlToImage"
              class="card-img-top"
              alt="Imagem da notícia"
              v-if="article.urlToImage"
            />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text">{{ article.description }}</p>
              <a :href="article.url" target="_blank" class="btn btn-primary"
                >Leia mais</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Barra Lateral -->
      <div class="col-md-4">
        <!-- Tendências -->
        <div class="mb-4">
          <h2>Tendências</h2>
          <ul class="list-group">
            <li class="list-group-item" v-for="trend in trends" :key="trend">
              {{ trend }}
            </li>
          </ul>
        </div>

        <!-- Sugestões de Seguimento -->
        <div>
          <h2>Quem seguir</h2>
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
              v-for="suggestion in suggestions"
              :key="suggestion.handle"
            >
              <div>
                <h5 class="mb-0">{{ suggestion.name }}</h5>
                <p class="mb-0 text-muted">{{ suggestion.handle }}</p>
              </div>
              <button
                @click="toggleFollow(suggestion.uid)"
                class="btn btn-outline-primary"
              >
                {{
                  followingUsers.includes(suggestion.uid)
                    ? "Unfollow"
                    : "Follow"
                }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const articles = ref([]);
const trends = ref(["#Tendência1", "#Tendência2", "#Tendência3"]);
const suggestions = ref([]);
const followingUsers = ref([]);
const loading = ref(true);
const error = ref(null);

const setFollowersDocument = async (uid) => {
  const userRef = doc(db, "followers", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, { followers: [], following: [] });
  }
};

const fetchNews = async () => {
  const apiKey = "3e3ba585f86a421c89a727d58f2b037a";
  const url = `https://newsapi.org/v2/top-headlines?country=pt&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    articles.value = response.data.articles;
  } catch (err) {
    error.value = "Falha ao carregar notícias";
  } finally {
    loading.value = false;
  }
};

const fetchSuggestions = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, "followers", user.uid);
      const userSnap = await getDoc(userDoc);
      const currentUserFollowing = userSnap.exists()
        ? userSnap.data().following || []
        : [];
      followingUsers.value = currentUserFollowing;

      const querySnapshot = await getDocs(collection(db, "users"));
      suggestions.value = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), uid: doc.id }))
        .filter(
          (suggestion) =>
            suggestion.name &&
            suggestion.uid !== user.uid &&
            !currentUserFollowing.includes(suggestion.uid)
        );
    }
  } catch (err) {
    console.error("Error fetching suggestions: ", err);
  }
};

const loadFollowingUsers = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = doc(db, "followers", user.uid);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists() && userSnap.data().following) {
      const followingIds = userSnap.data().following;
      followingUsers.value = followingIds.filter((id) => id !== user.uid);
    }
  }
};

const toggleFollow = async (uid) => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = doc(db, "followers", user.uid);
    const userSnap = await getDoc(userDoc);

    const targetUserDoc = doc(db, "followers", uid);
    let targetUserSnap = await getDoc(targetUserDoc);

    if (!targetUserSnap.exists()) {
      await setDoc(targetUserDoc, { followers: [], following: [] });
      targetUserSnap = await getDoc(targetUserDoc);
    }

    if (userSnap.exists() && targetUserSnap.exists()) {
      const currentFollowing = userSnap.data().following || [];
      const isFollowing = currentFollowing.includes(uid);
      const updatedFollowing = isFollowing
        ? currentFollowing.filter((id) => id !== uid)
        : [...currentFollowing, uid];

      await updateDoc(userDoc, { following: updatedFollowing });
      followingUsers.value = updatedFollowing;

      const currentFollowers = targetUserSnap.data().followers || [];
      const updatedFollowers = isFollowing
        ? currentFollowers.filter((id) => id !== user.uid)
        : [...currentFollowers, user.uid];

      await updateDoc(targetUserDoc, { followers: updatedFollowers });
    }
  }
};

onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    await setFollowersDocument(user.uid);
    await fetchSuggestions();
    await loadFollowingUsers();
  }
  fetchNews();
});
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
