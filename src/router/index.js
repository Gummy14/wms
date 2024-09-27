import Menu from '@/components/Menu.vue'
import Putaway from '@/components/Putaway.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '*',
    //   name: 'main-menu',
    //   component: Menu
    // },
    {
      path: '/',
      name: 'main-menu',
      component: Menu
    },
    {
      path: '/putaway',
      name: 'putaway',
      component: Putaway
    }
  ]
})

export default router
