import { Schema, model, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    key: { type: String, required: true, uppercase: true, trim: true, maxlength: 12 },
    description: { type: String, default: "", maxlength: 2000 },
    leadId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["active", "archived"], default: "active" },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);
projectSchema.index({ organizationId: 1, key: 1 }, { unique: true });

export type Project = InferSchemaType<typeof projectSchema>;
export const ProjectModel = model("Project", projectSchema);
