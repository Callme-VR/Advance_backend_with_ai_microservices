# 🤖 RAG with TypeScript, Qdrant & Groq (`ragwith_ts`)

A high-performance **Retrieval-Augmented Generation (RAG)** microservice built using **TypeScript**, **Express 5**, and **Bun**, powered by **LangChain**, **Google Gemini Embeddings**, **Qdrant Vector Database**, and **Groq LLM**.

---

## 🌟 Key Features

- **📄 PDF Document Ingestion & Chunking:** Automatically extracts text from PDF documents (`pdf-parse`) and splits them into optimized semantic chunks using LangChain's `RecursiveCharacterTextSplitter` (chunk size: 1000, overlap: 150).
- **🧠 Gemini Vector Embeddings:** Converts document chunks into high-dimensional vector embeddings using `@langchain/google-genai` (`gemini-embedding-001`).
- **⚡ Qdrant Vector Database Integration:** Stores and indexes embeddings in a Qdrant cloud collection (`QdrantVectorStore`) for sub-millisecond similarity search.
- **🎯 Strict Context-Bound RAG Prompting:** Queries Groq LLM (`openai/gpt-oss-120b`) enforcing strict guardrails to eliminate hallucinations — the AI answers strictly based on retrieved PDF context or explicitly declines if context is missing.
- **🚀 Bun & Express 5 Powered:** Modern, fast TypeScript development environment using Bun runtime and Express 5 web application framework.

---

## 🏗️ Architecture & RAG Pipeline Flow

1. **Document Loading:** Reads local PDF (`Context.pdf`) via `fs` and parses text with `pdf-parse`.
2. **Text Chunking:** Chunks document text into overlapping blocks via `RecursiveCharacterTextSplitter`.
3. **Embedding Generation & Vector Storage:** Embeds text chunks via `GoogleGenerativeAIEmbeddings` and indexes them into Qdrant (`rag_test_for_final` collection).
4. **Vector Search:** Accepts user queries via `POST /ai`, runs `similaritySearch` against Qdrant to retrieve the top 4 relevant content chunks.
5. **LLM Inference:** Formulates context-bounded prompt for Groq (`ChatGroq`) and responds with accurate context-driven answers.

---

## 🛠️ Tech Stack

- **Runtime & Language:** [Bun](https://bun.sh/), TypeScript
- **Framework:** Express 5
- **Orchestration:** LangChain (`@langchain/core`, `@langchain/groq`, `@langchain/google-genai`, `@langchain/qdrant`, `@langchain/textsplitters`)
- **Embeddings Model:** Google Gemini (`gemini-embedding-001`)
- **LLM Engine:** Groq (`openai/gpt-oss-120b`)
- **Vector Database:** Qdrant Cloud (`@langchain/qdrant`)
- **PDF Parser:** `pdf-parse`

---

## ⚙️ Environment Variables

Create a `.env` file in the `ragwith_ts` directory with the following variables:

```env
PORT=5600
QDRANT_URL=https://<your-qdrant-cluster-url>
QDRANT_API_KEY=<your-qdrant-api-key>
GROQ_API_KEY=<your-groq-api-key>
GOOGLE_API_KEY=<your-google-gemini-api-key>
TAVILY_API_KEY=<your-tavily-api-key> # Optional
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Run Development Server

```bash
bun run dev
# or
bun --watch index.ts
```

---

## 📡 API Endpoints

### 1. RAG Query Endpoint
- **URL:** `POST /ai`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "message": "What does the uploaded PDF say about backend architecture?"
  }
  ```
- **Response:**
  ```json
  {
    "response": "Based on the provided document..."
  }
  ```

### 2. Health Check
- **URL:** `GET /check`
- **Response:**
  ```json
  {
    "message": "Jarvis AI Backend is running 🚀"
  }
  ```
