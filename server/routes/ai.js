import express from 'express';
const router = express.Router();

// 获取 AI 配置（不含密钥）
router.get('/config', (req, res) => {
  const API_KEY = process.env.MINIMAX_API_KEY || '';
  const GROUP_ID = process.env.MINIMAX_GROUP_ID || '';
  res.json({
    enabled: !!(API_KEY && GROUP_ID),
    groupId: GROUP_ID ? GROUP_ID.substring(0, 8) + '...' : null
  });
});

// 与 MiniMax 对话
router.post('/chat', async (req, res) => {
  const { messages } = req.body;
  const API_KEY = process.env.MINIMAX_API_KEY || '';
  const GROUP_ID = process.env.MINIMAX_GROUP_ID || '';

  if (!API_KEY || !GROUP_ID) {
    return res.status(500).json({
      error: 'MiniMax API 未配置'
    });
  }

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      error: '无效的 messages 参数'
    });
  }

  try {
    const response = await fetch(`https://api.minimaxi.com/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MiniMax API error:', errorText);
      return res.status(response.status).json({
        error: 'MiniMax API 请求失败'
      });
    }

    const data = await response.json();
    console.log('MiniMax response:', JSON.stringify(data, null, 2));

    if (data.choices && data.choices[0] && data.choices[0].message) {
      let content = data.choices[0].message.content;
      // 过滤掉思考过程标签内的内容
      content = content.replace(/<think>[\s\S]*?<\/think>/gi, '');
      content = content.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');
      content = content.trim();
      res.json({
        role: 'assistant',
        content: content
      });
    } else {
      res.status(500).json({
        error: 'MiniMax 返回数据格式错误'
      });
    }
  } catch (error) {
    console.error('MiniMax API error:', error);
    res.status(500).json({
      error: '服务器内部错误'
    });
  }
});

export default router;