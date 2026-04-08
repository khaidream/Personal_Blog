<template>
  <router-link :to="`/article/${article.slug}`" class="article-card">
    <article>
      <h2 class="title">{{ article.title }}</h2>
      <div class="meta">
        <span class="date">{{ formatDate(article.created_at || article.date) }}</span>
        <span class="views">👁 {{ article.view_count || 0 }}</span><span v-for="tag in (article.tags || [])" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <p class="description">{{ article.description }}</p>
      <span class="read-more">阅读更多 →</span>
    </article>
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
  return `${year}-${month}-${day}`
}
</script>

<style scoped>
.article-card {
  display: block;
  padding: var(--spacing-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s;
}

.article-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
  border-color: var(--accent-color);
}

.title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.article-card:hover .title {
  color: var(--accent-color);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  font-size: 14px;
  color: var(--text-muted);
}

.views {
  padding: 2px 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  font-size: 12px;
}

.tag {
  padding: 2px 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  font-size: 12px;
}

.description {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  display: inline-block;
  margin-top: var(--spacing-md);
  color: var(--accent-color);
  font-size: 14px;
  font-weight: 500;
}
</style>
