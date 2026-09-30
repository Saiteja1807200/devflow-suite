import { Schema, model } from "mongoose";

export const NotificationModel = model("Notification", new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  href: { type: String, default: null },
  readAt: { type: Date, default: null },
}, { timestamps: true }));
