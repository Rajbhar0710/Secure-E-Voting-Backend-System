export default function VoteButton({ onClick, disabled, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
        disabled
          ? 'cursor-not-allowed bg-slate-200 text-slate-500'
          : 'bg-brand-500 text-white hover:bg-brand-600'
      }`}
    >
      {loading ? 'Voting…' : 'Vote'}
    </button>
  );
}
