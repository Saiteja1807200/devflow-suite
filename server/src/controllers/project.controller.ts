import type { RequestHandler } from "express";
import { ProjectModel } from "../models/Project.js";
import { TaskModel } from "../models/Task.js";
import { AppError } from "../utils/app-error.js";

export const listProjects: RequestHandler = async (request, response) => {
  const projects = await ProjectModel.find({ organizationId: request.auth!.organizationId, status: "active" }).sort({ updatedAt: -1 }).lean();
  response.json({ data: projects });
};

export const createProject: RequestHandler = async (request, response) => {
  const project = await ProjectModel.create({ ...request.body, organizationId: request.auth!.organizationId, leadId: request.auth!.userId, members: [request.auth!.userId] });
  response.status(201).json({ data: project });
};

export const getProject: RequestHandler = async (request, response) => {
  const project = await ProjectModel.findOne({ _id: request.params.projectId, organizationId: request.auth!.organizationId }).lean();
  if (!project) throw new AppError("Project not found.", 404, "PROJECT_NOT_FOUND");
  const tasks = await TaskModel.find({ projectId: project._id }).sort({ status: 1, position: 1 }).lean();
  response.json({ data: { project, tasks } });
};
