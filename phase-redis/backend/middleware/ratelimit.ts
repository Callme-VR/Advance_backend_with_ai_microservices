import { redis } from "../index"

const ratelimitter = async (req: any, res: any, next: any) => {
  const ip = req.ip
  const key = `rate_limit:${ip}`
  const requiest = await redis.incr(key)

  if (requiest === 1) {
    await redis.expire(key, 60)
  }

  if (requiest > 4) {
    return res.status(429).json({ error: "Too many requests" })
  }
  next()
}

export default ratelimitter
