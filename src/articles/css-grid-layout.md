---
title: CSS Grid 布局实战技巧
date: 2024-03-10
slug: css-grid-layout
tags: [CSS, 前端]
description: 掌握 CSS Grid 布局的核心概念，通过实际案例帮助你构建复杂的页面布局。
---

# CSS Grid 布局实战技巧

CSS Grid 是现代 CSS 布局的重要组成部分，它能够轻松实现复杂的二维布局。

## 基础概念

Grid 布局由两个核心概念组成：**网格容器**和**网格项**。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## 响应式布局

使用 Grid 可以轻松实现响应式布局：

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 网格区域

使用 `grid-template-areas` 可以用语义化的方式定义布局：

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## 自动对齐

Grid 提供了强大的自动对齐能力：

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

这种技术叫做 **自动填充网格**，可以自动调整列数来适应容器宽度。

## 总结

CSS Grid 是构建现代响应式布局的利器，配合 Flexbox 使用可以实现任何复杂的布局需求。
