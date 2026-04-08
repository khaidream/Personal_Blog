const API_BASE = 'http://localhost:3001/api/admin'

export function useAdminArticles() {
  async function fetchArticles() {
    const res = await fetch(`${API_BASE}/articles`, {
      credentials: 'include'
    })
    if (!res.ok) throw new Error('获取文章列表失败')
    return await res.json()
  }

  async function fetchArticle(id) {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      credentials: 'include'
    })
    if (!res.ok) throw new Error('获取文章失败')
    return await res.json()
  }

  async function createArticle(article) {
    const res = await fetch(`${API_BASE}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(article)
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || '创建失败')
    }
    return await res.json()
  }

  async function updateArticle(id, article) {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(article)
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || '更新失败')
    }
    return await res.json()
  }

  async function deleteArticle(id) {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (!res.ok) throw new Error('删除失败')
    return await res.json()
  }

  return {
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    deleteArticle
  }
}
