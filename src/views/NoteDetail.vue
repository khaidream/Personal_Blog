<template>
  <div class="note-detail page">
    <div class="container">
      <article v-if="note" class="note">
        <header class="note-header">
          <h1 class="note-title">{{ note.title }}</h1>
          <div class="note-meta">
            <span class="date">{{ formatDate(note.created_at) }}</span>
            <span class="views">👁️ {{ note.view_count }}</span>
            <span v-if="note.tags" class="tags">
              <span v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</span>
            </span>
          </div>
        </header>
        <div class="note-content">
          <MarkdownRender :content="note.content" />
        </div>
        <footer class="note-footer">
          <router-link to="/notes" class="back-link">← 返回手记列表</router-link>
        </footer>
      </article>

      <div v-else-if="loading" class="loading">
        <p>加载中...</p>
      </div>

      <div v-else class="not-found">
        <h2>手记不存在</h2>
        <p>抱歉，您访问的手记不存在或已被删除。</p>
        <router-link to="/notes" class="btn btn-primary">返回手记列表</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNotes } from '@/composables/useNotes'
import MarkdownRender from '@/components/MarkdownRender.vue'

const route = useRoute()
const { getNoteBySlug, incrementViewCount } = useNotes()

const note = ref(null)
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
  note.value = await getNoteBySlug(slug)
  if (note.value) {
    await incrementViewCount(slug)
    note.value.view_count = (note.value.view_count || 0) + 1
  }
  loading.value = false
})
</script>

<style scoped>
.note {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg) 0;
}

.note-header {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.note-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

@media (max-width: 768px) {
  .note-title {
    font-size: 1.5rem;
  }
}

.note-meta {
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

.note-content {
  line-height: 1.8;
}

.note-footer {
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
