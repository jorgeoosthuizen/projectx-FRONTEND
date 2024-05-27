<template>
  <div id="app">
    <Header />
    <div class="main-container">
      <Sidebar />
      <div class="content-container">
        <div class="foryou-following-container">
          <ForyouFollowing></ForyouFollowing>
          <TweetView/>
        </div>
        <main class="content">
          <router-view />
        </main>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/HeaderView.vue'
import Sidebar from './components/SidebarView.vue'
import Footer from './components/FooterView.vue'
import ForyouFollowing from './components/ForyouFollowingView.vue'
import TweetView from './views/TweetView.vue'
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.foryou-following-container {
  align-self: flex-start;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

header,
footer {
  background-color: #1DA1F2;
  color: white;
  padding: 10px;
  text-align: center;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}
</style>
