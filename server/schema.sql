-- 创建数据库
CREATE DATABASE IF NOT EXISTS blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE blog;

-- 创建文章表
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content LONGTEXT,
  tags JSON,
  author VARCHAR(100) DEFAULT 'Khai',
  cover_image VARCHAR(500),
  view_count INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入示例文章
INSERT INTO articles (title, slug, description, content, tags) VALUES
('Vue 3 入门完全指南', 'getting-started-with-vue3', '深入理解 Vue 3 的核心概念，从组合式 API 到响应式系统，帮助你快速上手 Vue 3 开发。', '# Vue 3 入门完全指南\n\nVue 3 是 Vue.js 的最新主要版本，带来了许多新特性和性能改进。\n\n## 组合式 API\n\nVue 3 引入了组合式 API...', '["Vue", "JavaScript"]'),
('CSS Grid 布局实战技巧', 'css-grid-layout', '掌握 CSS Grid 布局的核心概念，通过实际案例帮助你构建复杂的页面布局。', '# CSS Grid 布局实战技巧\n\nCSS Grid 是现代 CSS 布局的重要组成部分。\n\n## 基础概念\n\nGrid 布局由两个核心概念组成：**网格容器**和**网格项**...', '["CSS", "前端"]'),
('深色模式设计与实现', 'dark-mode-implementation', '深入探讨深色模式的设计原则，以及如何使用 CSS 变量和 JavaScript 实现优雅的深色模式切换。', '# 深色模式设计与实现\n\n深色模式已成为现代应用的标准功能。\n\n## 为什么需要深色模式\n\n- 减少眼睛疲劳\n- 节省电量\n- 满足用户偏好...', '["CSS", "JavaScript"]');

-- 创建手记表
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT,
  tags JSON,
  author VARCHAR(100) DEFAULT 'Khai',
  cover_image VARCHAR(500),
  view_count INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
