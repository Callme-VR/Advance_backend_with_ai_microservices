# ⚡ Phase Redis Backend (`phase-redis/backend`)

Welcome to the **Redis Caching & Performance Backend**! This module demonstrates how to accelerate API response times using **Redis Caching**, enforce strict API protection with **Redis Rate Limiting**, and run background tasks with **BullMQ**.

---

## 🎯 What is this module about?

1. **Redis Caching**: Benchmark database queries vs Redis cached responses (`HIT` vs `MISS`).
2. **Rate Limiting Middleware**: Prevent API abuse by limiting clients to **4 requests per minute** using Redis atomic counters.
3. **Prisma ORM & PostgreSQL**: Database access layer configured with Prisma schema.
4. **BullMQ Background Queues**: Asynchronous task processing for sending emails without blocking HTTP responses.

---

## 📊 Database vs Redis Cache Benchmark Flow

```
[ Request: GET /redis-users ]
              |
              v
     Check Redis Cache?
      /              \
  ( Cache HIT )   ( Cache MISS )
     /                \
Return Redis Data   Fetch from PostgreSQL Database
(0 - 5 ms)          (50 - 200 ms)
                            \
                    Save Data to Redis & Return
```

---

## 📂 File Structure Overview

| File / Folder | Purpose |
| :--- | :--- |
| [`index.ts`](file:///d:/Backend_Advanced_Revision/phase-redis/backend/index.ts) | Express server with `/db-users`, `/redis-users`, and `/redis-clear` endpoints. |
| [`middleware/ratelimit.ts`](file:///d:/Backend_Advanced_Revision/phase-redis/backend/middleware/ratelimit.ts) | Redis IP-based rate limiter middleware (4 requests / 60 sec). |
| [`queue.ts`](file:///d:/Backend_Advanced_Revision/phase-redis/backend/queue.ts) | BullMQ background email queue setup. |
| [`prisma/`](file:///d:/Backend_Advanced_Revision/phase-redis/backend/prisma) | Prisma database schema and migrations. |
| [`db/db.ts`](file:///d:/Backend_Advanced_Revision/phase-redis/backend/db/db.ts) | Prisma client instance wrapper. |

---

## 🔑 Environment Variables Setup

Create a `.env` file inside `phase-redis/backend/`:

```env
PORT=7000
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
REDIS_URL="redis://localhost:6379"
```

---

## ⚙️ How to Run Locally

### Step 1: Install Dependencies
```bash
bun install
```

### Step 2: Run Prisma Database Migrations
```bash
bunx prisma migrate dev --name init
```

### Step 3: Start Development Server
```bash
bun run index.ts
```
> Server starts at `http://localhost:7000`.

---

## 📡 API Reference

### 1. Fetch Users directly from PostgreSQL
- **Method:** `GET /db-users`
- **Rate Limited:** Yes
- **Response:**
  ```json
  {
    "source": "PostgreSQL",
    "time": "12.45 ms",
    "users": [...]
  }
  ```

### 2. Fetch Users with Redis Cache
- **Method:** `GET /redis-users`
- **Response (Cache HIT):**
  ```json
  {
    "source": "Redis",
    "cache": "HIT",
    "time": "1.12 ms",
    "users": [...]
  }
  ```

### 3. Clear Redis Cache
- **Method:** `GET /redis-clear`
- **Response:**
  ```json
  {
    "message": "Redis cache cleared"
  }
  ```

---

## 🛑 Rate Limiter Behavior

If you hit `/db-users` more than **4 times in 60 seconds**, Redis rate limiter returns:
- **HTTP Status:** `429 Too Many Requests`
- **Response:** `{"error": "Too many requests"}`
