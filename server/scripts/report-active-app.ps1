# 本地上报脚本：采集当前活跃应用并 POST 到云服务器
# 用法：powershell -ExecutionPolicy Bypass -File report-active-app.ps1 -ServerUrl "http://8.134.49.199"
param(
  [string]$ServerUrl = "http://8.134.49.199",
  [int]$Interval = 2
)

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
  [DllImport("user32.dll")]
  public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")]
  public static extern int GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
}
"@
Add-Type -AssemblyName System.Drawing

# 图标缓存：exePath -> base64，避免重复提取
$script:iconCache = @{}

function Get-ActiveApp {
  $hwnd = [WinAPI]::GetForegroundWindow()
  if ($hwnd -eq [IntPtr]::Zero) { return $null }

  $procId = 0
  [WinAPI]::GetWindowThreadProcessId($hwnd, [ref]$procId) | Out-Null
  if ($procId -eq 0) { return $null }

  try { $proc = Get-Process -Id $procId -ErrorAction Stop } catch { return $null }

  $name = $proc.ProcessName
  $exePath = ""
  try { $exePath = $proc.MainModule.FileName } catch {}

  $iconBase64 = ""
  if ($exePath -and $script:iconCache.ContainsKey($exePath)) {
    $iconBase64 = $script:iconCache[$exePath]
  } elseif ($exePath -and (Test-Path $exePath)) {
    try {
      $icon = [System.Drawing.Icon]::ExtractAssociatedIcon($exePath)
      if ($icon) {
        $bmp = $icon.ToBitmap()
        $ms = New-Object System.IO.MemoryStream
        $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
        $iconBase64 = [Convert]::ToBase64String($ms.ToArray())
        $script:iconCache[$exePath] = $iconBase64
        $icon.Dispose()
        $bmp.Dispose()
        $ms.Dispose()
      }
    } catch {}
  }

  return @{ name = $name; icon = $iconBase64; exePath = $exePath }
}

Write-Host "开始上报活跃应用到 $ServerUrl ，每 ${Interval}s 一次。按 Ctrl+C 停止。"

while ($true) {
  try {
    $app = Get-ActiveApp
    if ($app) {
      $body = $app | ConvertTo-Json -Compress
      Invoke-RestMethod -Uri "$ServerUrl/api/active-app/report" -Method POST -Body $body -ContentType "application/json" | Out-Null
    }
  } catch {
    # 静默失败，继续下一轮
  }
  Start-Sleep -Seconds $Interval
}
