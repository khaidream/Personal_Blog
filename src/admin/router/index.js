import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/admin/views/AdminDashboard.vue')
  },
  {
    path: '/admin/articles',
    name: 'AdminArticleList',
    component: () => import('@/admin/views/ArticleManage.vue')
  },
  {
    path: '/admin/articles/create',
    name: 'AdminArticleCreate',
    component: () => import('@/admin/views/ArticleEditor.vue')
  },
  {
    path: '/admin/articles/edit/:id',
    name: 'AdminArticleEdit',
    component: () => import('@/admin/views/ArticleEditor.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
