import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../config/env.js";

let io: Server | undefined;

export function initializeSockets(server: HttpServer) {
  io = new Server(server, { cors: { origin: env.CLIENT_URL, credentials: true } });
  io.on("connection", (socket) => {
    socket.on("organization:join", (organizationId: string) => socket.join(`organization:${organizationId}`));
    socket.on("organization:leave", (organizationId: string) => socket.leave(`organization:${organizationId}`));
  });
  return io;
}

export function emitToOrganization(organizationId: string, event: string, payload: unknown) {
  io?.to(`organization:${organizationId}`).emit(event, payload);
}
