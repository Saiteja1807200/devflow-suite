# Data Model

```mermaid
erDiagram
  USER ||--o{ MEMBERSHIP : belongs_to
  ORGANIZATION ||--o{ MEMBERSHIP : has
  ORGANIZATION ||--o{ PROJECT : owns
  PROJECT ||--o{ TASK : contains
  PROJECT ||--o{ SPRINT : schedules
  USER ||--o{ TASK : reports_or_assigned
  USER ||--o{ NOTIFICATION : receives
  ORGANIZATION ||--o{ AUDIT_LOG : records
```

| Collection | Key fields | Important indexes |
|---|---|---|
| Users | email, passwordHash, profile | unique `email` |
| Organizations | name, slug, ownerId | unique `slug` |
| Memberships | organizationId, userId, role | unique compound organization/user |
| Projects | organizationId, key, leadId | unique compound organization/key |
| Tasks | projectId, number, status, position | unique project/number; board ordering |
| Sprints | projectId, dates, status | project/status |
| Notifications | userId, readAt | user/read state |
| AuditLogs | organizationId, actorId, action | organization/time |

All tenant-owned collections carry an `organizationId` or are reachable through an organization-scoped parent. That boundary must remain mandatory in every new query.
