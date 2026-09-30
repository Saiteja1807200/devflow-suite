import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export async function connectDatabase(uri?: string): Promise<void> {
  if (!uri) {
    logger.warn("MONGODB_URI is missing. API will start without a database connection.");
    return;
  }

  mongoose.connection.on("connected", () => logger.info("MongoDB connected"));
  mongoose.connection.on("error", (error) => logger.error("MongoDB connection error", { error }));

  await mongoose.connect(uri, {
    autoIndex: true
  });
}