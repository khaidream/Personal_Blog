<template>
  <div class="note-editor page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">{{ isEdit ? '编辑手记' : '新建手记' }}</h1>
        <router-link to="/admin/notes" class="btn btn-ghost">← 返回</router-link>
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <form v-else class="editor-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">标题 *</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="输入手记标题"
            required
          />
        </div>

        <div class="form-group">
          <label for="content">内容 (Markdown)</label>
          <textarea
            id="content"
            v-model="form.content"
            placeholder="输入手记内容，支持 Markdown 格式"
            rows="15"
            class="content-textarea"
          ></textarea>
        </div>

        <div class="form-group">
          <label>标签</label>
          <div class="tags-input">
            <span v-for="(tag, index) in form.tags" :key="index" class="tag">
              {{ tag }}
              <button type="button" class="tag-remove" @click="removeTag(index)">×</button>
            </span>
            <input
              v-model="newTag"
              type="text"
              placeholder="输入标签后按回车添加"
              @keydown.enter.prevent="addTag"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="author">作者</label>
          <input
            id="author"
            v-model="form.author"
            type="text"
            placeholder="作者名称"
          />
        </div>

        <div class="form-group">
          <label for="cover_image">封面图片 URL</label>
          <input
            id="cover_image"
            v-model="form.cover_image"
            type="url"
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-ghost" @click="$router.push('/admin/notes')">取消</button>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? '保存中...' : '保存' }}
          </button>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminNotes } from '@/composables/useAdminNotes'

const props = defineProps({
  id: String
})

const route = useRoute()
const router = useRouter()
const { fetchNote, createNote, updateNote } = useAdminNotes()

const isEdit = computed(() => !!props.id)
const loading = ref(false)
const submitting = ref(false)
const error = ref(null)
const newTag = ref('')

const form = reactive({
  title: '',
  content: '',
  tags: [],
  author: 'Khai',
  cover_image: ''
})

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
  }
  newTag.value = ''
}

const removeTag = (index) => {
  form.tags.splice(index, 1)
}

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '')
}

const loadNote = async () => {
  if (!props.id) return
  loading.value = true
  try {
    const note = await fetchNote(props.id)
    form.title = note.title || ''
    form.content = note.content || ''
    form.tags = note.tags || []
    form.author = note.author || 'Khai'
    form.cover_image = note.cover_image || ''
  } catch (e) {
    error.value = '加载手记失败: ' + e.message
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  error.value = null
  submitting.value = true

  const slug = generateSlug(form.title)

  try {
    if (isEdit.value) {
      await updateNote(props.id, { ...form, slug })
    } else {
      await createNote({ ...form, slug })
    }
    router.push('/admin/notes')
  } catch (e) {
    error.value = e.message
  } finally {
    submitting.value = false
  }
}

// 自动生成 slug
const updateSlug = () => {
  if (!isEdit.value && form.title && !form.slug) {
    form.slug = generateSlug(form.title)
  }
}

onMounted(() => {
  loadNote()
})
</script>

<style scoped>
.note-editor {
  padding: var(--spacing-lg) 0;
  max-width: 800px;
  margin: 0 auto;
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

.loading {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
}

.editor-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-group label {
  font-weight: 500;
  font-size: 14px;
  color: var(--text-secondary);
}

.form-group input,
.form-group textarea {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
}

.content-textarea {
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
}

.hint {
  font-size: 12px;
  color: var(--text-muted);
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
}

.tags-input input {
  flex: 1;
  min-width: 120px;
  border: none;
  background: transparent;
  padding: var(--spacing-xs);
}

.tags-input input:focus {
  outline: none;
}

.tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--accent-color);
  color: white;
  border-radius: 4px;
  font-size: 12px;
}

.tag-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.error-message {
  color: #e53e3e;
  font-size: 14px;
  padding: var(--spacing-sm);
  background: #fef2f2;
  border-radius: 4px;
}
</style>
