// 全局 Toast 辅助函数
import { useToastStore } from '@/composables/useToast'

let toastStore = null

const initToast = () => {
  if (!toastStore) {
    toastStore = useToastStore()
  }
}

export const toast = {
  success: (message, duration) => {
    initToast()
    return toastStore.success(message, duration)
  },
  error: (message, duration) => {
    initToast()
    return toastStore.error(message, duration)
  },
  warning: (message, duration) => {
    initToast()
    return toastStore.warning(message, duration)
  },
  info: (message, duration) => {
    initToast()
    return toastStore.info(message, duration)
  }
}