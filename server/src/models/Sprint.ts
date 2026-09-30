import { Schema, model } from "mongoose";

export const SprintModel = model("Sprint", new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
  name: { type: String, required: true, trim: true },
  goal: { type: String, default: "" },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["planned", "active", "completed"], default: "planned" },
}, { timestamps: true }));
