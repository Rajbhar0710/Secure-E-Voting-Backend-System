import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Results() {
  const [voteTotals, setVoteTotals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const response = await api.get('/candidates/vote/count');
        setVoteTotals(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  const totalVotes = useMemo(() => voteTotals.reduce((acc, item) => acc + (item.count || 0), 0), [voteTotals]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Results</h1>
          <p className="mt-1 text-sm text-slate-500">Live vote tallies and trends.</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
          <div className="text-xs text-slate-500">Total votes cast</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">{loading ? '…' : totalVotes}</div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Vote distribution</h2>
            <span className="text-xs font-medium text-slate-500">By party</span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={voteTotals} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                <XAxis dataKey="party" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Breakdown</h2>
          <p className="mt-1 text-sm text-slate-500">Vote counts per party.</p>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="space-y-3">
                <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
              </div>
            ) : (
              voteTotals.map((item) => (
                <div key={item.party} className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium text-slate-700">{item.party}</div>
                  <div className="text-sm font-semibold text-slate-900">{item.count}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
