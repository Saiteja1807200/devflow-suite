import { Schema, model, type InferSchemaType } from "mongoose";

export const roles = ["owner", "admin", "member", "viewer"] as const;
export type Role = (typeof roles)[number];

const membershipSchema = new Schema(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    role: { type: String, enum: roles, default: "member" },
  },
  { timestamps: true },
);
membershipSchema.index({ organizationId: 1, userId: 1 }, { unique: true });

export type Membership = InferSchemaType<typeof membershipSchema>;
export const MembershipModel = model("Membership", membershipSchema);
