<template>
  <div class="login page">
    <div class="login-container">
      <h1 class="login-title">管理后台登录</h1>
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <button type="submit" class="btn btn-primary login-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const form = reactive({
  username: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    await login(form.username, form.password)
    router.push('/admin')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login {
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg) 0;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: var(--spacing-xl);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.login-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xl);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-group input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent-color);
}

.error-message {
  color: #e53e3e;
  font-size: 14px;
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-sm);
  background: #fef2f2;
  border-radius: 4px;
}

.login-btn {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 16px;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
