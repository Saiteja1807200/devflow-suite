import type { ActivityEvent, ProjectMetric, Task, TeamMember } from "../types/domain";

export const teamMembers: TeamMember[] = [
  { id: "u1", name: "Maya Chen", role: "Owner", avatar: "MC", workload: 82, online: true },
  { id: "u2", name: "Arjun Rao", role: "Project Manager", avatar: "AR", workload: 76, online: true },
  { id: "u3", name: "Leah Stone", role: "Developer", avatar: "LS", workload: 64, online: false },
  { id: "u4", name: "Noah Kim", role: "Admin", avatar: "NK", workload: 58, online: true },
  { id: "u5", name: "Priya Shah", role: "Viewer", avatar: "PS", workload: 34, online: false }
];

export const projectMetrics: ProjectMetric[] = [
  { name: "Platform Core", progress: 78, tasks: 126, velocity: 42, health: "On Track" },
  { name: "Mobile API", progress: 54, tasks: 88, velocity: 31, health: "At Risk" },
  { name: "Billing Revamp", progress: 39, tasks: 71, velocity: 19, health: "Blocked" },
  { name: "Security Program", progress: 86, tasks: 43, velocity: 27, health: "On Track" }
];

export const tasks: Task[] = [
  { id: "DVF-124", title: "Design refresh-token rotation flow", project: "Platform Core", priority: "Critical", status: "Backlog", assignee: "Maya Chen", dueDate: "2026-08-06", estimate: 8, labels: ["security", "auth"] },
  { id: "DVF-132", title: "Add sprint burndown aggregation", project: "Analytics", priority: "High", status: "Todo", assignee: "Arjun Rao", dueDate: "2026-08-08", estimate: 5, labels: ["analytics"] },
  { id: "DVF-141", title: "Ship realtime Kanban lane updates", project: "Platform Core", priority: "Critical", status: "In Progress", assignee: "Leah Stone", dueDate: "2026-08-04", estimate: 13, labels: ["socket.io", "kanban"] },
  { id: "DVF-155", title: "Review Cloudinary signed upload policy", project: "Files", priority: "Medium", status: "Review", assignee: "Noah Kim", dueDate: "2026-08-10", estimate: 3, labels: ["files"] },
  { id: "DVF-162", title: "Validate organization invite acceptance", project: "IAM", priority: "High", status: "Testing", assignee: "Priya Shah", dueDate: "2026-08-09", estimate: 6, labels: ["rbac"] },
  { id: "DVF-170", title: "Finalize dashboard empty states", project: "UX", priority: "Low", status: "Done", assignee: "Maya Chen", dueDate: "2026-08-01", estimate: 2, labels: ["ui"] }
];

export const activities: ActivityEvent[] = [
  { id: "a1", actor: "Maya Chen", action: "assigned", target: "DVF-141 to Leah Stone", time: "2m ago" },
  { id: "a2", actor: "Arjun Rao", action: "started sprint", target: "Platform Core Sprint 18", time: "18m ago" },
  { id: "a3", actor: "Noah Kim", action: "uploaded", target: "Security review.pdf", time: "42m ago" },
  { id: "a4", actor: "Priya Shah", action: "commented on", target: "DVF-162", time: "1h ago" }
];

export const productivity = [
  { month: "Mar", completed: 118, opened: 132 },
  { month: "Apr", completed: 141, opened: 149 },
  { month: "May", completed: 156, opened: 143 },
  { month: "Jun", completed: 172, opened: 166 },
  { month: "Jul", completed: 189, opened: 171 },
  { month: "Aug", completed: 76, opened: 68 }
];