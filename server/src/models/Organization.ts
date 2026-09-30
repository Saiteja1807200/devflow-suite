import { Schema, model, type InferSchemaType } from "mongoose";

const organizationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    logoUrl: { type: String, default: null },
    plan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
  },
  { timestamps: true },
);

export type Organization = InferSchemaType<typeof organizationSchema>;
export const OrganizationModel = model("Organization", organizationSchema);
