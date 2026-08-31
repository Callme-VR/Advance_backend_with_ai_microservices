# 🚀 Phase 1: Core Express & Docker Setup

Welcome to **Phase 1**! This phase introduces the fundamentals of building a fast, lightweight Node.js/TypeScript backend using **Express 5** and **Bun**, containerized with **Docker**.

---

## 🎯 What is this module about?

In this module, you will learn how to:
1. Set up an **Express 5** server written in **TypeScript**.
2. Run your server using **Bun** (a ultra-fast JavaScript/TypeScript runtime).
3. Package the application into a **Docker** container for easy cloud deployment.

---

## 📂 File Overview

| File | Purpose |
| :--- | :--- |
| [`index.ts`](file:///d:/Backend_Advanced_Revision/Phase-1/index.ts) | Main Express server entry point (Listens on port `3000`). |
| [`Dockerfile`](file:///d:/Backend_Advanced_Revision/Phase-1/Dockerfile) | Docker configuration instructions to containerize the app. |
| [`package.json`](file:///d:/Backend_Advanced_Revision/Phase-1/package.json) | Project dependencies and scripts. |
| [`tsconfig.json`](file:///d:/Backend_Advanced_Revision/Phase-1/tsconfig.json) | TypeScript compiler options. |

---

## ⚙️ How to Run Locally

### Prerequisites
- Install [Bun](https://bun.sh/) (or Node.js).
- Install [Docker](https://www.docker.com/) (optional, for containerization).

### Step 1: Install Dependencies
```bash
bun install
```

### Step 2: Run the Development Server
```bash
bun run index.ts
```
> The server will start at `http://localhost:3000`.

### Step 3: Test the Endpoint
Open your browser or run in terminal:
```bash
curl http://localhost:3000
```
**Expected Output:** `Hello World!`

---

## 🐳 Running with Docker

### Step 1: Build the Docker Image
```bash
docker build -t phase-1-backend .
```

### Step 2: Run the Docker Container
```bash
docker run -p 3000:3000 phase-1-backend
```
Now access `http://localhost:3000` to see your Docker container in action!
