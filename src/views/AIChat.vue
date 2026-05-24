<template>
  <div class="ai-chat page">
    <div class="chat-container">
      <!-- 聊天标题 -->
      <div class="chat-header">
        <h1 class="chat-title">AI 助手</h1>
        <span class="chat-status">{{ apiEnabled ? '在线' : '未配置' }}</span>
      </div>

      <!-- 消息列表 -->
      <div class="messages" ref="messagesRef">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="message"
          :class="msg.role"
        >
          <div class="message-avatar">
            <div v-if="msg.role === 'user'" class="avatar user-avatar">K</div>
            <div v-else class="avatar ai-avatar">AI</div>
          </div>
          <div class="message-content">
            <div class="message-text">{{ msg.content }}</div>
            <div class="message-time">{{ formatTime(msg.time) }}</div>
          </div>
        </div>

        <!-- 加载中 -->
        <div v-if="loading" class="message assistant">
          <div class="message-avatar">
            <div class="avatar ai-avatar">AI</div>
          </div>
          <div class="message-content">
            <div class="message-text loading">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <textarea
          v-model="inputText"
          @keydown.enter.exact="handleSend"
          placeholder="输入消息..."
          :disabled="loading || !apiEnabled"
          rows="1"
        ></textarea>
        <button
          @click="handleSend"
          :disabled="loading || !inputText.trim() || !apiEnabled"
          class="send-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22,2 15,22 11,13 2,9"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const messages = ref([])
const inputText = ref('')
const loading = ref(false)
const apiEnabled = ref(false)
const messagesRef = ref(null)

const formatTime = (date) => {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

const handleSend = async (e) => {
  if (e && e.preventDefault) {
    e.preventDefault()
  }

  const text = inputText.value.trim()
  if (!text || loading.value) return

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: text,
    time: new Date()
  })

  inputText.value = ''
  scrollToBottom()

  // 添加占位消息
  const aiMessageIndex = messages.value.length
  messages.value.push({
    role: 'assistant',
    content: '',
    time: new Date()
  })

  loading.value = true

  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages.value.slice(0, -1).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    })

    if (!response.ok) {
      const error = await response.json()
      messages.value[aiMessageIndex].content = error.error || '请求失败'
    } else {
      const data = await response.json()
      messages.value[aiMessageIndex].content = data.content
    }
  } catch (error) {
    console.error('Chat error:', error)
    messages.value[aiMessageIndex].content = '网络错误，请重试'
  }

  loading.value = false
  scrollToBottom()
}

onMounted(async () => {
  try {
    const response = await fetch('/api/ai/config')
    const data = await response.json()
    apiEnabled.value = data.enabled
  } catch (error) {
    apiEnabled.value = false
  }
})
</script>

<style scoped>
.ai-chat {
  min-height: 100vh;
  padding-top: var(--header-height);
  display: flex;
  justify-content: center;
  background: var(--bg-primary);
}

.chat-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height));
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.chat-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.chat-status {
  font-size: 12px;
  color: #52c41a;
  background: rgba(82, 196, 26, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
}

.chat-status:not(.online) {
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.1);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.message {
  display: flex;
  gap: var(--spacing-md);
  max-width: 85%;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message.assistant {
  align-self: flex-start;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.user-avatar {
  background: var(--accent-color);
  color: white;
}

.ai-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message.user .message-content {
  align-items: flex-end;
}

.message-text {
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.message.user .message-text {
  background: var(--accent-color);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-text {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 11px;
  color: var(--text-muted);
}

/* 加载动画 */
.message-text.loading {
  display: flex;
  gap: 4px;
  padding: 16px 20px;
}

.message-text.loading span {
  width: 8px;
  height: 8px;
  background: var(--text-muted);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.message-text.loading span:nth-child(1) { animation-delay: -0.32s; }
.message-text.loading span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.input-area {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  background: var(--bg-primary);
}

.input-area textarea {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  resize: none;
  outline: none;
  transition: border-color 0.2s;
}

.input-area textarea:focus {
  border-color: var(--accent-color);
}

.input-area textarea::placeholder {
  color: var(--text-muted);
}

.send-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: var(--accent-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-btn:disabled {
  background: var(--bg-secondary);
  color: var(--text-muted);
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  transform: scale(1.05);
}

.send-btn svg {
  width: 18px;
  height: 18px;
}
</style>