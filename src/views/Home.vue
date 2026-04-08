<template>
  <div class="home page">
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Hi,I'm khai👋<br>An AI application &lt;Developer /&gt;</h1>
        <p class="hero-desc">
          分享技术与生活，记录成长的点滴和个人心得。
        </p>
        <router-link to="/articles" class="btn btn-primary">浏览文章</router-link>
      </div>
    </section>

    <section class="main-content">
      <div class="container">
        <div class="content-wrapper">
          <main class="articles-section">
            <h2 class="section-title">最新文章</h2>
            <div class="grid">
              <ArticleCard v-for="article in latestArticles" :key="article.slug" :article="article" />
            </div>
            <div v-if="latestArticles.length === 0" class="empty-state">
              <p>暂无文章</p>
            </div>
          </main>

          <aside class="sidebar">
            <ProfileCard />
            <Announcement />
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
import Announcement from '@/components/Announcement.vue'
import Clock from '@/components/Clock.vue'
import Weather from '@/components/Weather.vue'

const { fetchArticles, getLatestArticles } = useArticles()

onMounted(() => {
  fetchArticles()
})

const latestArticles = computed(() => getLatestArticles(6))
</script>

<style scoped>
.hero {
  padding: var(--spacing-2xl) 0;
  text-align: center;
  background: var(--bg-secondary);
  margin-bottom: var(--spacing-xl);
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
}

.hero-desc {
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.main-content {
  padding-bottom: var(--spacing-2xl);
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr 300px;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

@media (max-width: 1023px) {
  .sidebar {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .sidebar > :first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .sidebar {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
}
</style>
