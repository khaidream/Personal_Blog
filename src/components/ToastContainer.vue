<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="[`toast-${toast.type}`]"
        @click="removeToast(toast.id)"
      >
        <span class="toast-icon">{{ getIcon(toast.type) }}</span>
        <span class="toast-message">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { useToastStore } from '@/composables/useToast'

const { toasts, removeToast } = useToastStore()

const getIcon = (type) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }
  return icons[type] || icons.info
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: calc(var(--header-height) + var(--spacing-md));
  right: var(--spacing-md);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--shadow-hover);
  cursor: pointer;
  pointer-events: auto;
  max-width: 320px;
  font-size: 14px;
}

.toast-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.toast-message {
  color: var(--text-primary);
}

.toast-success {
  border-left: 3px solid #22c55e;
}

.toast-success .toast-icon {
  color: #22c55e;
}

.toast-error {
  border-left: 3px solid #ef4444;
}

.toast-error .toast-icon {
  color: #ef4444;
}

.toast-warning {
  border-left: 3px solid #f59e0b;
}

.toast-warning .toast-icon {
  color: #f59e0b;
}

.toast-info {
  border-left: 3px solid #3b82f6;
}

.toast-info .toast-icon {
  color: #3b82f6;
}

/* 过渡动画 */
.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>