<template>
  <div class="gallery page">
    <div class="page-header">
      <h1 class="page-title">相册</h1>
      <p class="page-desc">记录生活中的美好瞬间</p>
    </div>

    <div class="polaroid-container">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="polaroid-card"
        :class="{ visible: getRandomStyle(index).visible }"
        :style="getRandomStyle(index)"
        @click="openLightbox(index)"
      >
        <img :src="photo.url" :alt="photo.title" />
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="showLightbox" class="lightbox" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">×</button>
      <button class="lightbox-prev" @click="prevPhoto">‹</button>
      <div class="lightbox-content">
        <div class="lightbox-image">
          <img :src="photos[currentIndex].url" :alt="photos[currentIndex].title" />
        </div>
        <div class="lightbox-desc">
          <h2 class="desc-title">{{ photos[currentIndex].title }}</h2>
          <span class="desc-date">{{ photos[currentIndex].date }}</span>
          <p class="desc-text">{{ photos[currentIndex].description }}</p>
        </div>
      </div>
      <button class="lightbox-next" @click="nextPhoto">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const photos = ref([
  {
    url: '/assets/image/climb1.jpg',
    title: '第一次爬山',
    date: '2025-01-15',
    description: '第一次爬山,是被姐夫拉去的,11公里真的很累,完全就是靠姐夫带的能量饮料续命,这条路线据说是1.5星的路线'
  },
  {
    url: '/assets/image/climb2.jpg',
    title: '第二次爬山',
    date: '2026-02-20',
    description: '都是经常爬山大佬，第一次跟着组织一起爬，大家都是前辈我是年纪最小的，有人一开始就放弃了，刚开始因为我的脸色也不太好，多次被劝退，但是坚持到后面发现越爬越轻松了，感觉比第一次爬山累多了，最后也是完成了全程，这次的行程难度是2.5星，总计12.5公里，期间翻越了多个小山头。'
  },
  {
    url: '/assets/image/climb3.jpg',
    title: '累倒的姐夫',
    date: '2026-03-10',
    description: '结束回到起点的时候，真是全身都是酸的，已经是累到一步路都不想走了'
  },
  {
    url: '/assets/image/climb4.jpg',
    title: '龙门顶',
    date: '2024-04-05',
    description: '这次羚羊峡的最高点，也是整条路线的中段了，在这休息了几分钟就又接着走了，这之后我和我姐夫全程领先大部队（大部队们需要拍照所以走的慢），当然也是因为我和我姐夫走得快，每次都是休息两分钟就继续走了。'
  },
  {
    url: '/assets/image/climb5.jpg',
    title: '帅气的姐夫',
    date: '2024-05-12',
    description: '山顶上一块突出去的石头，大家都站在那上面拍照，特别出片，但是有恐高的就不太行了。'
  },
  {
    url: '/assets/image/wanlvhu1.jpg',
    title: '万绿湖的一角',
    date: '2025-01-31',
    description: '老家河源万绿湖真的是碧绿的颜色，是国家一级饮用水资源保护地。'
  },
  {
    url: '/assets/image/wanlvhu2.jpg',
    title: '万绿湖',
    date: '2025-01-31',
    description: '透过繁茂错落的绿叶枝桠，碧波如镜的湖面上点缀着翠色欲流的屿岛，如同一幅清幽宁静、墨色晕染的山水画卷。'
  }
])

const showLightbox = ref(false)
const currentIndex = ref(0)
const photoStyles = ref([])

const getRandomStyle = (index) => {
  return photoStyles.value[index] || {}
}

const generateRandomStyles = () => {
  const count = photos.value.length
  photoStyles.value = photos.value.map((_, index) => {
    const rotation = Math.random() * 30 - 15
    const centerX = 50
    const centerY = 50
    const angleStep = (index / count) * Math.PI * 2
    const radiusX = 10 + Math.random() * 4
    const radiusY = 18 + Math.random() * 6
    const x = centerX + Math.cos(angleStep) * radiusX + (Math.random() - 0.5) * 3
    const y = centerY + Math.sin(angleStep) * radiusY + (Math.random() - 0.5) * 3
    const zIndex = index + 10

    return {
      left: `${x}%`,
      top: `${y}%`,
      '--rotation': `${rotation}deg`,
      zIndex,
      visible: false
    }
  })
}

const openLightbox = (index) => {
  currentIndex.value = index
  showLightbox.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = ''
}

const prevPhoto = () => {
  currentIndex.value = (currentIndex.value - 1 + photos.value.length) % photos.value.length
}

const nextPhoto = () => {
  currentIndex.value = (currentIndex.value + 1) % photos.value.length
}

onMounted(() => {
  generateRandomStyles()
  // Stagger the visible class toggle - use JS timeout only, no CSS delay
  photos.value.forEach((_, index) => {
    setTimeout(() => {
      photoStyles.value[index].visible = true
      // After animation completes, add .entered class and enable hover
      setTimeout(() => {
        const cards = document.querySelectorAll('.polaroid-card')
        cards[index].classList.add('entered')
        cards[index].style.animation = 'none'
      }, 1000)
    }, index * 500 + 100)
  })
})
</script>

<style scoped>
.gallery {
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

.polaroid-container {
  position: relative;
  min-height: calc(100vh - var(--header-height) - 140px);
  background: var(--bg-primary);
  overflow: hidden;
  padding: 40px;
}

.polaroid-card {
  position: absolute;
  background: #fff;
  padding: 10px;
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.1),
    0 8px 24px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translate(-50%, -50%) translateY(20px) rotate(var(--rotation, 0deg));
}

.polaroid-card.visible {
  animation: polaroidEntrance 1s ease forwards;
}

@keyframes polaroidEntrance {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(20px) rotate(var(--rotation, 0deg));
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg));
  }
}

.polaroid-card.entered {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(var(--rotation, 0deg));
}

.polaroid-card img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  display: block;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .polaroid-card img {
    width: 220px;
    height: 220px;
  }
}

.polaroid-card:hover {
  transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) scale(1.1);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.2),
    0 20px 60px rgba(0, 0, 0, 0.15);
  z-index: 100 !important;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.lightbox-content {
  display: flex;
  width: 90%;
  max-width: 1200px;
  height: 80vh;
  gap: var(--spacing-xl);
}

.lightbox-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.lightbox-desc {
  width: 300px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: var(--spacing-xl);
  color: white;
  display: flex;
  flex-direction: column;
}

.desc-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.desc-date {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: var(--spacing-lg);
}

.desc-text {
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  flex: 1;
  overflow-y: auto;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: var(--spacing-sm) var(--spacing-md);
  transition: background 0.2s;
}

.lightbox-close:hover,
.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-close {
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  font-size: 2.5rem;
  padding: var(--spacing-xs) var(--spacing-sm);
}

.lightbox-prev {
  left: var(--spacing-lg);
  top: 50%;
  transform: translateY(-50%);
}

.lightbox-next {
  right: calc(300px + var(--spacing-xl) + var(--spacing-lg));
  top: 50%;
  transform: translateY(-50%);
}

/* Mobile: Grid Layout */
@media (max-width: 768px) {
  .polaroid-container {
    min-height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-primary);
  }

  .polaroid-card {
    position: relative;
    left: auto !important;
    top: auto !important;
    transform: none !important;
    width: 100%;
    max-width: none;
    padding: 8px 8px 40px 8px;
  }

  .polaroid-card:hover {
    transform: none !important;
  }

  .polaroid-card img {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }

  .lightbox-content {
    flex-direction: column;
    width: 95%;
    height: auto;
    max-height: 90vh;
    overflow-y: auto;
  }

  .lightbox-image {
    max-height: 50vh;
  }

  .lightbox-desc {
    width: 100%;
    max-height: 40vh;
    overflow-y: auto;
  }

  .lightbox-prev,
  .lightbox-next {
    font-size: 1.5rem;
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .lightbox-next {
    right: var(--spacing-lg);
    top: auto;
    bottom: calc(40vh + var(--spacing-lg));
    transform: none;
  }
}
</style>
