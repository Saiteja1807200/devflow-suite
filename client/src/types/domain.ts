export type Role = "Owner" | "Admin" | "Project Manager" | "Developer" | "Viewer";
export type Priority = "Low" | "Medium" | "High" | "Critical";
export type TaskStatus = "Backlog" | "Todo" | "In Progress" | "Review" | "Testing" | "Done";

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  workload: number;
  online: boolean;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  priority: Priority;
  status: TaskStatus;
  assignee: string;
  dueDate: string;
  estimate: number;
  labels: string[];
}

export interface ProjectMetric {
  name: string;
  progress: number;
  tasks: number;
  velocity: number;
  health: "On Track" | "At Risk" | "Blocked";
}

export interface ActivityEvent {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
}