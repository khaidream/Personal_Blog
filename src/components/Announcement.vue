<template>
  <aside class="announcement card">
    <h3 class="title">
      <span class="icon">📢</span>
      公告
    </h3>
    <ul class="list">
      <li v-for="(item, index) in announcements" :key="index" class="item">
        <span class="dot"></span>
        <span class="text">{{ item }}</span>
      </li>
    </ul>
  </aside>
</template>

<script setup>
const announcements = [
  '欢迎访问我的个人博客',
  '文章持续更新中，敬请期待',
  '如有建议请联系邮箱'
]
</script>

<style scoped>
.announcement {
  padding: var(--spacing-md);
}

.title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 1rem;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
}

.icon {
  font-size: 1.1rem;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.dot {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-top: 7px;
  background: var(--accent-color);
  border-radius: 50%;
}

.text {
  flex: 1;
}
</style>
