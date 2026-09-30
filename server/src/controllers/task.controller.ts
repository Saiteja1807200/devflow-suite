import type { RequestHandler } from "express";
import { ProjectModel } from "../models/Project.js";
import { TaskModel } from "../models/Task.js";
import { AppError } from "../utils/app-error.js";
import { emitToOrganization } from "../sockets/index.js";

export const createTask: RequestHandler = async (request, response) => {
  const project = await ProjectModel.findOne({ _id: request.params.projectId, organizationId: request.auth!.organizationId });
  if (!project) throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  const lastTask = await TaskModel.findOne({ projectId: project._id }).sort({ number: -1 }).select("number position").lean();
  const task = await TaskModel.create({ ...request.body, projectId: project._id, organizationId: request.auth!.organizationId, reporterId: request.auth!.userId, number: (lastTask?.number ?? 0) + 1, position: (lastTask?.position ?? 0) + 1, dueDate: request.body.dueDate ? new Date(request.body.dueDate) : null });
  emitToOrganization(request.auth!.organizationId!, "task:created", task);
  response.status(201).json({ data: task });
};

export const updateTask: RequestHandler = async (request, response) => {
  const update = { ...request.body, ...(request.body.dueDate !== undefined ? { dueDate: request.body.dueDate ? new Date(request.body.dueDate) : null } : {}) };
  const task = await TaskModel.findOneAndUpdate({ _id: request.params.taskId, organizationId: request.auth!.organizationId }, update, { new: true, runValidators: true });
  if (!task) throw new AppError("Task not found.", 404, "TASK_NOT_FOUND");
  emitToOrganization(request.auth!.organizationId!, "task:updated", task);
  response.json({ data: task });
};
