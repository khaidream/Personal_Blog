<template>
  <div class="admin-dashboard page">
    <div class="container">
      <h1 class="page-title">管理后台</h1>

      <div class="dashboard-cards">
        <div class="card stat-card" @click="$router.push('/admin/articles')">
          <h3>文章管理</h3>
          <p class="stat-value">{{ stats.articleCount }}</p>
          <p class="stat-label">文章总数</p>
        </div>

        <div class="card stat-card" @click="$router.push('/admin/notes')">
          <h3>手记管理</h3>
          <p class="stat-icon">📝</p>
          <p class="stat-label">管理我的手记</p>
        </div>

        <div class="card stat-card">
          <h3>总阅读量</h3>
          <p class="stat-value">{{ stats.totalViews }}</p>
          <p class="stat-label">浏览次数</p>
        </div>

        <div class="card stat-card" @click="$router.push('/admin/articles/create')">
          <h3>发布文章</h3>
          <p class="stat-icon">➕</p>
          <p class="stat-label">创建新文章</p>
        </div>

        <div class="card stat-card" @click="$router.push('/admin/notes/create')">
          <h3>发布手记</h3>
          <p class="stat-icon">✏️</p>
          <p class="stat-label">创建新手记</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useArticles } from '@/composables/useArticles'

const { fetchStats } = useArticles()
const stats = ref({ articleCount: 0, totalViews: 0 })

onMounted(async () => {
  stats.value = await fetchStats()
})
</script>

<style scoped>
.admin-dashboard {
  padding: var(--spacing-lg) 0;
}

.page-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-xl);
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.stat-card {
  cursor: pointer;
  text-align: center;
  padding: var(--spacing-xl);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.stat-card h3 {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-color);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-label {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: var(--spacing-sm);
}
</style>
