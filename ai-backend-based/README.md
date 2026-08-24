# 🤖 Jarvis AI Backend (`ai-backend-based`)

An agentic AI backend service powered by **Express**, **TypeScript**, **Bun**, **LangGraph**, **Groq**, and **Tavily Search**.

Jarvis is an intelligent conversational agent capable of maintaining multi-turn memory across sessions and autonomously executing web search tools when real-time or external information is needed.

---

## ✨ Features

- **Autonomous Agentic Workflow**: Built with `@langchain/langgraph` to process messages and conditionally invoke tools.
- **Real-Time Web Search**: Integrates `@langchain/tavily` (`TavilySearch`) for live data like current news, weather, stock prices, and web search.
- **Stateful Thread Memory**: Uses LangGraph `MemorySaver` to persist conversation context across requests using a `threadId`.
- **Fast Runtime**: Powered by **Bun** for instant execution and native TypeScript support.

---

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.com)
- **Framework**: Express.js (v5)
- **AI / Agent Framework**: `@langchain/langgraph`, `@langchain/core`
- **LLM Provider**: `@langchain/groq` (`ChatGroq`)
- **Search Tool**: `@langchain/tavily` (`TavilySearch`)
- **Language**: TypeScript

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
GROQ_API=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Development Mode

Runs the server with auto-reload (`bun --watch index.ts`):

```bash
bun dev
```

### 3. Production Start

```bash
bun start
```

---

## 📡 API Reference

### 1. Health Check
- **Method**: `GET /`
- **Response**:
  ```json
  {
    "message": "Jarvis AI Backend is running 🚀"
  }
  ```

---

### 2. Chat with AI Agent
- **Method**: `POST /ai`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "message": "What is the latest update on quantum computing?",
    "threadId": "session-123"
  }
  ```
  *Note: `threadId` is optional. Defaults to `"default-thread"` if omitted.*

- **Success Response (`200 OK`)**:
  ```json
  {
    "response": "Here are the recent developments in quantum computing...",
    "threadId": "session-123"
  }
  ```

- **Error Responses**:
  - `400 Bad Request`: `{"error": "Message is required"}`
  - `413 Payload Too Large`: `{"error": "Input message is too large."}`
  - `500 Internal Server Error`: `{"error": "Error message description"}`

---

## 📂 Project Structure

```
ai-backend-based/
├── index.ts          # Express app, LangGraph configuration, nodes & endpoints
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript settings
├── .env              # Environment keys (GROQ_API, TAVILY_API_KEY, PORT)
└── README.md         # Project documentation
```
