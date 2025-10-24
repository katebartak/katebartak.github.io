import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../views/WelcomeView.vue'),
  },
  {
    path: '/main',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
