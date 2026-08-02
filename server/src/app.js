import cors from "cors";
import express from "express";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "http://localhost:5173"
  })
);
app.use(express.json());

app.use("/api/health", healthRoutes);

app.use((request, response) => {
  response.status(404).json({ message: `Route not found: ${request.originalUrl}` });
});

export default app;
