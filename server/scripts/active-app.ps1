# 获取当前前台窗口的应用名称和图标
# 输出 JSON: {"name":"进程名","icon":"base64或空字符串","exePath":"exe路径"}
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

# 获取前台窗口句柄
$hwnd = [WinAPI]::GetForegroundWindow()
if ($hwnd -eq [IntPtr]::Zero) {
    Write-Output "null"
    exit
}

# 获取进程 ID
$procId = 0
[WinAPI]::GetWindowThreadProcessId($hwnd, [ref]$procId) | Out-Null
if ($procId -eq 0) {
    Write-Output "null"
    exit
}

# 获取进程信息
try {
    $proc = Get-Process -Id $procId -ErrorAction Stop
} catch {
    Write-Output "null"
    exit
}

$name = $proc.ProcessName
$exePath = ""
try { $exePath = $proc.MainModule.FileName } catch {}

# 提取图标
$iconBase64 = ""
if ($exePath -and (Test-Path $exePath)) {
    try {
        $icon = [System.Drawing.Icon]::ExtractAssociatedIcon($exePath)
        if ($icon) {
            $bmp = $icon.ToBitmap()
            $ms = New-Object System.IO.MemoryStream
            $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
            $iconBase64 = [Convert]::ToBase64String($ms.ToArray())
            $icon.Dispose()
            $bmp.Dispose()
            $ms.Dispose()
        }
    } catch {}
}

# 输出 JSON
$result = @{ name = $name; icon = $iconBase64; exePath = $exePath }
$result | ConvertTo-Json -Compress
