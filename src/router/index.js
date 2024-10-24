import Menu from '@/components/Menu.vue'
import RegisterItem from '@/components/RegisterItem.vue'
import RegisterContainer from '@/components/RegisterContainer.vue'
import PickByContainer from '@/components/PickByContainer.vue'
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
      path: '/register-item',
      name: 'register-item',
      component: RegisterItem
    },
    {
      path: '/register-container',
      name: 'register-container',
      component: RegisterContainer
    },
    {
      path: '/pick-by-container',
      name: 'pick-by-container',
      component: PickByContainer
    },
    {
      path: '/putaway',
      name: 'putaway',
      component: Putaway
    }
  ]
})

export default router
