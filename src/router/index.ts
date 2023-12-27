import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import HomeCards from '@/views/HomeCards.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/cards',
      component: HomePage,
      children: [
        {
          path: 'cards',
          component: HomeCards
        }
      ]
    }
  ]
})

export default router
