import express from 'express'
import cors from 'cors'
import session from 'express-session'
import bcrypt from 'bcryptjs'
import pool from './db.js'

const app = express()
const PORT = 3001

app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json())
app.use(session({
  secret: 'blog-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    sameSite: 'lax'
  }
}))

// 认证中间件
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next()
  }
  res.status(401).json({ error: '请先登录' })
}

// ========== 公共 API ==========

// 获取所有文章
app.get('/api/articles', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, slug, description, tags, author, cover_image, view_count, created_at, updated_at FROM articles ORDER BY created_at DESC'
    )
    const articles = rows.map(row => ({
      ...row,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags
    }))
    res.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).json({ error: '获取文章列表失败' })
  }
})

// 获取单篇文章
app.get('/api/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const [rows] = await pool.query(
      'SELECT * FROM articles WHERE slug = ?',
      [slug]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: '文章不存在' })
    }
    const article = rows[0]
    article.tags = typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags
    res.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    res.status(500).json({ error: '获取文章失败' })
  }
})

// 增加阅读量
app.post('/api/articles/:slug/view', async (req, res) => {
  try {
    const { slug } = req.params
    const [result] = await pool.query(
      'UPDATE articles SET view_count = view_count + 1 WHERE slug = ?',
      [slug]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '文章不存在' })
    }
    res.json({ success: true })
  } catch (error) {
    console.error('Error updating view count:', error)
    res.status(500).json({ error: '更新阅读量失败' })
  }
})

// 获取统计信息
app.get('/api/stats', async (req, res) => {
  try {
    const [articleCount] = await pool.query('SELECT COUNT(*) as count FROM articles')
    const [totalViews] = await pool.query('SELECT SUM(view_count) as total FROM articles')
    res.json({
      articleCount: articleCount[0].count,
      totalViews: totalViews[0].total || 0
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({ error: '获取统计信息失败' })
  }
})

// ========== 手记 API ==========

// 获取所有手记
app.get('/api/notes', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, slug, content, tags, author, cover_image, view_count, created_at, updated_at FROM notes ORDER BY created_at DESC'
    )
    const notes = rows.map(row => ({
      ...row,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags
    }))
    res.json(notes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ error: '获取手记列表失败' })
  }
})

// 获取单篇手记
app.get('/api/notes/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const [rows] = await pool.query(
      'SELECT * FROM notes WHERE slug = ?',
      [slug]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: '手记不存在' })
    }
    const note = rows[0]
    note.tags = typeof note.tags === 'string' ? JSON.parse(note.tags) : note.tags
    res.json(note)
  } catch (error) {
    console.error('Error fetching note:', error)
    res.status(500).json({ error: '获取手记失败' })
  }
})

// 增加手记浏览量
app.post('/api/notes/:slug/view', async (req, res) => {
  try {
    const { slug } = req.params
    const [result] = await pool.query(
      'UPDATE notes SET view_count = view_count + 1 WHERE slug = ?',
      [slug]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '手记不存在' })
    }
    res.json({ success: true })
  } catch (error) {
    console.error('Error updating view count:', error)
    res.status(500).json({ error: '更新阅读量失败' })
  }
})

// ========== 认证 API ==========

// 登录
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码不能为空' })
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    if (rows.length === 0) {
      return res.status(401).json({ error: '用户名或密码错误' })
    }

    const user = rows[0]
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return res.status(401).json({ error: '用户名或密码错误' })
    }

    req.session.userId = user.id
    req.session.username = user.username

    res.json({
      id: user.id,
      username: user.username,
      message: '登录成功'
    })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: '登录失败' })
  }
})

// 登出
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: '登出失败' })
    }
    res.json({ message: '登出成功' })
  })
})

// 检查登录状态
app.get('/api/auth/status', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({
      isLoggedIn: true,
      username: req.session.username
    })
  } else {
    res.json({ isLoggedIn: false })
  }
})

// ========== 管理后台 API ==========

// 获取所有文章（管理后台用，包含完整内容）
app.get('/api/admin/articles', isAuthenticated, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, slug, description, tags, author, view_count, created_at, updated_at FROM articles ORDER BY created_at DESC'
    )
    const articles = rows.map(row => ({
      ...row,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags
    }))
    res.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).json({ error: '获取文章列表失败' })
  }
})

// 创建文章
app.post('/api/admin/articles', isAuthenticated, async (req, res) => {
  try {
    const { title, slug, description, content, tags, author, cover_image } = req.body

    if (!title || !slug) {
      return res.status(400).json({ error: '标题和 slug 不能为空' })
    }

    // 检查 slug 是否已存在
    const [existing] = await pool.query('SELECT id FROM articles WHERE slug = ?', [slug])
    if (existing.length > 0) {
      return res.status(400).json({ error: 'slug 已存在' })
    }

    const [result] = await pool.query(
      'INSERT INTO articles (title, slug, description, content, tags, author, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, slug, description || '', content || '', JSON.stringify(tags || []), author || 'Khai', cover_image || null]
    )

    res.status(201).json({ id: result.insertId, message: '文章创建成功' })
  } catch (error) {
    console.error('Error creating article:', error)
    res.status(500).json({ error: '创建文章失败' })
  }
})

// 更新文章
app.put('/api/admin/articles/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params
    const { title, slug, description, content, tags, author, cover_image } = req.body

    if (!title || !slug) {
      return res.status(400).json({ error: '标题和 slug 不能为空' })
    }

    // 检查 slug 是否被其他文章使用
    const [existing] = await pool.query('SELECT id FROM articles WHERE slug = ? AND id != ?', [slug, id])
    if (existing.length > 0) {
      return res.status(400).json({ error: 'slug 已被其他文章使用' })
    }

    await pool.query(
      'UPDATE articles SET title = ?, slug = ?, description = ?, content = ?, tags = ?, author = ?, cover_image = ? WHERE id = ?',
      [title, slug, description || '', content || '', JSON.stringify(tags || []), author || 'Khai', cover_image || null, id]
    )

    res.json({ message: '文章更新成功' })
  } catch (error) {
    console.error('Error updating article:', error)
    res.status(500).json({ error: '更新文章失败' })
  }
})

// 删除文章
app.delete('/api/admin/articles/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '文章不存在' })
    }

    res.json({ message: '文章删除成功' })
  } catch (error) {
    console.error('Error deleting article:', error)
    res.status(500).json({ error: '删除文章失败' })
  }
})

// 获取单篇文章（管理后台用）
app.get('/api/admin/articles/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [id])

    if (rows.length === 0) {
      return res.status(404).json({ error: '文章不存在' })
    }

    const article = rows[0]
    article.tags = typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags
    res.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    res.status(500).json({ error: '获取文章失败' })
  }
})

// ========== 手记管理 API ==========

// 获取所有手记（管理后台用）
app.get('/api/admin/notes', isAuthenticated, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, slug, tags, author, view_count, created_at, updated_at FROM notes ORDER BY created_at DESC'
    )
    const notes = rows.map(row => ({
      ...row,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags
    }))
    res.json(notes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ error: '获取手记列表失败' })
  }
})

// 创建手记
app.post('/api/admin/notes', isAuthenticated, async (req, res) => {
  try {
    const { title, slug, content, tags, author, cover_image } = req.body

    if (!title || !slug) {
      return res.status(400).json({ error: '标题和 slug 不能为空' })
    }

    // 检查 slug 是否已存在
    const [existing] = await pool.query('SELECT id FROM notes WHERE slug = ?', [slug])
    if (existing.length > 0) {
      return res.status(400).json({ error: 'slug 已存在' })
    }

    const [result] = await pool.query(
      'INSERT INTO notes (title, slug, content, tags, author, cover_image) VALUES (?, ?, ?, ?, ?, ?)',
      [title, slug, content || '', JSON.stringify(tags || []), author || 'Khai', cover_image || null]
    )
    res.status(201).json({ id: result.insertId, message: '手记创建成功' })
  } catch (error) {
    console.error('Error creating note:', error)
    res.status(500).json({ error: '创建手记失败' })
  }
})

// 更新手记
app.put('/api/admin/notes/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params
    const { title, slug, content, tags, author, cover_image } = req.body

    if (!title || !slug) {
      return res.status(400).json({ error: '标题和 slug 不能为空' })
    }

    // 检查手记是否存在
    const [existing] = await pool.query('SELECT id FROM notes WHERE id = ?', [id])
    if (existing.length === 0) {
      return res.status(404).json({ error: '手记不存在' })
    }

    // 检查 slug 是否被其他手记使用
    const [slugCheck] = await pool.query('SELECT id FROM notes WHERE slug = ? AND id != ?', [slug, id])
    if (slugCheck.length > 0) {
      return res.status(400).json({ error: 'slug 已被其他手记使用' })
    }

    await pool.query(
      'UPDATE notes SET title = ?, slug = ?, content = ?, tags = ?, author = ?, cover_image = ? WHERE id = ?',
      [title, slug, content || '', JSON.stringify(tags || []), author || 'Khai', cover_image || null, id]
    )
    res.json({ message: '手记更新成功' })
  } catch (error) {
    console.error('Error updating note:', error)
    res.status(500).json({ error: '更新手记失败' })
  }
})

// 删除手记
app.delete('/api/admin/notes/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM notes WHERE id = ?', [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '手记不存在' })
    }

    res.json({ message: '手记删除成功' })
  } catch (error) {
    console.error('Error deleting note:', error)
    res.status(500).json({ error: '删除手记失败' })
  }
})

// 获取单篇手记（管理后台用）
app.get('/api/admin/notes/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [id])

    if (rows.length === 0) {
      return res.status(404).json({ error: '手记不存在' })
    }

    const note = rows[0]
    note.tags = typeof note.tags === 'string' ? JSON.parse(note.tags) : note.tags
    res.json(note)
  } catch (error) {
    console.error('Error fetching note:', error)
    res.status(500).json({ error: '获取手记失败' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
