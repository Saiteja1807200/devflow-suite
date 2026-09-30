import type { RequestHandler } from "express";
import type { Role } from "../models/Membership.js";
import { AppError } from "../utils/app-error.js";

export const authorize = (...allowedRoles: Role[]): RequestHandler => (request, _response, next) => {
  if (!request.auth?.role || !allowedRoles.includes(request.auth.role)) {
    return next(new AppError("You do not have permission for this action.", 403, "FORBIDDEN"));
  }
  next();
};
