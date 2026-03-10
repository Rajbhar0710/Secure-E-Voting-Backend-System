import { useEffect, useState } from 'react';
import { getProfile } from '../services/auth';
import api from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await getProfile();
        setUser(profile.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      setSaving(false);
      return;
    }

    try {
      await api.put('/user/profile/password', {
        currentPassword,
        newPassword,
      });

      setMessage({ type: 'success', text: 'Password updated successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.error || 'Unable to update password.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
        <p className="mt-1 text-sm text-slate-500">Your profile information and security settings.</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Account information</h2>
          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-500">Name</dt>
              <dd className="mt-2 text-base text-slate-900">{user?.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-500">Age</dt>
              <dd className="mt-2 text-base text-slate-900">{user?.age}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-500">Address</dt>
              <dd className="mt-2 text-base text-slate-900">{user?.address}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-500">Aadhar card number</dt>
              <dd className="mt-2 text-base text-slate-900">{user?.aadharCardNumber}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-500">Role</dt>
              <dd className="mt-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase text-brand-700">
                {user?.role}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-500">Voting status</dt>
              <dd className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase text-slate-700">
                {user?.isVoted ? (
                  <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase text-emerald-700">
                    Already voted
                  </span>
                ) : (
                  <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">
                    Has not voted
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Change password</h2>
          <form className="mt-4 space-y-4" onSubmit={handlePasswordChange}>
            <div>
              <label className="text-sm font-medium text-slate-700">Current password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            {message && (
              <div
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  message.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-rose-50 text-rose-700'
                }`}
              >
                {message.text}
              </div>
            )}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Updating…' : 'Update password'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
