import express from "express";
import { prisma } from "./db/db";
import Redis from "ioredis";
import dotenv from "dotenv";
import ratelimitter from "./middleware/ratelimit";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7000;

export const redis = new Redis(process.env.REDIS_URL!);

redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

// --------------------------------------------------
// PostgreSQL / Prisma
// --------------------------------------------------

app.get("/db-users", ratelimitter, async (req, res) => {
  const start = performance.now();

  try {
    const users = await prisma.user.findMany();

    // for old user delete and fetch all user using this function 
    await redis.del("users:all")

    const end = performance.now();

    return res.json({
      source: "PostgreSQL",
      time: `${(end - start).toFixed(2)} ms`,
      users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch users from database",
    });
  }
});

// --------------------------------------------------
// Redis
// --------------------------------------------------

app.get("/redis-users", async (req, res) => {
  const start = performance.now();

  try {
    const cached = await redis.get("users:all");

    if (cached) {
      const end = performance.now();

      return res.json({
        source: "Redis",
        cache: "HIT",
        time: `${(end - start).toFixed(2)} ms`,
        users: JSON.parse(cached),
      });
    }

    // Cache miss → fetch from PostgreSQL
    const users = await prisma.user.findMany();

    await redis.set(
      "users:all",
      JSON.stringify(users)
    );

    const end = performance.now();

    return res.json({
      source: "Redis",
      cache: "MISS",
      time: `${(end - start).toFixed(2)} ms`,
      users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch users",
    });
  }
});

// --------------------------------------------------
// Clear Redis cache
// --------------------------------------------------

app.get("/redis-clear", async (req, res) => {
  await redis.del("users:all");

  return res.json({
    message: "Redis cache cleared",
  });
});

// --------------------------------------------------
// Start server
// --------------------------------------------------

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);

    process.exit(1);
  }
}

startServer(); 