import type { RequestHandler } from "express";
import { login, register } from "../services/auth.service.js";

const cookieOptions = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", maxAge: 1000 * 60 * 15 };

export const registerController: RequestHandler = async (request, response) => {
  const result = await register(request.body);
  response.cookie("accessToken", result.token, cookieOptions).status(201).json({
    data: { user: { id: result.user.id, name: result.user.name, email: result.user.email }, organization: { id: result.organization.id, name: result.organization.name, slug: result.organization.slug } },
  });
};

export const loginController: RequestHandler = async (request, response) => {
  const result = await login(request.body);
  response.cookie("accessToken", result.token, cookieOptions).json({ data: { user: { id: result.user.id, name: result.user.name, email: result.user.email }, organizationId: result.organizationId, role: result.role } });
};

export const logoutController: RequestHandler = (_request, response) => {
  response.clearCookie("accessToken", cookieOptions).status(204).send();
};

export const meController: RequestHandler = async (request, response) => {
  response.json({ data: { userId: request.auth?.userId, organizationId: request.auth?.organizationId, role: request.auth?.role } });
};
