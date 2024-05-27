<template>
  <div id="app">
    <Header />
    <div class="main-container">
      <Sidebar />
      <div class="content-container">
        <main class="content">
          <router-view />
        </main>
      </div>
      <SidebarRight/>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/HeaderView.vue'
import Sidebar from './components/SidebarView.vue'
import Footer from './components/FooterView.vue'
import SidebarRight from './components/SidebarRightView.vue'
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.content-container {
  display: flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  width: 100%; /* Add this */
  height: 100%; /* Add this */
}

.foryou-following-container {
  align-self: flex-start;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  width: 100%; /* Add this */
  height: 100%; /* Add this */
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
