import { createServer } from "node:http";
import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { createRedisClient } from "./config/redis.js";
import { initializeSockets } from "./sockets/index.js";
import { logger } from "./utils/logger.js";

const server = createServer(app);
initializeSockets(server);

async function start() {
  await connectDatabase(env.MONGODB_URI);
  const redis = createRedisClient();
  if (redis) await redis.connect();
  server.listen(env.PORT, () => logger.info({ message: `DevFlow API listening on port ${env.PORT}` }));
}

start().catch((error) => {
  logger.error({ message: "Unable to start API", error });
  process.exit(1);
});
