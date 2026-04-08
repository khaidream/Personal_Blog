<template>
  <aside class="profile-card card">
    <div class="avatar-wrapper">
      <img src="/assets/image/avator.jpg" alt="头像" class="avatar" />
    </div>
    <h2 class="name">Khai</h2>
    <p class="bio">一名普通的开发者</p>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-value">{{ stats.articleCount }}</span>
        <span class="stat-label">文章</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ stats.totalViews }}</span>
        <span class="stat-label">阅读</span>
      </div>
    </div>

    <div class="divider"></div>

    <div class="info-list">
      <div class="info-item">
        <span class="info-icon">📧</span>
        <span class="info-text">khai@blog.com</span>
      </div>
      <div class="info-item">
        <span class="info-icon">📍</span>
        <span class="info-text">佛山</span>
      </div>
      <div class="info-item">
        <span class="info-icon">🔗</span>
        <a href="https://github.com" target="_blank" class="info-link">GitHub</a>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useArticles } from '@/composables/useArticles'

const { fetchArticles, fetchStats } = useArticles()
const stats = ref({ articleCount: 0, totalViews: 0 })

onMounted(async () => {
  await fetchArticles()
  stats.value = await fetchStats()
})
</script>

<style scoped>
.profile-card {
  text-align: center;
  padding: var(--spacing-lg);
}

.avatar-wrapper {
  margin-bottom: var(--spacing-md);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--border-color);
}

.name {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-xs);
}

.bio {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: var(--spacing-md);
}

.stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
}

.divider {
  height: 1px;
  background: var(--border-color);
  margin: var(--spacing-md) 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  text-align: left;
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 14px;
  color: var(--text-secondary);
}

.info-icon {
  font-size: 16px;
}

.info-link {
  color: var(--accent-color);
}

.info-link:hover {
  text-decoration: underline;
}
</style>
