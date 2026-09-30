import type { Task, TaskStatus } from "../types/domain";

const statuses: TaskStatus[] = ["Backlog", "Todo", "In Progress", "Review", "Testing", "Done"];
const priorityTone: Record<Task["priority"], string> = {
  Low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  Medium: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  High: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  Critical: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200"
};

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-black">Realtime Kanban</h2>
          <p className="text-sm text-slate-500">Socket.IO-ready lanes for live project execution.</p>
        </div>
      </div>
      <div className="grid gap-3 overflow-x-auto p-4 lg:grid-cols-6">
        {statuses.map((status) => {
          const laneTasks = tasks.filter((task) => task.status === status);
          return (
            <div key={status} className="min-h-72 min-w-56 rounded-lg bg-slate-50 p-3 dark:bg-slate-950/70">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-black">{status}</h3>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-500 dark:bg-slate-900">{laneTasks.length}</span>
              </div>
              <div className="space-y-3">
                {laneTasks.map((task) => (
                  <article key={task.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-xs font-black text-ocean dark:text-mint">{task.id}</p>
                    <h4 className="mt-1 text-sm font-bold leading-snug">{task.title}</h4>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className={`rounded-full px-2 py-1 text-[11px] font-black ${priorityTone[task.priority]}`}>{task.priority}</span>
                      <span className="text-xs font-semibold text-slate-500">{task.estimate}h</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}