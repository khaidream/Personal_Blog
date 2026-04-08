<template>
  <div class="app">
    <SeoMeta />
    <Header />
    <main class="main">
      <router-view v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </router-view>
    </main>
    <Footer />
    <ToastContainer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/composables/useTheme'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import ToastContainer from '@/components/ToastContainer.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.init()
})
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
