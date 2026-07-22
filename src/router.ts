import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/styleguide',
      name: 'styleguide',
      component: () => import('./views/styleguide/StyleguideView.vue'),
    },
  ],
})

export default router
