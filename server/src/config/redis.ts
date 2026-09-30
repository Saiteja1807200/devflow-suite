import { Redis } from "ioredis";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export function createRedisClient(): Redis | null {
  if (!env.REDIS_URL) {
    logger.warn("REDIS_URL is missing. Cache and queue features will run in memory.");
    return null;
  }

  const client = new Redis(env.REDIS_URL, { lazyConnect: true, maxRetriesPerRequest: 2 });
  client.on("error", (error: Error) => logger.error("Redis error", { error }));
  return client;
}
