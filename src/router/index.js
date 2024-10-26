import Menu from '@/components/Menu.vue'
import RegisterItem from '@/components/RegisterItem.vue'
import RegisterContainer from '@/components/RegisterContainer.vue'
import PickByContainerId from '@/components/PickByContainerId.vue'
import PickByItemId from '@/components/PickByItemId.vue'
import Putaway from '@/components/Putaway.vue'
import Orders from '@/components/Orders.vue'
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
      path: '/putaway',
      name: 'putaway',
      component: Putaway
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/pick-by-container',
      name: 'pick-by-container',
      component: PickByContainerId
    },
    {
      path: '/pick-by-item',
      name: 'pick-by-item',
      component: PickByItemId
    }
  ]
})

export default router
