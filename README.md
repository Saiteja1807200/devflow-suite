# DevFlow Suite

> A full-stack MERN workspace for teams to plan projects, manage tasks, collaborate in real time, and track delivery progress.

DevFlow Suite is an organization-aware project management platform built with React, TypeScript, Node.js, Express, MongoDB, Redis, and Socket.IO. It gives software teams a focused place to organize work from project planning through task delivery.

## Highlights

- Manage projects and tasks with an accessible Kanban workflow.
- Create secure organization workspaces with role-based access control.
- Track delivery metrics, workload, sprint velocity, and recent activity from a responsive dashboard.
- Receive real-time task updates through Socket.IO organization channels.
- Use a documented API with validation, security middleware, structured logging, and Swagger.

## Technology

| Layer | Tools |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, TanStack Query, Zustand, Recharts |
| Backend | Node.js, Express, TypeScript, JWT, Socket.IO, Zod |
| Data | MongoDB, Mongoose, Redis |
| Quality and delivery | Vitest, Docker Compose, GitHub Actions |

## What is included

- Typed React dashboard with a Kanban view, analytics, command palette, dark mode, and responsive navigation.
- Express API with validation, JWT session cookies, rate limiting, security headers, structured logging, API docs, and realtime organization events.
- MongoDB models for users, organizations, memberships, projects, tasks, sprints, notifications, and audit logs.
- Initial RBAC roles: owner, admin, member, and viewer.
- Documentation for the product, architecture, data model, REST contract, UI direction, and roadmap.

## Run locally

Prerequisites: Node.js 20+, MongoDB, and Redis.

```powershell
Copy-Item server\.env.example server\.env
npm install
npm run dev
```

Open `http://127.0.0.1:5173` for the client and `http://127.0.0.1:4000/api/docs` for Swagger.

## Quality commands

```powershell
npm run typecheck
npm run test
npm run build
```

## Documentation

- [Product requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Data model](docs/DATA_MODEL.md)
- [API specification](docs/API_SPEC.md)
- [UI wireframes](docs/UI_WIREFRAMES.md)
- [Roadmap](docs/ROADMAP.md)
- [Deployment guide](docs/DEPLOYMENT.md)

## Environment

Never commit `server/.env`. Generate long random JWT secrets before deploying, enable HTTPS, set a production `CLIENT_URL`, and configure MongoDB/Redis backups.
