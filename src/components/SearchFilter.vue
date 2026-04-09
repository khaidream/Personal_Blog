<template>
  <div class="search-filter">
    <div class="search-wrapper">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="search-input"
        @input="emitSearch"
      />
      <button v-if="searchQuery" class="clear-btn" @click="clearSearch">×</button>
    </div>

    <div class="tags-filter" v-if="tags.length > 0">
      <span
        class="tag"
        :class="{ active: selectedTag === '' }"
        @click="selectTag('')"
      >全部</span>
      <span
        v-for="tag in tags"
        :key="tag"
        class="tag"
        :class="{ active: selectedTag === tag }"
        @click="selectTag(tag)"
      >{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tags: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '搜索...'
  },
  modelValue: {
    type: String,
    default: ''
  },
  selectedTag: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'update:selectedTag', 'search', 'tag-change'])

const searchQuery = ref(props.modelValue)
const selectedTag = ref(props.selectedTag)

watch(() => props.modelValue, (val) => {
  searchQuery.value = val
})

watch(() => props.selectedTag, (val) => {
  selectedTag.value = val
})

const emitSearch = () => {
  emit('update:modelValue', searchQuery.value)
  emit('search', { query: searchQuery.value, tag: selectedTag.value })
}

const selectTag = (tag) => {
  selectedTag.value = tag
  emit('update:selectedTag', tag)
  emit('tag-change', tag)
  emit('search', { query: searchQuery.value, tag })
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('update:modelValue', '')
  emit('search', { query: '', tag: selectedTag.value })
}
</script>

<style scoped>
.search-filter {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.search-wrapper {
  position: relative;
  max-width: 300px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #888;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 8px 36px;
  border: none;
  border-radius: 20px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: background 0.2s;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  background: var(--bg-card);
}

.clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: var(--text-muted);
  color: var(--bg-primary);
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover {
  background: var(--text-secondary);
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  cursor: pointer;
  transition: all 0.2s;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
}

.tag.active {
  background: var(--accent-color);
  color: white;
}
</style>