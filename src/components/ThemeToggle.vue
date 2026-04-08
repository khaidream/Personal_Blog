<template>
  <button class="theme-toggle" @click="themeStore.toggleTheme" :title="themeStore.isDark ? '切换到亮色模式' : '切换到深色模式'">
    <span class="icon">{{ themeStore.isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>

<script setup>
import { useThemeStore } from '@/composables/useTheme'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: var(--bg-secondary);
  transition: background-color 0.2s;
}

.theme-toggle:hover {
  background: var(--border-color);
}

.icon {
  font-size: 18px;
  line-height: 1;
}
</style>
