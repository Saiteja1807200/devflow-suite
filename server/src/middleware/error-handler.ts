import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error.js";
import { logger } from "../utils/logger.js";

export const notFound: RequestHandler = (request, _response, next) => next(new AppError(`Route ${request.method} ${request.path} was not found.`, 404, "NOT_FOUND"));

export const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  const appError = error instanceof AppError
    ? error
    : error instanceof ZodError
      ? new AppError(error.issues.map((issue) => issue.message).join(" "), 422, "VALIDATION_ERROR")
      : new AppError("An unexpected error occurred.");
  logger.error({ message: error.message, stack: error.stack, method: request.method, path: request.path });
  response.status(appError.statusCode).json({ error: { code: appError.code, message: appError.message } });
};
