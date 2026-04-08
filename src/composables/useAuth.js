import { ref } from 'vue'

const API_BASE = 'http://localhost:3001/api'
const isLoggedIn = ref(false)
const username = ref('')

export function useAuth() {
  async function checkStatus() {
    try {
      const res = await fetch(`${API_BASE}/auth/status`, {
        credentials: 'include'
      })
      const data = await res.json()
      isLoggedIn.value = data.isLoggedIn
      username.value = data.username || ''
      return data.isLoggedIn
    } catch (e) {
      console.error('Failed to check auth status:', e)
      isLoggedIn.value = false
      return false
    }
  }

  async function login(user, pass) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: user, password: pass })
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || '登录失败')
    }
    isLoggedIn.value = true
    username.value = data.username
    return data
  }

  async function logout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (e) {
      console.error('Failed to logout:', e)
    } finally {
      isLoggedIn.value = false
      username.value = ''
    }
  }

  return {
    isLoggedIn,
    username,
    checkStatus,
    login,
    logout
  }
}
