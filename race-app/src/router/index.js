import { createRouter, createMemoryHistory } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView,
  },
  {
    path: '/main',
    name: 'Home',
    component: HomeView,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
