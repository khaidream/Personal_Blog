import { ref } from 'vue'

const API_BASE = 'http://localhost:3001/api'

const articles = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchArticles() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`${API_BASE}/articles`)
    if (!res.ok) throw new Error('获取文章列表失败')
    articles.value = await res.json()
  } catch (e) {
    error.value = e.message
    console.error('Failed to fetch articles:', e)
  } finally {
    loading.value = false
  }
}

async function fetchArticle(slug) {
  try {
    const res = await fetch(`${API_BASE}/articles/${slug}`)
    if (!res.ok) throw new Error('获取文章失败')
    return await res.json()
  } catch (e) {
    console.error('Failed to fetch article:', e)
    return null
  }
}

async function incrementViewCount(slug) {
  try {
    await fetch(`${API_BASE}/articles/${slug}/view`, { method: 'POST' })
  } catch (e) {
    console.error('Failed to increment view count:', e)
  }
}

async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`)
    if (!res.ok) throw new Error('获取统计信息失败')
    return await res.json()
  } catch (e) {
    console.error('Failed to fetch stats:', e)
    return { articleCount: 0, totalViews: 0 }
  }
}

export function useArticles() {
  const getArticleBySlug = async (slug) => {
    return await fetchArticle(slug)
  }

  const getArticlesByTag = (tag) => {
    return articles.value.filter(article =>
      article.tags && article.tags.includes(tag)
    )
  }

  const getAllTags = () => {
    const tags = new Set()
    articles.value.forEach(article => {
      if (article.tags) {
        article.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }

  const getLatestArticles = (count = 6) => {
    return articles.value.slice(0, count)
  }

  return {
    articles,
    loading,
    error,
    fetchArticles,
    getArticleBySlug,
    getArticlesByTag,
    getAllTags,
    getLatestArticles,
    incrementViewCount,
    fetchStats
  }
}
