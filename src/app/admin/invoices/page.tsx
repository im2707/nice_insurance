'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

export default function InvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<{ home: any[]; auto: any[] }>({ home: [], auto: [] });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'home' | 'auto'>('home');
  const [showCreate, setShowCreate] = useState(false);
  const [policies, setPolicies] = useState<any[]>([]);
  const [form, setForm] = useState({ type: 'home', policyId: '', invoiceDate: '', paymentDueDate: '', invoiceAmount: '' });
  const [creating, setCreating] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const load = async () => {
    setLoading(true);
    try {
      const me = await fetch('/api/me').then(r => r.json());
      if (me.error || me.role !== 'employee') { router.push('/login'); return; }
      const inv = await fetch('/api/invoices?type=all').then(r => r.json());
      setInvoices(inv.home ? inv : { home: [], auto: [] });
    } finally { setLoading(false); }
  };

  const loadPolicies = async (type: string) => {
    const res = await fetch(`/api/policies/${type}`).then(r => r.json());
    setPolicies(Array.isArray(res) ? res : []);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setCreating(true);
    const res = await fetch('/api/invoices', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, policyId: parseInt(form.policyId), invoiceAmount: parseFloat(form.invoiceAmount) }),
    });
    if (res.ok) { setShowCreate(false); setForm({ type: 'home', policyId: '', invoiceDate: '', paymentDueDate: '', invoiceAmount: '' }); load(); }
    setCreating(false);
  };

  const fmtCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
  const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
  const statusColor = (s: string) => s === 'PAID' ? 'badge-paid' : s === 'PARTIAL' ? 'badge-pending' : 'badge-pending';
  const current = tab === 'home' ? invoices.home : invoices.auto;

  return (
    <AdminLayout title="Invoices" subtitle="Manage home and auto insurance invoices">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 border-b border-gray-200">
          {(['home', 'auto'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${tab === t ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {t === 'home' ? '🏠' : '🚗'} {t} ({(tab === 'home' ? invoices.home : invoices.auto).length})
            </button>
          ))}
        </div>
        <button onClick={() => { setShowCreate(true); loadPolicies(form.type); }} className="btn-primary">+ Create Invoice</button>
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-12 text-center text-gray-400">Loading...</div>
          : current.length === 0 ? <div className="p-12 text-center text-gray-400">No {tab} invoices found.</div>
          : (
            <table className="w-full text-sm">
              <thead style={{ background: 'var(--gray-50)' }}>
                <tr className="text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Invoice #</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Policy #</th>
                  <th className="px-5 py-3 font-medium">Due Date</th>
                  <th className="px-5 py-3 font-medium text-right">Amount</th>
                  <th className="px-5 py-3 font-medium text-right">Paid</th>
                  <th className="px-5 py-3 font-medium text-right">Balance</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {current.map((inv: any, i: number) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-gray-800">{inv.invoice_number}</td>
                    <td className="px-5 py-3 text-gray-600">{inv.customer_name}</td>
                    <td className="px-5 py-3 text-gray-500">{inv.policy_number}</td>
                    <td className="px-5 py-3 text-gray-500">{fmtDate(inv.payment_due_date)}</td>
                    <td className="px-5 py-3 text-right">{fmtCurrency(inv.invoice_amount)}</td>
                    <td className="px-5 py-3 text-right text-green-600">{fmtCurrency(inv.amount_paid)}</td>
                    <td className="px-5 py-3 text-right font-medium text-gray-800">{fmtCurrency(inv.invoice_amount - inv.amount_paid)}</td>
                    <td className="px-5 py-3"><span className={statusColor(inv.invoice_status)}>{inv.invoice_status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>

      {/* Create Invoice Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>Create Invoice</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="form-label">Invoice Type</label>
                <select value={form.type} onChange={e => { set('type', e.target.value); set('policyId', ''); loadPolicies(e.target.value); }} className="form-input">
                  <option value="home">Home Insurance</option>
                  <option value="auto">Auto Insurance</option>
                </select>
              </div>
              <div>
                <label className="form-label">Policy *</label>
                <select required value={form.policyId} onChange={e => set('policyId', e.target.value)} className="form-input">
                  <option value="">Select policy</option>
                  {policies.map((p: any) => (
                    <option key={p.home_policy_id || p.auto_policy_id} value={p.home_policy_id || p.auto_policy_id}>
                      {p.policy_number} — {p.first_name} {p.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="form-label">Invoice Date *</label><input required type="date" value={form.invoiceDate} onChange={e => set('invoiceDate', e.target.value)} className="form-input" /></div>
                <div><label className="form-label">Due Date *</label><input required type="date" value={form.paymentDueDate} onChange={e => set('paymentDueDate', e.target.value)} className="form-input" /></div>
              </div>
              <div><label className="form-label">Invoice Amount ($) *</label><input required type="number" step="0.01" min="0.01" value={form.invoiceAmount} onChange={e => set('invoiceAmount', e.target.value)} className="form-input" /></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={creating} className="btn-primary flex-1">{creating ? 'Creating...' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
