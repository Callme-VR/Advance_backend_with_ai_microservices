# 🤖 Jarvis AI Backend (`ai-backend-based`)

Welcome to **Jarvis AI Backend**! This module is an **Agentic AI service** that uses **LangGraph**, **Groq LLM**, and **Tavily Web Search** to create an intelligent assistant capable of searching the web and remembering conversation history.

---

## 🎯 What does this service do?

1. **Thinks & Acts (Agentic Workflow)**: Uses `@langchain/langgraph` to analyze user messages and automatically decide whether to answer directly or run a web search.
2. **Real-time Web Search**: Uses **Tavily Search** to look up current weather, news, stock prices, or recent events.
3. **Remembers Conversations (Memory)**: Keeps track of previous messages per user session using a `threadId`.

---

## 💡 How it Works (Flowchart)

```
[ User Message ] ---> ( Express Server POST /ai )
                            |
                            v
                   [ LangGraph Agent ]
                     /             \
       Need Web Info?               No Web Info Needed?
            /                             \
           v                               v
 [ Tavily Search API ]           [ Generate Direct Answer ]
           \                               /
            v                             v
           [ Combine Context & Respond to User ]
```

---

## 📂 File Overview

| File | Description |
| :--- | :--- |
| [`index.ts`](file:///d:/Backend_Advanced_Revision/ai-backend-based/index.ts) | Express server, LangGraph agent configuration, tools, and endpoints. |
| [`.env`](file:///d:/Backend_Advanced_Revision/ai-backend-based/.env) | Environment variable settings (API keys & Port). |
| [`package.json`](file:///d:/Backend_Advanced_Revision/ai-backend-based/package.json) | Dependencies (`@langchain/langgraph`, `@langchain/groq`, `@langchain/tavily`, `express`). |

---

## 🔑 Environment Variables Setup

Create a `.env` file in `ai-backend-based/`:

```env
PORT=3000
GROQ_API=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

---

## ⚙️ How to Run Locally

### Step 1: Install Dependencies
```bash
bun install
```

### Step 2: Start Development Server
```bash
bun dev
```
> The server will start at `http://localhost:3000`.

---

## 📡 API Reference & Testing

### 1. Health Check
- **Method:** `GET /`
- **Response:**
  ```json
  {
    "message": "Jarvis AI Backend is running 🚀"
  }
  ```

### 2. Chat with Jarvis AI Agent
- **Method:** `POST /ai`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "message": "What is the latest score in today's cricket match?",
    "threadId": "user-session-1"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "response": "According to real-time search results...",
    "threadId": "user-session-1"
  }
  ```

> 💡 **Note on `threadId`**: Passing the same `threadId` in consecutive requests enables Jarvis to remember previous messages in the conversation.
