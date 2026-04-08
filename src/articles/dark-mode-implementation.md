---
title: 深色模式设计与实现
date: 2024-03-05
slug: dark-mode-implementation
tags: [CSS, JavaScript]
description: 深入探讨深色模式的设计原则，以及如何使用 CSS 变量和 JavaScript 实现优雅的深色模式切换。
---

# 深色模式设计与实现

深色模式已成为现代应用的标准功能，本文将详细介绍如何实现一个完善的深色模式方案。

## 为什么需要深色模式

- **减少眼睛疲劳**：在低光环境下更易阅读
- **节省电量**：OLED 屏幕上黑色像素不耗电
- **满足用户偏好**：很多用户习惯夜间使用深色界面

## 使用 CSS 变量

CSS 变量是实现主题切换的最佳方式：

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent-color: #3b82f6;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  --accent-color: #60a5fa;
}
```

## JavaScript 状态管理

```javascript
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light'
    this.init()
  }

  init() {
    this.applyTheme()
    this.listenSystemPreference()
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', this.theme)
    this.applyTheme()
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme)
  }

  listenSystemPreference() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.theme = e.matches ? 'dark' : 'light'
        this.applyTheme()
      }
    })
  }
}
```

## 设计注意事项

1. **不要只是反色**：深色模式需要专门设计颜色
2. **保持对比度**：确保文字与背景有足够的对比度
3. **减少饱和度**：深色背景下颜色应该更低饱和度
4. **考虑阴影**：在深色模式下，阴影应该更微妙

## 总结

一个好的深色模式实现需要在设计和技术层面都下功夫，才能给用户带来最佳体验。
