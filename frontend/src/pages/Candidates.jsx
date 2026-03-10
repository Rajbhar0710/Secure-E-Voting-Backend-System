import { useEffect, useState } from 'react';
import api from '../services/api';
import { getProfile } from '../services/auth';

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', party: '', age: '' });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, candidatesRes] = await Promise.all([getProfile(), api.get('/candidates')]);
        setUser(profileRes.user);
        setCandidates(candidatesRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const refreshCandidates = async () => {
    const response = await api.get('/candidates');
    setCandidates(response.data || []);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      await api.post('/candidates', { ...form, age: Number(form.age) });
      setForm({ name: '', party: '', age: '' });
      await refreshCandidates();
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to add candidate');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this candidate?')) return;
    try {
      await api.delete(`/candidates/${id}`);
      await refreshCandidates();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (candidate) => {
    const name = window.prompt('Update candidate name', candidate.name);
    if (!name) return;
    const party = window.prompt('Update candidate party', candidate.party);
    if (!party) return;

    try {
      await api.put(`/candidates/${candidate._id}`, { name, party, age: candidate.age });
      await refreshCandidates();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 shadow">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          <span className="text-sm font-medium text-slate-700">Loading candidates…</span>
        </div>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Candidates</h1>
        <p className="mt-2 text-sm text-slate-500">You need admin access to manage candidates.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Manage candidates</h1>
          <p className="mt-1 text-sm text-slate-500">Create, update and remove candidates from the election.</p>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Add new candidate</h2>
          <form className="mt-4 space-y-4" onSubmit={handleAdd}>
            <div>
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Party</label>
              <input
                name="party"
                value={form.party}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Age</label>
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                type="number"
                min="18"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            {error && <div className="rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Create candidate'}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Current candidates</h2>
            <span className="text-xs font-medium text-slate-500">{candidates.length} total</span>
          </div>
          <div className="mt-5 space-y-3">
            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-900">{candidate.name}</div>
                  <div className="text-xs text-slate-500">{candidate.party}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(candidate)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(candidate._id)}
                    className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
