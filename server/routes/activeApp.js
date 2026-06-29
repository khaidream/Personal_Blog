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
// 进程名缓存：exePath -> name
const nameCache = new Map()

const SCRIPT_PATH = path.join(__dirname, '..', 'scripts', 'active-app.ps1')

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

router.get('/', async (req, res) => {
  try {
    const output = await runPowerShell()

    if (!output || output === 'null') {
      return res.json({ name: null, icon: null })
    }

    const data = JSON.parse(output)
    const { name, icon, exePath } = data

    // 使用缓存：如果已有该 exePath 的图标，直接返回缓存
    if (exePath && iconCache.has(exePath)) {
      return res.json({
        name: nameCache.get(exePath) || name,
        icon: iconCache.get(exePath)
      })
    }

    // 新应用：缓存图标和名称
    if (exePath && icon) {
      iconCache.set(exePath, icon)
      nameCache.set(exePath, name)
    }

    // 控制缓存大小，最多 100 个应用
    if (iconCache.size > 100) {
      const firstKey = iconCache.keys().next().value
      iconCache.delete(firstKey)
      nameCache.delete(firstKey)
    }

    res.json({ name, icon: icon || null })
  } catch (error) {
    console.error('Active app error:', error)
    res.json({ name: null, icon: null })
  }
})

export default router
