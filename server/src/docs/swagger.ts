import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: { title: "DevFlow API", version: "1.0.0", description: "Organization-aware project management API." },
    servers: [{ url: "/api/v1" }],
    components: { securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } } },
    paths: {
      "/health": { get: { summary: "Health check", responses: { "200": { description: "Service status" } } } },
      "/auth/register": { post: { summary: "Create an account and organization", responses: { "201": { description: "Account created" } } } },
      "/auth/login": { post: { summary: "Start a session", responses: { "200": { description: "Session created" } } } },
      "/projects": { get: { summary: "List organization projects", security: [{ bearerAuth: [] }], responses: { "200": { description: "Projects" } } } },
    },
  },
  apis: [],
});
