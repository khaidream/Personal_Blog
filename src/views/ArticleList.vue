<template>
  <div class="article-list page">
    <div class="container">
      <h1 class="page-title">文章列表</h1>

      <SearchFilter
        v-model="searchQuery"
        v-model:selectedTag="selectedTag"
        :tags="allTags"
        placeholder="搜索文章..."
        @search="handleSearch"
      />

      <div class="grid" v-if="filteredArticles.length > 0">
        <ArticleCard v-for="article in filteredArticles" :key="article.slug" :article="article" />
      </div>

      <div v-else class="empty-state">
        <p>暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useArticles } from '@/composables/useArticles'
import ArticleCard from '@/components/ArticleCard.vue'
import SearchFilter from '@/components/SearchFilter.vue'

const { articles, fetchArticles, getAllTags, getArticlesByTag } = useArticles()
const selectedTag = ref('')
const searchQuery = ref('')

onMounted(() => {
  fetchArticles()
})

const allTags = computed(() => getAllTags())

const filteredArticles = computed(() => {
  let result = articles.value

  if (selectedTag.value) {
    result = getArticlesByTag(selectedTag.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(article =>
      article.title.toLowerCase().includes(query) ||
      (article.description && article.description.toLowerCase().includes(query))
    )
  }

  return result
})

const handleSearch = () => {
  // 搜索逻辑已在 computed 中处理
}
</script>

<style scoped>
.page-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-lg);
}

.grid {
  margin-top: var(--spacing-lg);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
}
</style>
