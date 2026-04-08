const API_BASE = 'http://localhost:3001/api/admin'

export function useAdminNotes() {
  async function fetchNotes() {
    const res = await fetch(`${API_BASE}/notes`, {
      credentials: 'include'
    })
    if (!res.ok) throw new Error('获取手记列表失败')
    return await res.json()
  }

  async function fetchNote(id) {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      credentials: 'include'
    })
    if (!res.ok) throw new Error('获取手记失败')
    return await res.json()
  }

  async function createNote(note) {
    const res = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(note)
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || '创建失败')
    }
    return await res.json()
  }

  async function updateNote(id, note) {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(note)
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || '更新失败')
    }
    return await res.json()
  }

  async function deleteNote(id) {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (!res.ok) throw new Error('删除失败')
    return await res.json()
  }

  return {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
  }
}
