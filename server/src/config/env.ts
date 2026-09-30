import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  MONGODB_URI: z.string().optional(),
  REDIS_URL: z.string().optional(),
  JWT_ACCESS_SECRET: z.string().min(24).default("devflow-local-access-secret-change-me"),
  JWT_REFRESH_SECRET: z.string().min(24).default("devflow-local-refresh-secret-change-me"),
  ACCESS_TOKEN_TTL: z.string().default("15m"),
  COOKIE_SECRET: z.string().min(24).default("devflow-local-cookie-secret-change-me"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional()
});

export type AppEnv = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv): AppEnv {
  return envSchema.parse(source);
}

export const env = loadEnv(process.env);
