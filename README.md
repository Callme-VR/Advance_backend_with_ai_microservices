# 🚀 Advanced Backend, AI Microservices & System Design Revision

Welcome to the **Advanced Backend & AI Microservices** repository! This monorepo is a comprehensive learning and implementation guide covering modern backend engineering, agentic AI services, vector embeddings with RAG, Redis performance caching, system design with Nginx, and cloud deployment on AWS EC2.

---

## 🗺️ Table of Contents

- [📁 Repository Structure](#-repository-structure)
- [🧩 Workspace Modules Breakdown](#-workspace-modules-breakdown)
  - [1. Phase 1: Core Express & Docker Setup](#1--phase-1-core-express--docker-setup)
  - [2. Jarvis AI Backend](#2--jarvis-ai-backend)
  - [3. RAG Microservice](#3--rag-microservice)
  - [4. Redis Caching & Queues](#4--redis-caching--queues)
  - [5. System Design & Nginx Reverse Proxy](#5--system-design--nginx-reverse-proxy)
  - [6. Cloud Deployment (AWS EC2)](#6--cloud-deployment-aws-ec2)
  - [7. Microservices Architecture](#7--microservices-architecture)
- [⚙️ Unified Quick Start Guide](#️-unified-quick-start-guide)
- [🛠️ Complete Technology Stack](#️-complete-technology-stack)

---

## 📁 Repository Structure

```
.
├── Phase-1/                 # 🚀 Express 5 + Bun Foundation & Docker Container Setup
├── ai-backend-based/        # 🤖 Agentic AI Backend (LangGraph, Groq LLM & Tavily Search)
├── ragwith_ts/              # 🧠 RAG Microservice (Google Gemini Embeddings, Qdrant Vector DB & Groq)
├── phase-redis/             # ⚡ High-Performance Redis Caching, Rate Limiter & BullMQ
│   ├── backend/             #    Express + Prisma ORM + Redis + BullMQ Queue
│   └── frontend/            #    Frontend test interface
├── phase-3-sysDesign/       # 🌐 System Design: Nginx Reverse Proxy & Docker Compose
├── EC2/                     # ☁️ AWS EC2 Cloud Infrastructure & Deployment
│   └── Cloud_deployment/    #    Dockerized Express Backend ready for AWS EC2
└── microservies/            # 🏗️ Microservices Architecture Template & API Gateway
```

---

## 🧩 Workspace Modules Breakdown

### 1. 🚀 Phase 1: Core Express & Docker Setup
- **Directory**: [`Phase-1/`](file:///d:/Backend_Advanced_Revision/Phase-1/README.md)
- **Key Concepts**: Express 5, Bun runtime, TypeScript, Dockerfile containerization.
- **Goal**: Build a ultra-fast, lightweight Express application running on Bun and packaged into Docker containers.
- **Read More**: 👉 [Phase 1 Documentation](file:///d:/Backend_Advanced_Revision/Phase-1/README.md)

---

### 2. 🤖 Jarvis AI Backend
- **Directory**: [`ai-backend-based/`](file:///d:/Backend_Advanced_Revision/ai-backend-based/README.md)
- **Key Concepts**: Agentic workflows with LangGraph, Groq LLM inference, Tavily Web Search, thread memory.
- **Goal**: Create an intelligent assistant that remembers conversation history and dynamically triggers live web searches for real-time information.
- **Read More**: 👉 [Jarvis AI Backend Documentation](file:///d:/Backend_Advanced_Revision/ai-backend-based/README.md)

---

### 3. 🧠 RAG Microservice
- **Directory**: [`ragwith_ts/`](file:///d:/Backend_Advanced_Revision/ragwith_ts/README.md)
- **Key Concepts**: Document parsing (`pdf-parse`), text chunking (`RecursiveCharacterTextSplitter`), Google Gemini vector embeddings, Qdrant Vector DB, strictly grounded Groq responses.
- **Goal**: Query local PDF documents with zero hallucinations by searching vector similarity in Qdrant before generating LLM answers.
- **Read More**: 👉 [RAG Microservice Documentation](file:///d:/Backend_Advanced_Revision/ragwith_ts/README.md)

---

### 4. ⚡ Redis Caching & Queues
- **Directory**: [`phase-redis/`](file:///d:/Backend_Advanced_Revision/phase-redis/README.md) & [`phase-redis/backend/`](file:///d:/Backend_Advanced_Revision/phase-redis/backend/README.md)
- **Key Concepts**: Redis caching (HIT vs MISS timing analysis), custom IP rate-limiting middleware, Prisma ORM with PostgreSQL, BullMQ email task queue.
- **Goal**: Boost API speeds by ~90% using Redis in-memory caching and protect API routes against spam attacks.
- **Read More**: 👉 [Redis Module Documentation](file:///d:/Backend_Advanced_Revision/phase-redis/backend/README.md)

---

### 5. 🌐 System Design & Nginx Reverse Proxy
- **Directory**: [`phase-3-sysDesign/`](file:///d:/Backend_Advanced_Revision/phase-3-sysDesign/README.md)
- **Key Concepts**: Nginx reverse proxy configuration, Docker Compose multi-container orchestration, port mapping.
- **Goal**: Intercept and balance HTTP traffic through Nginx reverse proxy containers.
- **Read More**: 👉 [System Design Documentation](file:///d:/Backend_Advanced_Revision/phase-3-sysDesign/README.md)

---

### 6. ☁️ Cloud Deployment (AWS EC2)
- **Directory**: [`EC2/`](file:///d:/Backend_Advanced_Revision/EC2/README.md) & [`EC2/Cloud_deployment/`](file:///d:/Backend_Advanced_Revision/EC2/Cloud_deployment/README.md)
- **Key Concepts**: AWS EC2 instance configuration, Security Groups, Docker deployment on cloud servers.
- **Goal**: Containerize backend apps and run production services on cloud virtual machines.
- **Read More**: 👉 [Cloud Deployment Documentation](file:///d:/Backend_Advanced_Revision/EC2/Cloud_deployment/README.md)

---

### 7. 🏗️ Microservices Architecture
- **Directory**: [`microservies/`](file:///d:/Backend_Advanced_Revision/microservies/README.md)
- **Key Concepts**: API Gateway pattern, service decoupling, independent domain databases, Docker Compose orchestration.
- **Goal**: Separate monolithic applications into independent microservices linked via an API Gateway.
- **Read More**: 👉 [Microservices Documentation](file:///d:/Backend_Advanced_Revision/microservies/README.md)

---

## ⚙️ Unified Quick Start Guide

### Prerequisites
- [Bun Runtime](https://bun.sh/) (or Node.js >= 18)
- [Docker](https://www.docker.com/) & Docker Compose
- API Keys for **Groq**, **Google Gemini**, **Tavily**, and **Qdrant Cloud**

### 1. Run RAG Service (`ragwith_ts`)
```bash
cd ragwith_ts
bun install
bun run dev
```

### 2. Run AI Agent Service (`ai-backend-based`)
```bash
cd ai-backend-based
bun install
bun dev
```

### 3. Run Redis & PostgreSQL Backend (`phase-redis/backend`)
```bash
cd phase-redis/backend
bun install
bunx prisma migrate dev
bun run index.ts
```

### 4. Run Nginx Reverse Proxy (`phase-3-sysDesign`)
```bash
cd phase-3-sysDesign
docker-compose up --build -d
```

---

## 🛠️ Complete Technology Stack

- **Runtime & Language**: [Bun](https://bun.sh/), TypeScript, Node.js
- **Web Framework**: Express 5
- **Databases & Vector DB**: PostgreSQL, Prisma ORM, Qdrant Vector Database
- **Caching & Message Queues**: Redis (`ioredis`), BullMQ
- **AI Engine & Frameworks**: LangChain, LangGraph, Groq LLM, Google Gemini Embeddings, Tavily Search
- **DevOps & Cloud**: Docker, Docker Compose, Nginx, AWS EC2
