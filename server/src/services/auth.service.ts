import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { MembershipModel } from "../models/Membership.js";
import { OrganizationModel } from "../models/Organization.js";
import { UserModel } from "../models/User.js";
import { AppError } from "../utils/app-error.js";

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const signAccessToken = (userId: string, organizationId?: string, role?: string) =>
  jwt.sign({ sub: userId, organizationId, role }, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL as jwt.SignOptions["expiresIn"] });

export async function register(input: { name: string; email: string; password: string; organizationName: string }) {
  const existing = await UserModel.exists({ email: input.email.toLowerCase() });
  if (existing) throw new AppError("An account already exists for this email.", 409, "EMAIL_TAKEN");
  const user = await UserModel.create({ name: input.name, email: input.email.toLowerCase(), passwordHash: await bcrypt.hash(input.password, 12) });
  const baseSlug = slugify(input.organizationName);
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;
  const organization = await OrganizationModel.create({ name: input.organizationName, slug, ownerId: user._id });
  const membership = await MembershipModel.create({ organizationId: organization._id, userId: user._id, role: "owner" });
  return { user, organization, token: signAccessToken(user.id, organization.id, membership.role) };
}

export async function login(input: { email: string; password: string }) {
  const user = await UserModel.findOne({ email: input.email.toLowerCase() }).select("+passwordHash");
  if (!user || !user.isActive || !(await bcrypt.compare(input.password, user.passwordHash))) {
    throw new AppError("Email or password is incorrect.", 401, "INVALID_CREDENTIALS");
  }
  const membership = await MembershipModel.findOne({ userId: user._id }).sort({ createdAt: 1 });
  if (!membership) throw new AppError("This account has no organization membership.", 403, "NO_ORGANIZATION");
  user.lastLoginAt = new Date();
  await user.save();
  return { user, organizationId: membership.organizationId.toString(), role: membership.role, token: signAccessToken(user.id, membership.organizationId.toString(), membership.role) };
}
