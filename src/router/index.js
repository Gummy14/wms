import Items from '@/components/Items.vue'
import Containers from '@/components/Locations.vue'
import Orders from '@/components/Orders.vue'
import Packaging from '@/components/Packaging.vue'
import Shipping from '@/components/Shipping.vue'
import History from '@/components/History.vue'
import Data from '@/components/Data.vue'
import ObjectScanner from '@/components/ObjectScanner.vue'
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
      name: 'data',
      component: Data
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
    },
    {
      path: '/data',
      name: 'data',
      component: Data
    },
    {
      path: '/objectscanner',
      name: 'objectscanner',
      component: ObjectScanner
    }
  ]
})

export default router
