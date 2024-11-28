import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CardsView from '@/views/CardsView.vue'
import About from '@/views/AboutPage.vue'
import DataStorage from '@/views/DataStorage.vue'
import CardsView2 from '@/views/CardsView2.vue'

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
      component: CardsView
    },
    {
      path: '/cardsxx',
      name: 'cards2 xx',
      component: CardsView2
    },
    {
      path: '/cards/:id',
      name: 'cardsByTagId',
      component: CardsView
    },
    {
      path: '/data',
      name: 'data',
      component: DataStorage
    }
  ]
})

export default router
