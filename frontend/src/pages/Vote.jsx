import { useEffect, useState } from 'react';
import api from '../services/api';
import { getProfile } from '../services/auth';
import CandidateCard from '../components/cards/CandidateCard';

export default function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [votingCandidateId, setVotingCandidateId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [candidatesRes, profileRes] = await Promise.all([
          api.get('/candidates'),
          getProfile(),
        ]);
        setCandidates(candidatesRes.data || []);
        setUser(profileRes.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleVote = async (candidateId) => {
    setMessage(null);
    setVotingCandidateId(candidateId);

    try {
      await api.get(`/candidates/vote/${candidateId}`);
      setMessage({ type: 'success', text: 'Your vote has been recorded.' });
      setUser((u) => ({ ...u, isVoted: true }));
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Unable to record vote. Please try again.',
      });
    } finally {
      setVotingCandidateId(null);
    }
  };

  const hasVoted = user?.isVoted;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Vote</h1>
          <p className="mt-1 text-sm text-slate-500">Select your preferred candidate and cast your vote.</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
          <div className="text-xs text-slate-500">Your voting status</div>
          <div className={`mt-1 font-semibold ${hasVoted ? 'text-emerald-700' : 'text-slate-800'}`}>
            {hasVoted ? 'Already voted' : 'Ready to vote'}
          </div>
        </div>
      </header>

      {message && (
        <div
          className={`rounded-2xl px-5 py-4 text-sm font-medium ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-40 animate-pulse rounded-2xl bg-slate-100" />
          ))
        ) : (
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate._id}
              candidate={candidate}
              hasVoted={hasVoted}
              loading={votingCandidateId === candidate._id}
              onVote={handleVote}
            />
          ))
        )}
      </div>
    </div>
  );
}
