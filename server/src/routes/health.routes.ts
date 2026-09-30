import { Router } from "express";
import mongoose from "mongoose";

export const healthRouter = Router();
healthRouter.get("/", (_request, response) => response.json({ data: { status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected", timestamp: new Date().toISOString() } }));
