---
title: 什么是Agent
date: 2026-04-02
slug: my-new-article
tags: [前端]
description: AI Agent（人工智能体）被广泛认为是 LLM 迈向通用人工智能（AGI）的关键形态。它不再仅仅是一个对话框，而是一个能够自主规划并使用工具完成目标的智能系统。
---
## 核心架构：大脑与肢体
AI Agent 的本质是为大语言模型（LLM）配备了推理能力、记忆系统和外部工具。
```python
class AIAgent:
    def __init__(self, llm, tools, memory):
        self.brain = llm        # 核心大脑（决策逻辑）
        self.tools = tools      # 执行工具（如搜索、计算器）
        self.memory = memory    # 记忆系统（上下文与长期知识）

    def run(self, task):
        # 核心循环：思考 -> 行动 -> 观察
        print(f"接收到任务: {task}")
        plan = self.brain.create_plan(task)
        return self.execute(plan)
```
## 推理模式：ReAct 框架
ReAct 是目前 Agent 最主流的工作模式，它要求 Agent 在执行每一个动作前先进行自我推理，实现“言行合一”。
Thought: 用户想要查询 2024 年金价并计算 10 克的总价。
Action: search_engine("2024年金价")
Observation: 当前金价为 550 元/克。

Thought: 已获取单价，现在需要计算 10 克的总价。
Action: calculator("550 * 10")
Observation: 5500

Final Answer: 2024 年当前金价约为 550 元/克，10 克的总价为 5500 元。
## 工具调用实现
Agent 必须能够根据环境反馈实时调整自己的策略，这通常通过 Function Calling（函数调用）机制实现：
```javascript
import { OpenAI } from "openai";

// 定义工具函数
const tools = [
  {
    name: "get_weather",
    description: "获取指定城市的实时天气",
    parameters: { city: "string" }
  }
];

// Agent 根据用户需求决定调用哪个函数
async function agentLogic(input) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: input }],
    functions: tools,
  });
  
  return response.choices[0].message.function_call;
}
```
## 总结
AI Agent 将 AI 从“生成内容”推向了“执行任务”的新阶段。通过规划、记忆与工具调用的有机结合，Agent 正在成为我们处理数字化工作的核心生产力工具。
