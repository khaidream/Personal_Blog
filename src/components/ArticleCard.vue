<template>
  <router-link :to="`/article/${article.slug}`" class="article-card">
    <div class="card-content">
      <div class="card-meta">
        <span class="tag" v-for="tag in (article.tags || [])" :key="tag">{{ tag }}</span>
        <span class="read-time">{{ article.readTime || '5 min read' }}</span>
      </div>
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-desc">{{ article.description }}</p>
      <div class="card-footer">
        <span class="date">{{ formatDate(article.created_at || article.date) }}</span>
        <span class="views">{{ article.view_count || 0 }} 阅读</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}
</script>

<style scoped>
.article-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.article-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateX(4px);
}

.card-content {
  padding: 14px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  padding-bottom: 2px;
}

.tag::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: oklch(0.8721084092316361 0.07038022055182423 239.6772609260845);
  transition: width 0.3s ease;
}

.tag:hover::after {
  width: 100%;
}

.read-time {
  font-size: 12px;
  color: var(--text-muted);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  transition: color 0.3s;
}

.card-desc {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.card-footer {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  font-size: 13px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .card-content {
    padding: var(--spacing-md);
  }
}
</style>
