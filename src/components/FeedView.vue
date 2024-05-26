<template>
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
</style>
