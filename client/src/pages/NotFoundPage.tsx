export function NotFoundPage() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <div className="text-center">
        <p className="text-sm font-bold uppercase text-ocean dark:text-mint">404</p>
        <h2 className="mt-2 text-3xl font-black">Workspace view not found</h2>
        <p className="mt-3 text-slate-500">The requested DevFlow workspace route does not exist.</p>
      </div>
    </main>
  );
}