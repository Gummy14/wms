import { firebaseAuth } from '@/firebase'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/home/Home.vue'
import Login from '@/components/login/Login.vue'

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
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { 
        requiresAuth: true 
      }
    }
  ]
})

router.beforeEach((to, from) => {
  const currentUser = firebaseAuth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    return '/'
  }
})


export default router
