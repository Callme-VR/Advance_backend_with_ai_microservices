# Advanced Backend & AI Microservices Revision

A comprehensive monorepo covering modern backend development, system design, high-performance caching with Redis, AI integrations via LangChain & Groq, RAG pipelines with Qdrant & Gemini Embeddings, Docker containerization, and microservices architecture.

---

## 📁 Workspace Overview & Structure

```
.
├── Phase-1/                 # Phase 1: Express 5 + Bun Foundation & Docker Setup
├── ai-backend-based/        # AI Microservice powered by LangChain & Groq API
├── ragwith_ts/              # RAG Microservice with Qdrant, Gemini Embeddings & Groq
├── phase-redis/             # Redis Caching, Rate Limiting, BullMQ & Prisma ORM
│   ├── backend/             # Express + Prisma + Redis + Rate Limiter
│   └── frontend/            # Client interface for Redis testing
├── phase-3-sysDesign/       # System Design: Nginx Reverse Proxy & Docker Compose
└── microservies/            # Microservices Architecture: API Gateway & Service modules
    ├── backend/
    │   ├── gateway/         # API Gateway
    │   └── services/        # Decoupled Microservices
    └── frentend/            # Frontend application
```

---

## ⚡ Key Modules & Feature Highlights

### 1. 🚀 `Phase-1`: Core Backend & Containerization
- **Tech Stack:** Express 5, Bun, TypeScript, Docker.
- Setup of modern TypeScript runtime using Bun.
- Dockerfile configuration for production-ready containerization.

### 2. 🤖 `ai-backend-based`: AI Integration Microservice
- **Tech Stack:** LangChain (`@langchain/groq`), Express 5, Groq API, TypeScript.
- Integrates LLM inference via Groq models (e.g., `qwen/qwen3.6-27b`, `llama-3.3-70b-versatile`).
- Features payload length validation and error handling for `413 Request Entity Too Large` API limits.

### 3. 🧠 `ragwith_ts`: Retrieval-Augmented Generation (RAG) Microservice
- **Tech Stack:** Express 5, Bun, TypeScript, LangChain, Qdrant Vector Store, Google Gemini Embeddings, Groq LLM, `pdf-parse`.
- Reads and parses local PDF documents (`pdf-parse`), splitting content into semantic chunks using `RecursiveCharacterTextSplitter`.
- Generates high-dimensional vector embeddings with Google Gemini (`gemini-embedding-001`) and indexes them in Qdrant Cloud.
- Provides a strict context-bounded RAG query endpoint (`POST /ai`) that retrieves top matching context chunks before delegating response generation to Groq LLM.

### 4. ⚡ `phase-redis`: High-Performance Caching & Rate Limiting
- **Tech Stack:** Redis (`ioredis`), PostgreSQL, Prisma ORM, BullMQ, Express.
- **Cache Benchmark:** Compares direct PostgreSQL queries against Redis cache (`HIT` vs `MISS` timing analysis).
- **Custom Rate Limiting Middleware:** Uses Redis atomic counter operations (`INCR`/`EXPIRE`) to prevent API abuse (limits to 4 requests per IP / minute).
- **Cache Invalidation:** Features endpoints to dynamically purge and rebuild cache.

### 5. 🌐 `phase-3-sysDesign`: Reverse Proxy & Load Balancing
- **Tech Stack:** Nginx, Docker Compose.
- Implements Nginx reverse proxy configuration to balance incoming HTTP requests to backend instances.

### 6. 🏗️ `microservies`: Decoupled Microservices Architecture
- Architecture template for separating API Gateways from independent core services and frontend modules.

---

## ⚙️ Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed (or Node.js >= 18)
- [Docker](https://www.docker.com/) & Docker Compose
- PostgreSQL & Redis instances (or run via Docker)
- Qdrant Vector DB, Groq & Google Gemini API Keys

### Running RAG Microservice (`ragwith_ts`):

```bash
cd ragwith_ts

# Install dependencies
bun install

# Configure environment variables (.env)
# PORT, QDRANT_URL, QDRANT_API_KEY, GROQ_API_KEY, GOOGLE_API_KEY

# Run development server
bun dev
```

### Running AI module locally (`ai-backend-based`):

```bash
# Navigate to module directory
cd ai-backend-based

# Install dependencies
bun install

# Configure environment variables
# Create a .env file with GROQ_API=<your_groq_api_key>

# Run development server
bun dev
```

### Running Redis & PostgreSQL Backend (`phase-redis/backend`):

```bash
cd phase-redis/backend

# Install dependencies
bun install

# Run database migrations
bun run db:migrate

# Start development server
bun dev
```

### Running System Design Nginx Proxy (`phase-3-sysDesign`):

```bash
cd phase-3-sysDesign

# Start containers
docker-compose up --build -d
```

---

## 🛠️ Tech Stack & Tools

- **Runtime & Language:** [Bun](https://bun.sh/), TypeScript, Node.js
- **Frameworks:** Express 5
- **Database & Vector Store:** PostgreSQL, Qdrant Vector DB, Prisma ORM
- **In-Memory Cache & Queues:** Redis, `ioredis`, BullMQ
- **AI Ecosystem & Vector Embeddings:** LangChain, Groq SDK, Google Gemini Embeddings
- **DevOps & Infrastructure:** Docker, Docker Compose, Nginx Reverse Proxy

