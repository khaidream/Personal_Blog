import express from 'express'
import { execFile } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const execFileAsync = promisify(execFile)
const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 图标缓存：exePath -> base64
const iconCache = new Map()
const nameCache = new Map()

// 上报缓存：本地电脑上报的活跃应用状态
let reportedApp = { name: null, icon: null, exePath: '', timestamp: 0 }
const REPORT_TTL = 30000 // 30秒无上报则过期

const SCRIPT_PATH = path.join(__dirname, '..', 'scripts', 'active-app.ps1')

// 判断是否 Windows 环境
const isWindows = process.platform === 'win32'

// 带5秒超时的 PowerShell 执行
async function runPowerShell() {
  return new Promise((resolve) => {
    execFile(
      'powershell.exe',
      ['-ExecutionPolicy', 'Bypass', '-NoProfile', '-File', SCRIPT_PATH],
      {
        timeout: 5000,
        maxBuffer: 10 * 1024 * 1024,
        encoding: 'utf8'
      },
      (error, stdout) => {
        if (error) {
          resolve(null)
          return
        }
        resolve(stdout.trim())
      }
    )
  })
}

// 本地上报接口
router.post('/report', (req, res) => {
  const { name, icon, exePath } = req.body || {}
  if (!name) {
    return res.status(400).json({ error: '缺少 name 字段' })
  }
  reportedApp = { name, icon: icon || '', exePath: exePath || '', timestamp: Date.now() }
  res.json({ ok: true })
})

router.get('/', async (req, res) => {
  try {
    // Windows 本地开发：直接调用 PowerShell
    if (isWindows) {
      const output = await runPowerShell()
      if (!output || output === 'null') {
        return res.json({ name: null, icon: null })
      }
      const data = JSON.parse(output)
      const { name, icon, exePath } = data
      if (exePath && iconCache.has(exePath)) {
        return res.json({
          name: nameCache.get(exePath) || name,
          icon: iconCache.get(exePath)
        })
      }
      if (exePath && icon) {
        iconCache.set(exePath, icon)
        nameCache.set(exePath, name)
      }
      if (iconCache.size > 100) {
        const firstKey = iconCache.keys().next().value
        iconCache.delete(firstKey)
        nameCache.delete(firstKey)
      }
      return res.json({ name, icon: icon || null })
    }

    // 云端 Linux：返回本地上报的缓存数据
    const now = Date.now()
    if (reportedApp.name && (now - reportedApp.timestamp) < REPORT_TTL) {
      return res.json({ name: reportedApp.name, icon: reportedApp.icon || null })
    }

    res.json({ name: null, icon: null })
  } catch (error) {
    console.error('Active app error:', error)
    res.json({ name: null, icon: null })
  }
})

export default router
