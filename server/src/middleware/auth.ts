import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

type TokenPayload = { sub: string; organizationId?: string; role?: string };

export const authenticate: RequestHandler = (request, _response, next) => {
  const token = request.cookies?.accessToken ?? request.header("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return next(new AppError("Authentication is required.", 401, "UNAUTHENTICATED"));
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
    request.auth = { userId: payload.sub, organizationId: payload.organizationId, role: payload.role as never };
    next();
  } catch {
    next(new AppError("Your session has expired. Please sign in again.", 401, "INVALID_TOKEN"));
  }
};
