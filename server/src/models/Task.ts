import { Schema, model, type InferSchemaType } from "mongoose";

export const taskStatuses = ["backlog", "todo", "in_progress", "in_review", "done"] as const;
export const taskPriorities = ["low", "medium", "high", "urgent"] as const;

const taskSchema = new Schema(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    number: { type: Number, required: true },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    description: { type: String, default: "", maxlength: 10000 },
    status: { type: String, enum: taskStatuses, default: "backlog", index: true },
    priority: { type: String, enum: taskPriorities, default: "medium" },
    assigneeId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    reporterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sprintId: { type: Schema.Types.ObjectId, ref: "Sprint", default: null },
    labels: [{ type: String, trim: true, maxlength: 32 }],
    dueDate: { type: Date, default: null },
    position: { type: Number, default: 0 },
  },
  { timestamps: true },
);
taskSchema.index({ projectId: 1, number: 1 }, { unique: true });
taskSchema.index({ projectId: 1, status: 1, position: 1 });

export type Task = InferSchemaType<typeof taskSchema>;
export const TaskModel = model("Task", taskSchema);
