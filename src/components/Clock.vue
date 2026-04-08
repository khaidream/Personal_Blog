<template>
  <aside class="clock card">
    <h3 class="title">
      <span class="icon">🕐</span>
      实时时钟
    </h3>
    <div class="time-display">
      <div class="time">{{ currentTime }}</div>
      <div class="date">{{ currentDate }}</div>
      <div class="weekday">{{ weekday }}</div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
const weekday = ref('')

let timer = null

const updateTime = () => {
  const now = new Date()

  currentTime.value = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  weekday.value = weekdays[now.getDay()]
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.clock {
  padding: var(--spacing-md);
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: 1rem;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
}

.icon {
  font-size: 1.1rem;
}

.time-display {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.time {
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--accent-color);
  letter-spacing: 2px;
}

.date {
  font-size: 14px;
  color: var(--text-secondary);
}

.weekday {
  font-size: 14px;
  color: var(--text-muted);
}
</style>
