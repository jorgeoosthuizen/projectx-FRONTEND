import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../components/FeedView.vue'
import Following from '../views/FollowingView.vue'
import ForYou from '../views/ForyouView.vue'


const routes = [
  { path: '/', component: Feed },
  { path: '/following', component: Following },
  { path: '/foryou', component: ForYou },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
