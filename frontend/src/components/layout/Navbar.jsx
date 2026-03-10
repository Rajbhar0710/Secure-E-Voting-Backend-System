import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar({ onOpenSidebar }) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
          aria-label="Open sidebar"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link to="/dashboard" className="text-lg font-semibold text-slate-900">
          Dashboard
        </Link>
      </div>

      <div className="relative hidden w-full max-w-sm md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search candidates, users..."
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex sm:flex-col sm:text-right">
          <span className="text-sm font-medium text-slate-800">{user?.name || 'Guest'}</span>
          <span className="text-xs text-slate-500">{user?.role || 'Visitor'}</span>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full bg-brand-500 text-center leading-10 text-sm font-semibold text-white">
          {user?.name?.charAt(0) ?? 'G'}
        </div>
      </div>
    </header>
  );
}
