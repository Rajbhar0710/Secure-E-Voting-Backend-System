import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../../hooks/useAuth';

export default function Layout() {
  const navigate = useNavigate();
  const { token, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !token) {
      navigate('/login');
    }
  }, [token, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <div className="text-sm font-medium text-slate-600">Loading</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onOpenSidebar={() => setMobileOpen(true)} />
      <div className="flex">
        <Sidebar onLogout={handleLogout} />

        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-slate-900/40" onClick={() => setMobileOpen(false)} />
            <div className="relative z-50 w-72 bg-white p-6">
              <button
                type="button"
                className="mb-4 inline-flex items-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                onClick={() => setMobileOpen(false)}
              >
                Close
              </button>
              <Sidebar onLogout={handleLogout} />
            </div>
          </div>
        )}

        <main className="flex-1 p-6 lg:pl-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
