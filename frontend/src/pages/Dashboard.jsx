import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../services/api';
import DashboardCard from '../components/cards/DashboardCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [voteTotals, setVoteTotals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [candidatesRes, votesRes] = await Promise.all([
          api.get('/candidates'),
          api.get('/candidates/vote/count'),
        ]);

        setCandidates(candidatesRes.data || []);
        setVoteTotals(votesRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalVotes = useMemo(() => voteTotals.reduce((acc, item) => acc + (item.count || 0), 0), [voteTotals]);

  const chartsData = useMemo(
    () => voteTotals.map((item) => ({ name: item.party, votes: item.count })),
    [voteTotals]
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Quick overview of your election data.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate('/vote')}
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-600"
          >
            Vote Now
          </button>
          <button
            type="button"
            onClick={() => navigate('/results')}
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            View Results
          </button>
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-3">
        <DashboardCard
          title="Total voters"
          value="—"
          icon={<span className="text-xl">👥</span>}
          color="bg-emerald-500"
        >
          This value is derived from registered users.
        </DashboardCard>
        <DashboardCard
          title="Total votes"
          value={loading ? '…' : totalVotes}
          icon={<span className="text-xl">🗳️</span>}
          color="bg-indigo-500"
        >
          Combined votes across all candidates.
        </DashboardCard>
        <DashboardCard
          title="Total candidates"
          value={loading ? '…' : candidates.length}
          icon={<span className="text-xl">🏛️</span>}
          color="bg-brand-500"
        >
          Number of candidates currently in the election.
        </DashboardCard>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Live results</h2>
          <p className="mt-1 text-sm text-slate-500">Vote distribution across parties.</p>

          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartsData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="votes" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Latest candidates</h2>
          <p className="mt-1 text-sm text-slate-500">Candidates available to vote for.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {loading ? (
              <div className="col-span-full animate-pulse rounded-2xl bg-slate-100 p-6" />
            ) : (
              candidates.slice(0, 4).map((candidate) => (
                <div key={candidate._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-brand-100" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{candidate.name}</div>
                      <div className="text-xs text-slate-500">{candidate.party}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
