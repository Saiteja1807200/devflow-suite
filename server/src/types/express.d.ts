import type { Role } from "../models/Membership.js";

declare global {
  namespace Express {
    interface Request {
      auth?: { userId: string; organizationId?: string; role?: Role };
    }
  }
}

export {};
