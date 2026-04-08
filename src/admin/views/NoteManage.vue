<template>
  <div class="note-manage page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">手记管理</h1>
        <router-link to="/admin/notes/create" class="btn btn-primary">➕ 新建手记</router-link>
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="note-table-wrapper">
        <table class="note-table">
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
            <tr v-for="note in notes" :key="note.id">
              <td class="title-cell">{{ note.title }}</td>
              <td class="slug-cell">{{ note.slug }}</td>
              <td class="tags-cell">
                <span v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</span>
              </td>
              <td>{{ note.view_count }}</td>
              <td>{{ formatDate(note.created_at) }}</td>
              <td class="actions-cell">
                <router-link :to="`/note/${note.slug}`" class="btn btn-ghost">查看</router-link>
                <router-link :to="`/admin/notes/edit/${note.id}`" class="btn btn-ghost">编辑</router-link>
                <button class="btn btn-ghost delete-btn" @click="confirmDelete(note)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 删除确认弹窗 -->
      <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
        <div class="modal">
          <h3>确认删除</h3>
          <p>确定要删除手记「{{ noteToDelete?.title }}」吗？此操作不可恢复。</p>
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
import { useAdminNotes } from '@/composables/useAdminNotes'
import { useNotes } from '@/composables/useNotes'

const { fetchNotes, deleteNote } = useAdminNotes()
const { fetchNotes: fetchPublicNotes } = useNotes()

const notes = ref([])
const loading = ref(true)
const error = ref(null)
const showDeleteModal = ref(false)
const noteToDelete = ref(null)

const loadNotes = async () => {
  loading.value = true
  error.value = null
  try {
    notes.value = await fetchNotes()
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

const confirmDelete = (note) => {
  noteToDelete.value = note
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!noteToDelete.value) return
  try {
    await deleteNote(noteToDelete.value.id)
    showDeleteModal.value = false
    noteToDelete.value = null
    await loadNotes()
    await fetchPublicNotes()
  } catch (e) {
    alert('删除失败: ' + e.message)
  }
}

onMounted(loadNotes)
</script>

<style scoped>
.note-manage {
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

.note-table-wrapper {
  overflow-x: auto;
}

.note-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-card);
  border-radius: 8px;
  overflow: hidden;
}

.note-table th,
.note-table td {
  padding: var(--spacing-md) var(--spacing-md);
  text-align: left;
  vertical-align: middle;
  line-height: 1.5;
}

.note-table th {
  background: var(--bg-secondary);
  font-weight: 600;
  font-size: 14px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.note-table td {
  border-bottom: 1px solid var(--border-color);
}

.note-table tr:last-child td {
  border-bottom: none;
}

.note-table tbody tr:hover {
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
  .note-table th:nth-child(3),
  .note-table td:nth-child(3),
  .note-table th:nth-child(4),
  .note-table td:nth-child(4) {
    display: none;
  }
}
</style>
