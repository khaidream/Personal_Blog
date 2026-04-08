<template>
  <div class="article-detail page">
    <div class="container">
      <ReadingProgress class="article-progress" />
      <article v-if="article" class="article">
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="date">{{ formatDate(article.created_at) }}</span>
            <span class="views">👁️ {{ article.view_count }}</span>
            <span v-if="article.tags" class="tags">
              <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
            </span>
          </div>
          <p v-if="article.description" class="article-description">{{ article.description }}</p>
        </header>
        <div class="article-content">
          <MarkdownRender :content="article.content" />
        </div>
        <footer class="article-footer">
          <router-link to="/articles" class="back-link">← 返回文章列表</router-link>
        </footer>
      </article>

      <div v-else-if="loading" class="loading">
        <p>加载中...</p>
      </div>

      <div v-else class="not-found">
        <h2>文章不存在</h2>
        <p>抱歉，您访问的文章不存在或已被删除。</p>
        <router-link to="/articles" class="btn btn-primary">返回文章列表</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticles } from '@/composables/useArticles'
import MarkdownRender from '@/components/MarkdownRender.vue'
import ReadingProgress from '@/components/ReadingProgress.vue'

const route = useRoute()
const { getArticleBySlug, incrementViewCount } = useArticles()

const article = ref(null)
const loading = ref(true)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

onMounted(async () => {
  const slug = route.params.slug
  article.value = await getArticleBySlug(slug)
  if (article.value) {
    await incrementViewCount(slug)
    article.value.view_count = (article.value.view_count || 0) + 1
  }
  loading.value = false
})
</script>

<style scoped>
.article {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg) 0;
}

.article-progress {
  position: fixed;
  z-index: 50;
  /* 固定在文章右侧，垂直居中 */
  left: 50%;
  margin-left: calc(400px + var(--spacing-xl));
  top: 50%;
  transform: translateY(-50%);
}

@media (max-width: 900px) {
  .article-progress {
    left: auto;
    margin-left: 0;
    right: var(--spacing-md);
    top: calc(var(--header-height) + var(--spacing-md));
    transform: none;
  }
}

.article-header {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.article-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.5rem;
  }
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.views {
  color: var(--accent-color);
}

.tags {
  display: flex;
  gap: var(--spacing-xs);
}

.tag {
  padding: 2px 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
}

.article-description {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.article-content {
  line-height: 1.8;
}

.article-footer {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.back-link {
  color: var(--accent-color);
  font-weight: 500;
}

.not-found,
.loading {
  text-align: center;
  padding: var(--spacing-2xl);
}

.not-found h2 {
  margin-bottom: var(--spacing-md);
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}
</style>
