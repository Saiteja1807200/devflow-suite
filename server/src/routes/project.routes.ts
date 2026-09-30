import { Router } from "express";
import { createProject, getProject, listProjects } from "../controllers/project.controller.js";
import { createTask, updateTask } from "../controllers/task.controller.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import { createProjectSchema, createTaskSchema, updateTaskSchema } from "../validators/project.js";

export const projectRouter = Router();
projectRouter.use(authenticate);
projectRouter.get("/", asyncHandler(listProjects));
projectRouter.post("/", authorize("owner", "admin", "member"), validate(createProjectSchema), asyncHandler(createProject));
projectRouter.get("/:projectId", asyncHandler(getProject));
projectRouter.post("/:projectId/tasks", authorize("owner", "admin", "member"), validate(createTaskSchema), asyncHandler(createTask));

export const taskRouter = Router();
taskRouter.use(authenticate);
taskRouter.patch("/:taskId", authorize("owner", "admin", "member"), validate(updateTaskSchema), asyncHandler(updateTask));
