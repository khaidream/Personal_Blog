<template>
  <aside class="weather card">
    <h3 class="title">
      <span class="icon">🌤️</span>
      天气
    </h3>
    <div class="weather-display" v-if="weatherData">
      <div class="main-info">
        <span class="temp">{{ weatherData.temp }}</span>
        <span class="unit">°C</span>
      </div>
      <div class="condition">{{ weatherData.condition }}</div>
      <div class="location">📍 {{ weatherData.location }}</div>
    </div>
    <div class="loading" v-else-if="loading">
      <span>加载中...</span>
    </div>
    <div class="error" v-else>
      <span>无法获取天气</span>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const weatherData = ref(null)
const loading = ref(true)

const fetchWeather = async () => {
  try {
    const res = await fetch('https://wttr.in/Foshan?format=j1')
    const data = await res.json()
    const current = data.current_condition[0]

    weatherData.value = {
      temp: current.temp_C,
      condition: getWeatherDesc(current.weatherCode),
      location: '佛山'
    }
  } catch (e) {
    console.error('Failed to fetch weather:', e)
  } finally {
    loading.value = false
  }
}

const getWeatherDesc = (code) => {
  const weatherMap = {
    '113': '☀️ 晴',
    '116': '⛅ 多云',
    '119': '☁️ 阴',
    '122': '☁️ 阴',
    '143': '🌫️ 雾',
    '176': '🌧️ 阵雨',
    '263': '🌧️ 小雨',
    '266': '🌧️ 小雨',
    '353': '🌧️ 阵雨',
    '362': '🌨️ 雨夹雪',
    '365': '🌨️ 雨夹雪',
    '368': '🌨️ 小雪',
    '371': '❄️ 中雪',
    '800': '🌙 夜间'
  }
  return weatherMap[code] || '🌤️'
}

onMounted(fetchWeather)
</script>

<style scoped>
.weather {
  padding: var(--spacing-md);
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: 1rem;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
}

.icon {
  font-size: 1.1rem;
}

.weather-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.main-info {
  display: flex;
  align-items: flex-start;
}

.temp {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-color);
}

.unit {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-top: 8px;
}

.condition {
  font-size: 1rem;
  color: var(--text-primary);
}

.location {
  font-size: 14px;
  color: var(--text-muted);
}

.loading,
.error {
  font-size: 14px;
  color: var(--text-muted);
  padding: var(--spacing-md) 0;
}
</style>
