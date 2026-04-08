<template>
  <div class="article-manage page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">文章管理</h1>
        <router-link to="/admin/articles/create" class="btn btn-primary">➕ 新建文章</router-link>
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="article-table-wrapper">
        <table class="article-table">
          <thead>
            <tr>
              <th>标题</th>
              <th>Slug</th>
              <th>标签</th>
              <th>阅读量</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td class="title-cell">{{ article.title }}</td>
              <td class="slug-cell">{{ article.slug }}</td>
              <td class="tags-cell">
                <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
              </td>
              <td>{{ article.view_count }}</td>
              <td>{{ formatDate(article.created_at) }}</td>
              <td class="actions-cell">
                <router-link :to="`/article/${article.slug}`" class="btn btn-ghost">查看</router-link>
                <router-link :to="`/admin/articles/edit/${article.id}`" class="btn btn-ghost">编辑</router-link>
                <button class="btn btn-ghost delete-btn" @click="confirmDelete(article)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 删除确认弹窗 -->
      <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
        <div class="modal">
          <h3>确认删除</h3>
          <p>确定要删除文章「{{ articleToDelete?.title }}」吗？此操作不可恢复。</p>
          <div class="modal-actions">
            <button class="btn btn-ghost" @click="showDeleteModal = false">取消</button>
            <button class="btn btn-primary delete-confirm-btn" @click="handleDelete">确认删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminArticles } from '@/composables/useAdminArticles'
import { useArticles } from '@/composables/useArticles'

const { fetchArticles, deleteArticle } = useAdminArticles()
const { fetchArticles: fetchPublicArticles } = useArticles()

const articles = ref([])
const loading = ref(true)
const error = ref(null)
const showDeleteModal = ref(false)
const articleToDelete = ref(null)

const loadArticles = async () => {
  loading.value = true
  error.value = null
  try {
    articles.value = await fetchArticles()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const confirmDelete = (article) => {
  articleToDelete.value = article
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!articleToDelete.value) return
  try {
    await deleteArticle(articleToDelete.value.id)
    showDeleteModal.value = false
    articleToDelete.value = null
    await loadArticles()
    await fetchPublicArticles()
  } catch (e) {
    alert('删除失败: ' + e.message)
  }
}

onMounted(loadArticles)
</script>

<style scoped>
.article-manage {
  padding: var(--spacing-lg) 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: 2rem;
}

.loading,
.error {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
}

.error {
  color: #e53e3e;
}

.article-table-wrapper {
  overflow-x: auto;
}

.article-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-card);
  border-radius: 8px;
  overflow: hidden;
}

.article-table th,
.article-table td {
  padding: var(--spacing-md) var(--spacing-md);
  text-align: left;
  vertical-align: middle;
  line-height: 1.5;
}

.article-table th {
  background: var(--bg-secondary);
  font-weight: 600;
  font-size: 14px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.article-table td {
  border-bottom: 1px solid var(--border-color);
}

.article-table tr:last-child td {
  border-bottom: none;
}

.article-table tbody tr:hover {
  background: var(--bg-secondary);
}

.title-cell {
  font-weight: 500;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.slug-cell {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-muted);
  white-space: nowrap;
}

.tags-cell {
  overflow: visible;
}

.tag {
  display: inline;
  padding: 2px 6px;
  background: var(--bg-secondary);
  border-radius: 4px;
  font-size: 12px;
  margin-right: 4px;
  margin-bottom: 2px;
}

.actions-cell {
  white-space: nowrap;
  text-align: center;
}

.actions-cell .btn {
  margin: 0 2px;
}

.delete-btn {
  color: #e53e3e;
}

.delete-btn:hover {
  background: #fef2f2;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
}

.modal h3 {
  margin-bottom: var(--spacing-md);
}

.modal p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}

.delete-confirm-btn {
  background: #e53e3e;
}

.delete-confirm-btn:hover {
  background: #c53030;
}

@media (max-width: 768px) {
  .article-table th:nth-child(3),
  .article-table td:nth-child(3),
  .article-table th:nth-child(4),
  .article-table td:nth-child(4) {
    display: none;
  }
}
</style>
