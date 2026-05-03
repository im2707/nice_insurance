'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '', password: '', firstName: '', middleName: '', lastName: '',
    streetAddress: '', city: '', state: '', zipCode: '',
    gender: '', maritalStatus: 'S', phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Registration failed'); return; }
      router.push('/dashboard');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: 'var(--navy)' }}>
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--teal)' }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-white text-xl font-semibold" style={{ fontFamily: 'DM Serif Display, serif' }}>NICE Insurance</span>
        </div>

        <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 className="text-white text-2xl mb-1 text-center" style={{ fontFamily: 'DM Serif Display, serif' }}>Create your account</h2>
          <p className="text-gray-400 text-sm text-center mb-6">Join NICE Insurance as a customer</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">First Name *</label>
                <input required value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Last Name *</label>
                <input required value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Smith"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Email *</label>
                <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@example.com"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Password *</label>
                <input required type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" minLength={6}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-1">Street Address *</label>
                <input required value={form.streetAddress} onChange={e => set('streetAddress', e.target.value)} placeholder="123 Main St"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">City *</label>
                <input required value={form.city} onChange={e => set('city', e.target.value)} placeholder="New York"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Zip Code *</label>
                <input required value={form.zipCode} onChange={e => set('zipCode', e.target.value)} placeholder="10001"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">State *</label>
                <select required value={form.state} onChange={e => set('state', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: '#1b2d42', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <option value="">Select state</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Phone</label>
                <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="555-0100"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Gender</label>
                <select value={form.gender} onChange={e => set('gender', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: '#1b2d42', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <option value="">Prefer not to say</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Marital Status *</label>
                <select required value={form.maritalStatus} onChange={e => set('maritalStatus', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  style={{ background: '#1b2d42', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <option value="S">Single</option>
                  <option value="M">Married</option>
                  <option value="W">Widowed</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 mt-2"
              style={{ background: 'var(--teal)' }}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-teal-400 hover:text-teal-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
