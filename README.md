# khai's Blog

一个简洁优雅的个人博客，采用 Vue 3 + Express 构建，支持明亮/深色主题切换。

## 功能特点

- 📝 **文章系统** - 撰写、编辑、展示 Markdown 文章，支持代码高亮
- 📔 **手记系统** - 轻量级短内容记录，带日历视图
- 🖼️ **相册** - 图片展示，相册管理
- 🌤️ **天气小组件** - 实时天气信息
- ⏰ **时钟小组件** - 优雅的时钟显示
- 📊 **阅读进度条** - 文章页圆形进度指示器
- 🛠️ **管理后台** - 文章、手记、相册的后台管理
- 🎨 **主题切换** - 明亮/深色模式一键切换

## 技术栈

### 前端
- Vue 3 (Composition API)
- Vue Router
- Pinia (状态管理)
- Vite (构建工具)
- Markdown-it (Markdown 渲染)
- Highlight.js (代码高亮)
- SCSS (样式)

### 后端
- Express.js
- MySQL (数据库)
- Express Session (会话管理)
- Bcryptjs (密码加密)

## 项目结构

```
Personal_Blog/
├── public/                 # 静态资源
│   └── assets/image/       # 图片资源
├── server/                 # 后端服务
│   ├── db.js              # 数据库连接
│   ├── index.js           # 服务器入口
│   └── schema.sql         # 数据库表结构
├── src/                   # 前端源码
│   ├── admin/            # 管理后台
│   │   ├── router/       # 路由配置
│   │   └── views/        # 管理页面组件
│   ├── assets/           # 样式资源
│   │   └── styles/       # 全局样式
│   ├── components/       # 公共组件
│   │   ├── ArticleCard.vue
│   │   ├── Clock.vue
│   │   ├── Header.vue
│   │   ├── ProfileCard.vue
│   │   ├── ReadingProgress.vue
│   │   ├── ThemeToggle.vue
│   │   └── Weather.vue
│   ├── composables/      # 组合式函数
│   ├── views/            # 页面组件
│   │   ├── Home.vue
│   │   ├── ArticleList.vue
│   │   ├── ArticleDetail.vue
│   │   ├── Notes.vue
│   │   ├── NoteDetail.vue
│   │   ├── Gallery.vue
│   │   ├── GoodBlogs.vue
│   │   └── Login.vue
│   ├── articles/         # Markdown 文章
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

## 快速开始

### 环境要求
- Node.js >= 16
- MySQL >= 5.7

### 1. 克隆项目
```bash
git clone https://github.com/khaidream/Personal_Blog.git
cd Personal_Blog
```

### 2. 安装依赖

前端依赖：
```bash
npm install
```

后端依赖：
```bash
cd server
npm install
```

### 3. 配置数据库

创建 MySQL 数据库：
```sql
CREATE DATABASE blog;
```

导入数据表结构：
```bash
mysql -u root -p blog < server/schema.sql
```

修改 `server/db.js` 中的数据库配置：
```javascript
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'your_username',
  password: 'your_password',
  database: 'blog',
  // ...
})
```

### 4. 启动后端服务
```bash
cd server
npm run dev
```

### 5. 启动前端开发服务器
```bash
npm run dev
```

访问 http://localhost:5173

### 6. 构建生产版本
```bash
npm run build
```

## 管理后台

访问 `/admin` 进入管理后台（需登录）

默认管理员账号：`admin` / `password`

## 许可证

MIT License
