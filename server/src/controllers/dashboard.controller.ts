import type { RequestHandler } from "express";
import { ProjectModel } from "../models/Project.js";
import { TaskModel } from "../models/Task.js";

export const getDashboard: RequestHandler = async (request, response) => {
  const organizationId = request.auth!.organizationId;
  const [projects, assigned, completed, overdue] = await Promise.all([
    ProjectModel.countDocuments({ organizationId, status: "active" }),
    TaskModel.countDocuments({ organizationId, assigneeId: request.auth!.userId, status: { $ne: "done" } }),
    TaskModel.countDocuments({ organizationId, status: "done" }),
    TaskModel.countDocuments({ organizationId, dueDate: { $lt: new Date() }, status: { $ne: "done" } }),
  ]);
  response.json({ data: { metrics: { projects, assigned, completed, overdue } } });
};
