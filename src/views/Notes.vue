<template>
  <div class="notes page">
    <div class="container">
      <h1 class="page-title">手记</h1>

      <div class="notes-container">
        <SearchFilter
          v-model="searchQuery"
          v-model:selectedTag="selectedTag"
          :tags="allTags"
          placeholder="搜索手记..."
          class="notes-search"
        />

        <div class="notes-grid" v-if="filteredNotes.length > 0">
          <div
            v-for="note in filteredNotes"
            :key="note.slug"
            class="note-card"
            @click="goToNote(note.slug)"
          >
            <div class="date-badge">
              <span class="date-day">{{ getDateInfo(note.created_at).day }}</span>
              <span class="date-month">{{ getDateInfo(note.created_at).month }}</span>
              <span class="date-week">{{ getDateInfo(note.created_at).week }}</span>
            </div>
            <h2 class="note-title">{{ note.title }}</h2>
            <p class="note-excerpt">{{ getExcerpt(note.content) }}</p>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>暂无手记</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotes } from '@/composables/useNotes'
import SearchFilter from '@/components/SearchFilter.vue'

const router = useRouter()
const { notes, fetchNotes, getAllTags, getNotesByTag } = useNotes()
const selectedTag = ref('')
const searchQuery = ref('')

onMounted(() => {
  fetchNotes()
})

const allTags = computed(() => getAllTags())

const filteredNotes = computed(() => {
  let result = notes.value

  if (selectedTag.value) {
    result = getNotesByTag(selectedTag.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(note =>
      note.title.toLowerCase().includes(query) ||
      (note.content && note.content.toLowerCase().includes(query))
    )
  }

  return result
})

const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const WEEKS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const getDateInfo = (dateStr) => {
  if (!dateStr) return { day: '', month: '', week: '' }
  const date = new Date(dateStr)
  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: MONTHS[date.getMonth()],
    week: WEEKS[date.getDay()]
  }
}

const getExcerpt = (content) => {
  if (!content) return ''
  const text = content.replace(/[#*`\[\]]/g, '').replace(/\n/g, ' ')
  return text.length > 100 ? text.slice(0, 100) + '...' : text
}

const goToNote = (slug) => {
  router.push(`/note/${slug}`)
}
</script>

<style scoped>
.page-title {
  padding-top: var(--header-height);
  font-size: 2rem;
  margin-bottom: var(--spacing-lg);
}

.notes-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 765px;
  margin: 0 auto;
}

.notes-search {
  margin-bottom: var(--spacing-lg);
  align-self: flex-end;
}

.notes-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-self: stretch;
  padding-left: 70px;
}

.note-card {
  position: relative;
  width: 100%;
  height: 96px;
  padding: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.note-card:hover {
  box-shadow: var(--shadow-hover);
  border-color: var(--accent-color);
}

.date-badge {
  position: absolute;
  left: -60px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
}

.date-day {
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 26.25px;
  font-weight: bold;
  color: var(--text-primary);
  line-height: 1;
}

.date-month,
.date-week {
  font-family: 'Instrument Sans', sans-serif;
  color: var(--text-secondary);
  line-height: 1.4;
}

.date-month {
  font-size: 12.25px;
}

.date-week {
  font-size: 10.5px;
}

@media (max-width: 768px) {
  .notes-container {
    width: 100%;
  }

  .notes-grid {
    padding-left: 0;
  }

  .note-card {
    width: 100%;
    height: auto;
  }

  .date-badge {
    display: none;
  }
}

.note-title {
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-card:hover .note-title {
  color: var(--accent-color);
}

.note-excerpt {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 12.25px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
}
</style>
