<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo">Khai Blog</router-link>

      <!-- 桌面端导航 -->
      <nav class="nav desktop-nav">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/articles" class="nav-link">文章</router-link>
        <router-link to="/gallery" class="nav-link">相册</router-link>
        <router-link to="/notes" class="nav-link">手记</router-link>
        <router-link to="/blogs" class="nav-link">优质博客</router-link>
        <router-link v-if="isLoggedIn" to="/admin" class="nav-link">管理</router-link>
      </nav>

      <div class="header-right">
        <ThemeToggle />
        <div v-if="isLoggedIn" class="user-info">
          <span class="username">{{ username }}</span>
          <button class="logout-btn" @click="handleLogout">登出</button>
        </div>
        <router-link v-else to="/login" class="nav-link login-link">登录</router-link>

        <!-- 移动端汉堡菜单按钮 -->
        <button class="hamburger" @click="toggleMobileMenu" :class="{ active: showMobileMenu }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <Transition name="slide-down">
      <nav v-if="showMobileMenu" class="mobile-nav">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">首页</router-link>
        <router-link to="/articles" class="mobile-nav-link" @click="closeMobileMenu">文章</router-link>
        <router-link to="/gallery" class="mobile-nav-link" @click="closeMobileMenu">相册</router-link>
        <router-link to="/notes" class="mobile-nav-link" @click="closeMobileMenu">手记</router-link>
        <router-link to="/blogs" class="mobile-nav-link" @click="closeMobileMenu">优质博客</router-link>
        <router-link v-if="isLoggedIn" to="/admin" class="mobile-nav-link" @click="closeMobileMenu">管理</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="mobile-nav-link" @click="closeMobileMenu">登录</router-link>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn, username, checkStatus, logout } = useAuth()
const showMobileMenu = ref(false)
const isScrolled = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const handleLogout = async () => {
  await logout()
  closeMobileMenu()
  router.push('/')
}

// 滚动检测
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 点击窗口其他位置关闭菜单
const handleClickOutside = (e) => {
  if (showMobileMenu.value && !e.target.closest('.header')) {
    closeMobileMenu()
  }
}

// ESC 键关闭菜单
const handleEscKey = (e) => {
  if (e.key === 'Escape' && showMobileMenu.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  checkStatus()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleEscKey)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
}

.header.scrolled {
  background: var(--bg-primary);
  border-bottom-color: var(--border-color);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.desktop-nav {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  padding: var(--spacing-sm) 0;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: width 0.2s;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.username {
  font-size: 14px;
  color: var(--text-secondary);
}

.logout-btn {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
}

.logout-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.login-link {
  font-size: 14px;
}

/* 汉堡菜单按钮 */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  gap: 5px;
}

.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text-primary);
  transition: all 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* 移动端菜单 */
.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

.mobile-nav-link {
  padding: var(--spacing-md);
  color: var(--text-secondary);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: var(--bg-secondary);
  color: var(--accent-color);
}

/* 过渡动画 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 响应式 */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .login-link,
  .user-info {
    display: none;
  }
}
</style>
