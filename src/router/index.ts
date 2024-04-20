import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CardsPage from '@/views/CardsPage.vue'
import About from '@/views/AboutPage.vue'
import ConfigPage from '@/views/ConfigPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardsPage
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigPage
    }
  ]
})

export default router
