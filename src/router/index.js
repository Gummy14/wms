import Menu from '@/components/Menu.vue'
import Items from '@/components/RegisterItem.vue'
import Containers from '@/components/RegisterContainer.vue'
import Pick from '@/components/Pick.vue'
import Putaway from '@/components/Putaway.vue'
import Orders from '@/components/Orders.vue'
import Packaging from '@/components/Packaging.vue'
import Shipping from '@/components/Shipping.vue'
import History from '@/components/History.vue'
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
      path: '/items',
      name: 'items',
      component: Items
    },
    {
      path: '/containers',
      name: 'containers',
      component: Containers
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
      path: '/pick',
      name: 'pick',
      component: Pick
    },
    {
      path: '/packaging',
      name: 'packaging',
      component: Packaging
    },
    {
      path: '/shipping',
      name: 'shipping',
      component: Shipping
    },
    {
      path: '/history',
      name: 'history',
      component: History
    }
  ]
})

export default router
