import VoteButton from './VoteButton';

export default function CandidateCard({ candidate, hasVoted, onVote, loading }) {
  const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    candidate.name
  )}&background=6366f1&color=fff&rounded=true&size=96`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        <img src={imageUrl} alt={candidate.name} className="h-16 w-16 rounded-full object-cover" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{candidate.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{candidate.party}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-slate-500">Age: {candidate.age}</div>
        <VoteButton onClick={() => onVote(candidate._id)} disabled={hasVoted} loading={loading} />
      </div>
      {hasVoted && (
        <div className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          You have already voted.
        </div>
      )}
    </div>
  );
}
