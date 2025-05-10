import Items from '@/components/home/Items.vue'
import Containers from '@/components/home/Locations.vue'
import Orders from '@/components/home/Orders.vue'
import Home from '@/components/home/Home.vue'
import ObjectScanner from '@/components/scanning/ObjectScanner.vue'
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
      name: 'home',
      component: Home
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
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/objectscanner',
      name: 'objectscanner',
      component: ObjectScanner
    }
  ]
})

export default router
