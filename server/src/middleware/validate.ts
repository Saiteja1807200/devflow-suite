import type { RequestHandler } from "express";
import type { ZodTypeAny } from "zod";
import { AppError } from "../utils/app-error.js";

export const validate = (schema: ZodTypeAny): RequestHandler => (request, _response, next) => {
  const parsed = schema.safeParse({ body: request.body, params: request.params, query: request.query });
  if (!parsed.success) {
    return next(new AppError(parsed.error.issues.map((issue) => issue.message).join(" "), 422, "VALIDATION_ERROR"));
  }
  Object.assign(request, parsed.data);
  next();
};
