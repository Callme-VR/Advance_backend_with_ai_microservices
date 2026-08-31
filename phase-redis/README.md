# ⚡ Module: Redis Caching & Queue Architecture (`phase-redis`)

Welcome to the **Redis Architecture Module**! This module covers high-performance caching, database acceleration with Prisma & PostgreSQL, custom rate-limiting middleware, and background queues using BullMQ.

---

## 🎯 Workspace Overview

```
phase-redis/
├── backend/             # Express API + Prisma ORM + Redis Cache + BullMQ Queue
│   ├── index.ts         # Main API server entry point
│   ├── middleware/      # Custom Redis IP rate limiter (4 req / min)
│   ├── queue.ts         # BullMQ queue service configuration
│   └── prisma/          # PostgreSQL database schema & migrations
└── frontend/            # Client interface for testing Redis performance
```

---

## 💡 Key Features Covered

1. **In-Memory Caching**: Reduce API response times from ~15ms to ~1ms by caching database results in Redis.
2. **Atomic Counter Rate Limiting**: Enforce request throttles using Redis `INCR` and `EXPIRE` commands.
3. **Asynchronous Task Queues**: Delegate CPU-intensive or slow operations (e.g. sending emails) to **BullMQ** workers.
4. **Cache Invalidation Strategies**: Purge and rebuild stale Redis cache keys dynamically.

---

## 🚀 Quick Setup Guide

For full instructions, environment variable setup, and API documentation, please refer to the backend guide:
👉 **[Read the Backend Documentation](file:///d:/Backend_Advanced_Revision/phase-redis/backend/README.md)**
