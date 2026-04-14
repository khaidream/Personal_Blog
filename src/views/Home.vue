<template>
  <div class="home page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-icons">
          <router-link to="/gallery" class="icon-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </router-link>
          <a href="https://github.com/khaidream" target="_blank" class="icon-item">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href="https://space.bilibili.com/691028375?spm_id_from=333.1007.0.0" target="_blank" class="icon-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
              <path d="M7.172 2.757L10.414 6h3.171l3.243-3.242a1 1 0 1 1 1.415 1.414L16.414 6H18.5A3.5 3.5 0 0 1 22 9.5v8a3.5 3.5 0 0 1-3.5 3.5h-13A3.5 3.5 0 0 1 2 17.5v-8A3.5 3.5 0 0 1 5.5 6h2.085L5.757 4.171a1 1 0 0 1 1.415-1.414ZM18.5 8h-13a1.5 1.5 0 0 0-1.493 1.355L4 9.5v8a1.5 1.5 0 0 0 1.356 1.493L5.5 19h13a1.5 1.5 0 0 0 1.493-1.356L20 17.5v-8a1.5 1.5 0 0 0-1.356-1.493L18.5 8ZM8 11a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Z"/>
            </svg>
          </a>
          <a href="https://music.163.com" target="_blank" class="icon-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M10.422 11.375c-.294 1.028.012 2.065.784 2.653c1.061.81 2.565.3 2.874-.995c.08-.337.103-.722.027-1.056c-.23-1.001-.521-1.988-.792-2.996c-1.33.154-2.543 1.172-2.893 2.394Zm5.548-.287c.273 1.012.285 2.017-.127 3c-1.128 2.69-4.722 3.14-6.573.826c-1.302-1.627-1.28-3.961.06-5.734c.78-1.032 1.804-1.707 3.048-2.054l.379-.104c-.084-.415-.188-.816-.243-1.224c-.176-1.317.512-2.503 1.744-3.04c1.226-.535 2.708-.216 3.53.76c.406.479.395 1.08-.025 1.464c-.412.377-.997.346-1.435-.09c-.247-.246-.51-.44-.877-.436c-.525.006-.987.418-.945.937c.037.468.172.93.3 1.386c.022.078.216.135.338.153c1.333.197 2.504.731 3.472 1.676c2.558 2.493 2.861 6.531.672 9.44c-1.529 2.032-3.61 3.169-6.127 3.409c-4.621.44-8.664-2.53-9.7-7.058C2.516 10.255 4.84 5.831 8.796 4.25c.586-.234 1.143-.031 1.371.498c.232.537-.019 1.086-.61 1.35c-2.368 1.06-3.817 2.855-4.215 5.423c-.533 3.434 1.656 6.777 5 7.722c2.723.769 5.658-.167 7.308-2.33c1.586-2.08 1.4-5.1-.427-6.874A3.978 3.978 0 0 0 15.4 9.026c.198.716.389 1.388.57 2.062Z"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="hero-content">
        <img src="/assets/image/avator.jpg" alt="khai" class="hero-avatar" />
        <h1 class="hero-title">Hi, I'm khai👋.</h1>
        <p class="hero-desc">A NodeJS Full Stack &lt;Developer /&gt;</p>
      </div>
    </section>

    <!-- Articles Section -->
    <section class="articles-section">
      <div class="container">
        <div class="articles-wrapper">
          <main class="articles-main">
            <h2 class="section-title">最新文章</h2>
            <div class="articles-list">
              <ArticleCard v-for="article in latestArticles" :key="article.slug" :article="article" />
            </div>
            <div v-if="latestArticles.length === 0" class="empty-state">
              <p>暂无文章</p>
            </div>
          </main>
          <aside class="articles-sidebar">
            <ProfileCard />
            <Clock />
            <Weather />
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useArticles } from '@/composables/useArticles'
import ArticleCard from '@/components/ArticleCard.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import Clock from '@/components/Clock.vue'
import Weather from '@/components/Weather.vue'

const { fetchArticles, getLatestArticles } = useArticles()

onMounted(() => {
  fetchArticles()
})

const latestArticles = computed(() => getLatestArticles(6))
</script>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
}

.hero-icons .icon-item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-secondary);
}

.hero-icons .icon-item svg {
  width: 24px;
  height: 24px;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
}

.hero-wave svg {
  width: 100%;
  height: 100%;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: var(--spacing-xl);
}

.hero-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: fadeSlideIn 0.6s ease forwards;
  animation-delay: 0.2s;
}

.hero-title {
  font-size: 31.5px;
  font-weight: 800;
  font-family: 'Instrument Sans', sans-serif;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  letter-spacing: -1px;
  opacity: 0;
  animation: fadeSlideIn 0.6s ease forwards;
  animation-delay: 0.4s;
}

.hero-desc {
  font-size: 31.5px;
  font-family: 'Instrument Sans', sans-serif;
  color: var(--text-primary);
  max-width: 500px;
  line-height: 1.6;
  opacity: 0;
  animation: fadeSlideIn 0.6s ease forwards;
  animation-delay: 0.6s;
}

.hero-icons {
  margin-top: auto;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  gap: var(--spacing-2xl);
  opacity: 0;
  animation: fadeSlideIn 0.6s ease forwards;
  animation-delay: 0.8s;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Articles Section */
.articles-section {
  background: var(--bg-primary);
  padding: var(--spacing-2xl) 0;
}

.articles-wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--spacing-xl);
  align-items: start;
}

.articles-main {
  min-width: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  padding-left: var(--spacing-md);
  border-left: 4px solid var(--accent-color);
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.articles-sidebar {
  position: sticky;
  top: calc(var(--header-height) + var(--spacing-lg));
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
}

/* Responsive */
@media (max-width: 1024px) {
  .articles-wrapper {
    grid-template-columns: 1fr;
  }

  .articles-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-desc {
    font-size: 1rem;
  }
}
</style>
