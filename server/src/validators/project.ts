import { z } from "zod";
import { taskPriorities, taskStatuses } from "../models/Task.js";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid resource identifier.");

export const createProjectSchema = z.object({ body: z.object({
  name: z.string().trim().min(2).max(120),
  key: z.string().trim().toUpperCase().regex(/^[A-Z][A-Z0-9]{1,11}$/),
  description: z.string().max(2000).optional(),
}) });

export const createTaskSchema = z.object({ body: z.object({
  title: z.string().trim().min(2).max(180),
  description: z.string().max(10000).optional(),
  status: z.enum(taskStatuses).optional(),
  priority: z.enum(taskPriorities).optional(),
  assigneeId: objectId.nullable().optional(),
  labels: z.array(z.string().trim().min(1).max(32)).max(12).optional(),
  dueDate: z.string().datetime().nullable().optional(),
}), params: z.object({ projectId: objectId }) });

export const updateTaskSchema = z.object({ body: z.object({
  title: z.string().trim().min(2).max(180).optional(),
  description: z.string().max(10000).optional(),
  status: z.enum(taskStatuses).optional(),
  priority: z.enum(taskPriorities).optional(),
  assigneeId: objectId.nullable().optional(),
  labels: z.array(z.string().trim().min(1).max(32)).max(12).optional(),
  dueDate: z.string().datetime().nullable().optional(),
  position: z.number().finite().nonnegative().optional(),
}), params: z.object({ taskId: objectId }) });
