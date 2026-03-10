export default function DashboardCard({ title, value, icon, color = 'bg-brand-500', children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} text-white`}>{icon}</div>
      </div>
      {children && <div className="mt-4 text-sm text-slate-500">{children}</div>}
    </div>
  );
}
