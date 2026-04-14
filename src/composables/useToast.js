import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])
  let id = 0

  const addToast = (message, type = 'info', duration = 3000) => {
    const newId = ++id
    toasts.value.push({ id: newId, message, type })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(newId)
      }, duration)
    }

    return newId
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message, duration) => addToast(message, 'success', duration)
  const error = (message, duration) => addToast(message, 'error', duration)
  const warning = (message, duration) => addToast(message, 'warning', duration)
  const info = (message, duration) => addToast(message, 'info', duration)

  return { toasts, addToast, removeToast, success, error, warning, info }
})