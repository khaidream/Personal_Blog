<template>
  <div class="good-blogs page">
    <div class="page-header">
      <h1 class="page-title">优秀博客</h1>
      <p class="page-desc">发现更多优质技术博客</p>
    </div>

    <div class="container">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索博客..."
          class="search-input"
        />
      </div>

      <div class="blogs-grid">
        <a
          v-for="blog in filteredBlogs"
          :key="blog.id"
          :href="blog.url"
          target="_blank"
          class="blog-card"
        >
          <img :src="blog.avatar" :alt="blog.name" class="blog-avatar" />
          <h3 class="blog-name">{{ blog.name }}</h3>
          <div class="blog-rating">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= blog.rating }">★</span>
          </div>
          <p class="blog-reason">{{ blog.reason }}</p>
        </a>
      </div>

      <div v-if="filteredBlogs.length === 0" class="empty-state">
        <p>没有找到匹配的博客</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const blogs = ref([
  {
    id: 1,
    name: '阮一峰的网络日志',
    url: 'https://www.ruanyifeng.com',
    avatar: 'https://www.yysuni.com/images/blogger/fe25259da8e3609b.png',
    rating: 5,
    reason: '经典必看，每周更新。无聊是看新闻、还是学习、还是拓展眼界，都是能其中获取到乐趣的。还有很多网友的每周留言。这就是 blog 的含金量。'
  },
  {
    id: 2,
    name: 'Josh W. Comeau',
    url: 'https://www.joshwcomeau.com/',
    avatar: 'https://www.joshwcomeau.com/favicon.png',
    rating: 5,
    reason: 'John blog 更像是一个课程网站，每一篇文章都书写的很好，每次阅读都能吸收到新的东西。网站设计也恰到好处，工整、有趣。'
  },
  {
    id: 3,
    name: 'nanda',
    url: 'https://www.nan.fyi/',
    avatar: 'https://www.nan.fyi/favicon.ico',
    rating: 5,
    reason: '设计大师，nanda 。页面只用灰色加线条，都让我觉得叹为观止，内容不多，每篇都精雕细琢。跟 Josh 一样，属于技术网站，但它的教程引导更加出神入化，可称为程序艺术家。'
  },
  {
    id: 4,
    name: 'Innei 静かな森',
    url: 'https://innei.in/',
    avatar: 'https://cdn.jsdelivr.net/gh/Innei/static@master/avatar.png',
    rating: 4,
    reason: '博客加空间的结合,前端大佬'
  },
  {
    id: 5,
    name: 'Vue 官方文档',
    url: 'https://cn.vuejs.org',
    avatar: 'https://cn.vuejs.org/logo.svg',
    rating: 5,
    reason: 'Vue.js 官方教程，内容全面准确，是学习 Vue 的最佳起点'
  },
  {
    id: 6,
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    avatar: 'https://developer.mozilla.org/favicon.ico',
    rating: 5,
    reason: 'Web 技术的权威参考文档，前端开发者必备参考资料'
  }
])

const filteredBlogs = computed(() => {
  if (!searchQuery.value) return blogs.value
  const query = searchQuery.value.toLowerCase()
  return blogs.value.filter(
    blog =>
      blog.name.toLowerCase().includes(query) ||
      blog.reason.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
.good-blogs {
  padding: 0;
  min-height: calc(100vh - var(--header-height));
}

.page-header {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md) var(--spacing-lg);
}

.page-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
}

.page-desc {
  color: var(--text-secondary);
}

.search-box {
  max-width: 500px;
  margin: 0 auto var(--spacing-xl);
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: 24px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.search-input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.1);
  background: var(--bg-card);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.blogs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.blog-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--accent-color);
}

.blog-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: var(--spacing-md);
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.blog-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  text-align: center;
  color: var(--text-primary);
}

.blog-rating {
  display: flex;
  gap: 2px;
  margin-bottom: var(--spacing-md);
}

.star {
  color: #ddd;
  font-size: 1.2rem;
}

.star.filled {
  color: #ffc107;
}

.blog-reason {
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.6;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

/* 响应式 */
@media (max-width: 900px) {
  .blogs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .blogs-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 1.5rem;
  }
}
</style>
