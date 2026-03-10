import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Vote', to: '/vote' },
  { label: 'Candidates', to: '/candidates' },
  { label: 'Results', to: '/results' },
  { label: 'Profile', to: '/profile' },
];

export default function Sidebar({ onLogout }) {
  const { user } = useAuth();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:pt-6 lg:border-r lg:border-slate-200 lg:bg-white">
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-slate-900">Secure E-Vote</div>
            <div className="text-xs text-slate-500">Admin panel</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white shadow'
                  : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-6 border-t border-slate-200">
        <div className="text-xs font-semibold text-slate-500">Signed in as</div>
        <div className="mt-2 text-sm font-medium text-slate-800">{user?.name || 'Guest'}</div>
        <button
          onClick={onLogout}
          className="mt-3 w-full rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
