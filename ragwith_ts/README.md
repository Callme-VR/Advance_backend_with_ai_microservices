# 🧠 RAG Microservice with Qdrant & Gemini (`ragwith_ts`)

Welcome to the **RAG (Retrieval-Augmented Generation)** microservice! This service allows you to query local documents (PDFs) with AI using vector search, Google Gemini Embeddings, Qdrant Vector DB, and Groq LLM.

---

## 🎯 What is RAG and why use it?

Standard AI models can hallucinate or lack access to your private documents. **RAG** solves this in 3 simple steps:
1. **Index**: Reads your local PDF document, breaks it into small chunks, and converts each chunk into numbers called **Vector Embeddings**.
2. **Retrieve**: When a user asks a question, it searches the vector database (**Qdrant**) for the exact document chunks related to the question.
3. **Generate**: Hands the question + relevant document chunks to **Groq LLM**, which generates an accurate answer grounded strictly in your document.

---

## 💡 RAG Pipeline Diagram

```
[ Context.pdf Document ]
         |
         v
[ pdf-parse & Text Splitter ] ---> ( Semantic Chunks )
                                          |
                                          v
                              [ Gemini Embeddings API ]
                                          |
                                          v
                              [ Qdrant Vector Store ]
                                          |
[ User Question ] --( Search Top Chunks )--+
         |
         v
[ Groq LLM + Retrieved Chunks ] ---> [ Grounded Answer ]
```

---

## 📂 File Overview

| File | Purpose |
| :--- | :--- |
| [`index.ts`](file:///d:/Backend_Advanced_Revision/ragwith_ts/index.ts) | Complete RAG pipeline (PDF parsing, embedding generation, Qdrant store, & API route). |
| [`Context.pdf`](file:///d:/Backend_Advanced_Revision/ragwith_ts/Context.pdf) | The source document indexed into the vector database. |
| [`.env`](file:///d:/Backend_Advanced_Revision/ragwith_ts/.env) | Environment configuration file. |
| [`package.json`](file:///d:/Backend_Advanced_Revision/ragwith_ts/package.json) | Dependencies (LangChain, Qdrant, Google GenAI, Groq). |

---

## 🔑 Environment Variables Setup

Create a `.env` file in `ragwith_ts/`:

```env
PORT=5600
QDRANT_URL=https://<your-qdrant-cluster-url>
QDRANT_API_KEY=<your-qdrant-api-key>
GROQ_API_KEY=<your-groq-api-key>
GOOGLE_API_KEY=<your-google-gemini-api-key>
```

---

## ⚙️ How to Run Locally

### Step 1: Install Dependencies
```bash
bun install
```

### Step 2: Run Development Server
```bash
bun run dev
```
> The server will start at `http://localhost:5600`.

---

## 📡 API Reference & Testing

### 1. Health Check
- **Method:** `GET /check`
- **Response:**
  ```json
  {
    "message": "Jarvis AI Backend is running 🚀"
  }
  ```

### 2. Query PDF Document (RAG)
- **Method:** `POST /ai`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "message": "What does the document say about backend microservices?"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "response": "According to the provided context document..."
  }
  ```
