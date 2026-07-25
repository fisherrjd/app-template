import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from './views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: DashboardView },
    {
      path: '/project',
      name: 'project',
      component: () => import('./views/ProjectView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/BlogView.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'post',
      component: () => import('./views/BlogPostView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/SettingsView.vue'),
    },
    {
      path: '/styleguide',
      name: 'styleguide',
      component: () => import('./views/styleguide/StyleguideView.vue'),
    },
  ],
})

export default router
