<template>
  <Transition name="fade">
    <div v-if="progress > 0" class="reading-progress">
      <svg class="progress-ring" :width="size" :height="size">
        <circle
          class="ring-bg"
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          :stroke-width="strokeWidth"
        />
        <circle
          class="ring-progress"
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
      <span class="progress-text">{{ Math.round(progress) }}%</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const size = 18
const strokeWidth = 2
const radius = (size - strokeWidth) / 2
const circumference = 2 * Math.PI * radius

const dashOffset = computed(() => {
  return circumference - (progress.value / 100) * circumference
})

let rafId = null

const updateProgress = () => {
  rafId = requestAnimationFrame(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight

    if (docHeight > 0) {
      progress.value = Math.min((scrollTop / docHeight) * 100, 100)
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<style scoped>
.reading-progress {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
}

.progress-ring {
  transform: rotate(-90deg);
}

.ring-bg {
  stroke: var(--bg-secondary);
}

.ring-progress {
  stroke: oklch(0.6392834772556751 0.09760511787968305 146.3916057090713);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.15s ease-out;
}

.progress-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  min-width: 28px;
  text-align: right;
  font-family: 'Instrument Sans', sans-serif;
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