import { ref } from 'vue'

const API_BASE = 'http://localhost:3001/api'

const notes = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchNotes() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`${API_BASE}/notes`)
    if (!res.ok) throw new Error('获取手记列表失败')
    notes.value = await res.json()
  } catch (e) {
    error.value = e.message
    console.error('Failed to fetch notes:', e)
  } finally {
    loading.value = false
  }
}

async function fetchNote(slug) {
  try {
    const res = await fetch(`${API_BASE}/notes/${slug}`)
    if (!res.ok) throw new Error('获取手记失败')
    return await res.json()
  } catch (e) {
    console.error('Failed to fetch note:', e)
    return null
  }
}

async function incrementViewCount(slug) {
  try {
    await fetch(`${API_BASE}/notes/${slug}/view`, { method: 'POST' })
  } catch (e) {
    console.error('Failed to increment view count:', e)
  }
}

export function useNotes() {
  const getNoteBySlug = async (slug) => {
    return await fetchNote(slug)
  }

  const getNotesByTag = (tag) => {
    return notes.value.filter(note =>
      note.tags && note.tags.includes(tag)
    )
  }

  const getAllTags = () => {
    const tags = new Set()
    notes.value.forEach(note => {
      if (note.tags) {
        note.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }

  const getLatestNotes = (count = 6) => {
    return notes.value.slice(0, count)
  }

  return {
    notes,
    loading,
    error,
    fetchNotes,
    getNoteBySlug,
    getNotesByTag,
    getAllTags,
    getLatestNotes,
    incrementViewCount
  }
}
