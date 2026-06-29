<template>
  <div v-if="appName" class="active-app-icon" :title="appName">
    <Transition name="fade" mode="out-in">
      <img
        v-if="iconSrc"
        :key="appName"
        :src="iconSrc"
        :alt="appName"
        class="app-icon"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const API_BASE = 'http://localhost:3001'
const appName = ref('')
const iconSrc = ref('')
let timer = null

const fetchActiveApp = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/active-app`)
    const data = await res.json()
    if (data.name && data.icon) {
      appName.value = data.name
      iconSrc.value = `data:image/png;base64,${data.icon}`
    } else {
      appName.value = ''
      iconSrc.value = ''
    }
  } catch {
    // 静默失败，保持上次状态
  }
}

onMounted(() => {
  fetchActiveApp()
  timer = setInterval(fetchActiveApp, 2000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.active-app-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 8px;
}

.app-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 6px;
  transition: transform 0.2s;
}

.app-icon:hover {
  transform: scale(1.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
