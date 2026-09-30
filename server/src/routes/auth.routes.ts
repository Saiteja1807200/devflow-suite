import { Router } from "express";
import { loginController, logoutController, meController, registerController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import { loginSchema, registerSchema } from "../validators/auth.js";

export const authRouter = Router();
authRouter.post("/register", validate(registerSchema), asyncHandler(registerController));
authRouter.post("/login", validate(loginSchema), asyncHandler(loginController));
authRouter.post("/logout", logoutController);
authRouter.get("/me", authenticate, asyncHandler(meController));
