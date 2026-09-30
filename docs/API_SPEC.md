# REST API Specification

Base path: `/api/v1`. Successful responses are wrapped as `{ "data": ... }`; failures are `{ "error": { "code", "message" } }`.

| Method | Route | Access | Purpose |
|---|---|---|---|
| GET | `/health` | public | Service status |
| POST | `/auth/register` | public | Create user and organization |
| POST | `/auth/login` | public | Start session cookie |
| POST | `/auth/logout` | public | End session |
| GET | `/auth/me` | member | Read active identity |
| GET | `/projects` | member | List organization projects |
| POST | `/projects` | owner/admin/member | Create project |
| GET | `/projects/:projectId` | member | Project with board tasks |
| POST | `/projects/:projectId/tasks` | owner/admin/member | Create task |
| PATCH | `/tasks/:taskId` | owner/admin/member | Update/reorder task |
| GET | `/dashboard` | member | Aggregated delivery metrics |

Interactive OpenAPI documentation is exposed at `/api/docs`. Future endpoints will follow the same response and authorization conventions.
