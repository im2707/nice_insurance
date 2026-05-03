'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { Suspense } from 'react';

function NewHomePolicyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preCustomer = searchParams.get('customerId') || '';

  const [customers, setCustomers] = useState<any[]>([]);
  const [form, setForm] = useState({
    customerId: preCustomer, policyStartDate: '', policyEndDate: '',
    premiumAmount: '', policyStatus: 'C',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    fetch('/api/customers').then(r => r.json()).then(d => setCustomers(d.customers || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await fetch('/api/policies/home', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, customerId: parseInt(form.customerId), premiumAmount: parseFloat(form.premiumAmount) }),
    });
    const data = await res.json();
    if (res.ok) router.push('/admin/policies/home');
    else { setError(data.error || 'Failed to create policy'); setLoading(false); }
  };

  return (
    <div className="max-w-lg">
      {error && <div className="mb-4 p-3 rounded-lg text-sm text-red-600 bg-red-50 border border-red-200">{error}</div>}
      <form onSubmit={handleSubmit} className="card space-y-5">
        <div>
          <label className="form-label">Customer *</label>
          <select required value={form.customerId} onChange={e => set('customerId', e.target.value)} className="form-input">
            <option value="">Select customer</option>
            {customers.map(c => <option key={c.customer_id} value={c.customer_id}>{c.first_name} {c.last_name} (#{c.customer_id})</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="form-label">Start Date *</label><input required type="date" value={form.policyStartDate} onChange={e => set('policyStartDate', e.target.value)} className="form-input" /></div>
          <div><label className="form-label">End Date *</label><input required type="date" value={form.policyEndDate} onChange={e => set('policyEndDate', e.target.value)} className="form-input" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="form-label">Annual Premium ($) *</label><input required type="number" step="0.01" min="1" value={form.premiumAmount} onChange={e => set('premiumAmount', e.target.value)} className="form-input" /></div>
          <div>
            <label className="form-label">Status</label>
            <select value={form.policyStatus} onChange={e => set('policyStatus', e.target.value)} className="form-input">
              <option value="C">Active (C)</option><option value="E">Expired (E)</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
          <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Creating...' : 'Create Policy'}</button>
        </div>
      </form>
    </div>
  );
}

export default function NewHomePolicyPage() {
  return (
    <AdminLayout title="New Home Policy" subtitle="Create a home insurance policy">
      <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
        <NewHomePolicyForm />
      </Suspense>
    </AdminLayout>
  );
}
