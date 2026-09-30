import { Bell, CalendarDays, Command, KanbanSquare, Moon, Search, ShieldCheck, Sun, Users } from "lucide-react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useAppStore } from "../store/appStore";

const navItems = [
  { label: "Dashboard", icon: KanbanSquare },
  { label: "Teams", icon: Users },
  { label: "Calendar", icon: CalendarDays },
  { label: "Security", icon: ShieldCheck }
];

export function AppLayout() {
  const { activeOrganization, commandOpen, setCommandOpen, theme, toggleTheme } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setCommandOpen, theme]);

  return (
    <div className="min-h-screen bg-[#f5f7f2] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white/90 px-5 py-6 backdrop-blur dark:border-slate-800 dark:bg-slate-950/92 lg:block">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-sm font-black text-white dark:bg-mint dark:text-slate-950">DF</div>
          <div>
            <p className="text-lg font-black tracking-tight">DevFlow</p>
            <p className="text-xs text-slate-500">Enterprise collaboration</p>
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase text-slate-500">Organization</p>
          <p className="mt-1 font-semibold">{activeOrganization}</p>
        </div>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white">
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/86 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase text-ocean dark:text-mint">Production workspace</p>
              <h1 className="truncate text-xl font-black tracking-tight sm:text-2xl">Enterprise Project Management & Team Collaboration Platform</h1>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button aria-label="Open command palette" onClick={() => setCommandOpen(true)} className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:text-slate-300 sm:flex">
                <Command className="h-4 w-4" /> Ctrl K
              </button>
              <button aria-label="Search" className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 dark:border-slate-800"><Search className="h-4 w-4" /></button>
              <button aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 dark:border-slate-800"><Bell className="h-4 w-4" /></button>
              <button aria-label="Toggle theme" onClick={toggleTheme} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 dark:border-slate-800">{theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</button>
            </div>
          </div>
        </header>
        <Outlet />
      </div>

      <AnimatePresence>
        {commandOpen ? (
          <motion.div className="fixed inset-0 z-40 grid place-items-start bg-slate-950/40 px-4 pt-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCommandOpen(false)}>
            <motion.div className="mx-auto w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-3 shadow-panel dark:border-slate-800 dark:bg-slate-950" initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} onClick={(event) => event.stopPropagation()}>
              <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                <Search className="h-4 w-4 text-slate-500" />
                <input autoFocus className="w-full bg-transparent py-2 outline-none" placeholder="Search projects, tasks, people, comments..." />
              </div>
              <div className="grid gap-2 p-2 text-sm">
                {["Create project", "Invite member", "Open sprint report", "Review audit logs"].map((command) => (
                  <button key={command} className="rounded-lg px-3 py-2 text-left font-semibold hover:bg-slate-100 dark:hover:bg-slate-900">{command}</button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}