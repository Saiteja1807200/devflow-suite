import { Schema, model } from "mongoose";

export const AuditLogModel = model("AuditLog", new Schema({
  organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
  actorId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true }));
