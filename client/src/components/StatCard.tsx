import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  icon: ReactNode;
}

export function StatCard({ label, value, delta, icon }: StatCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-ocean dark:bg-slate-800 dark:text-mint">{icon}</div>
      </div>
      <p className="mt-4 text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-1 text-sm font-semibold text-mint">{delta}</p>
    </article>
  );
}