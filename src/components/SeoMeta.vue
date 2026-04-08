<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="keywords" :content="keywords" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:description" :content="description" />
    <Meta property="og:type" content="website" />
    <Meta property="og:url" :content="currentUrl" />
    <Meta name="twitter:card" content="summary" />
    <Meta name="twitter:title" :content="title" />
    <Meta name="twitter:description" :content="description" />
    <Link rel="canonical" :href="currentUrl" />
  </Head>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: 'Khai Blog - 技术分享与生活记录'
  },
  description: {
    type: String,
    default: '分享技术与生活，记录成长的点滴和个人心得。专注于 AI 应用开发、Web 前端技术。'
  },
  keywords: {
    type: String,
    default: '博客, 技术分享, 前端开发, Vue, React, JavaScript, AI'
  }
})

const route = useRoute()
const currentUrl = computed(() => {
  return window.location.origin + route.fullPath
})
</script>