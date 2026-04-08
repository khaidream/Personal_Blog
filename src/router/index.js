import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: () => import('@/views/ArticleList.vue')
  },
  {
    path: '/article/:slug',
    name: 'ArticleDetail',
    component: () => import('@/views/ArticleDetail.vue'),
    props: true
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('@/views/Gallery.vue')
  },
  {
    path: '/blogs',
    name: 'GoodBlogs',
    component: () => import('@/views/GoodBlogs.vue')
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('@/views/Notes.vue')
  },
  {
    path: '/note/:slug',
    name: 'NoteDetail',
    component: () => import('@/views/NoteDetail.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/admin/views/AdminDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/articles',
    name: 'AdminArticleList',
    component: () => import('@/admin/views/ArticleManage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/articles/create',
    name: 'AdminArticleCreate',
    component: () => import('@/admin/views/ArticleEditor.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/articles/edit/:id',
    name: 'AdminArticleEdit',
    component: () => import('@/admin/views/ArticleEditor.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/notes',
    name: 'AdminNoteList',
    component: () => import('@/admin/views/NoteManage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/notes/create',
    name: 'AdminNoteCreate',
    component: () => import('@/admin/views/NoteEditor.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/notes/edit/:id',
    name: 'AdminNoteEdit',
    component: () => import('@/admin/views/NoteEditor.vue'),
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach(async (to, _from, next) => {
  const { isLoggedIn, checkStatus } = useAuth()

  // 检查登录状态
  if (to.meta.requiresAuth) {
    await checkStatus()
    if (!isLoggedIn.value) {
      return next({ name: 'Login', query: { redirect: to.fullPath } })
    }
  }

  // 如果已登录访问登录页，跳转到管理后台
  if (to.name === 'Login') {
    await checkStatus()
    if (isLoggedIn.value) {
      return next({ name: 'AdminDashboard' })
    }
  }

  next()
})

export default router
