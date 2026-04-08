---
title: Vue 3 入门完全指南
date: 2024-03-15
slug: getting-started-with-vue3
tags: [Vue, JavaScript]
description: 深入理解 Vue 3 的核心概念，从组合式 API 到响应式系统，帮助你快速上手 Vue 3 开发。
---

# Vue 3 入门完全指南

Vue 3 是 Vue.js 的最新主要版本，带来了许多新特性和性能改进。本文将带你全面了解 Vue 3 的核心概念。

## 组合式 API

Vue 3 引入了组合式 API（Composition API），这是一种更加灵活的代码组织方式。

```javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)

    const increment = () => {
      count.value++
    }

    onMounted(() => {
      console.log('Component mounted!')
    })

    return {
      count,
      doubled,
      increment
    }
  }
}
```

## 响应式系统

Vue 3 的响应式系统基于 ES6 Proxy 实现，性能更优。

### ref 和 reactive

```javascript
import { ref, reactive } from 'vue'

// 用于基本类型
const count = ref(0)

// 用于对象
const state = reactive({
  name: 'Vue',
  version: '3.0'
})
```

## 单文件组件

Vue 3 的单文件组件（.vue）支持更好的 TypeScript 集成：

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'update', value: string): void
}>()
</script>

<template>
  <div class="card">
    <h2>{{ props.title }}</h2>
  </div>
</template>
```

## 总结

Vue 3 提供了更强大的工具和更好的性能，无论是小型项目还是大型应用，都是一个优秀的选择。
