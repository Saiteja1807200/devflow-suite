import { useQuery } from "@tanstack/react-query";
import { Activity, CheckCircle2, Clock3, FolderKanban, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KanbanBoard } from "../components/KanbanBoard";
import { StatCard } from "../components/StatCard";
import { getApiHealth } from "../services/api";
import { activities, productivity, projectMetrics, tasks, teamMembers } from "../services/mockData";

export function DashboardPage() {
  const healthQuery = useQuery({ queryKey: ["health"], queryFn: getApiHealth });

  return (
    <main className="space-y-6 px-4 py-6 sm:px-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active projects" value="24" delta="+12% this month" icon={<FolderKanban className="h-4 w-4" />} />
        <StatCard label="Team members" value="148" delta="9 online now" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Completed tasks" value="1,284" delta="189 in July" icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Pending tasks" value="342" delta="41 due this week" icon={<Clock3 className="h-4 w-4" />} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-black">Productivity Analytics</h2>
              <p className="text-sm text-slate-500">Completed versus opened tasks across the current release cycle.</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">API {healthQuery.data?.status ?? "checking"}</span>
          </div>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d9e0dc" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#207a8a" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="opened" stroke="#ff7b72" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-black">Sprint Velocity</h2>
          <p className="text-sm text-slate-500">Velocity by strategic project stream.</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d9e0dc" />
                <XAxis dataKey="name" hide />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="velocity" fill="#3dbb91" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <KanbanBoard tasks={tasks} />
        <aside className="space-y-6">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-black">Workload</h2>
            <div className="mt-4 space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-xs font-black dark:bg-slate-800">{member.avatar}</span>
                      <div>
                        <p className="text-sm font-bold">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <span className={member.online ? "h-2.5 w-2.5 rounded-full bg-mint" : "h-2.5 w-2.5 rounded-full bg-slate-300"} />
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-ocean dark:bg-mint" style={{ width: `${member.workload}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-ocean dark:text-mint" />
              <h2 className="text-lg font-black">Recent Activity</h2>
            </div>
            <div className="mt-4 space-y-3">
              {activities.map((event) => (
                <div key={event.id} className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-950/70">
                  <p><span className="font-bold">{event.actor}</span> {event.action} <span className="font-bold">{event.target}</span></p>
                  <p className="mt-1 text-xs text-slate-500">{event.time}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}