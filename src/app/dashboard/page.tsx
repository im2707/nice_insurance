'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSessionTimeout } from '@/lib/useSessionTimeout';
import { useRouter } from 'next/navigation';

interface User { firstName: string; lastName: string; role: string; customerId: number; }
interface Policy { home_policy_id?: number; auto_policy_id?: number; policy_number: string; premium_amount: number; policy_status: string; policy_start_date: string; policy_end_date: string; home_count?: number; vehicle_count?: number; }
interface Invoice { home_invoice_id?: number; auto_invoice_id?: number; invoice_number: string; invoice_amount: number; amount_paid: number; invoice_status: string; payment_due_date: string; }

export default function DashboardPage() {
  const router = useRouter();
  useSessionTimeout();
  const [user, setUser] = useState<User | null>(null);
  const [homePolicies, setHomePolicies] = useState<Policy[]>([]);
  const [autoPolicies, setAutoPolicies] = useState<Policy[]>([]);
  const [invoices, setInvoices] = useState<{ home: Invoice[]; auto: Invoice[] }>({ home: [], auto: [] });
  const [tab, setTab] = useState<'overview' | 'home' | 'auto' | 'invoices'>('overview');
  const [payModal, setPayModal] = useState<{ open: boolean; type: string; invoiceId: number; amount: number } | null>(null);
  const [payMethod, setPayMethod] = useState('Credit');
  const [payAmt, setPayAmt] = useState('');
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const loadData = useCallback(async () => {
    try {
      const [me, hp, ap, inv] = await Promise.all([
        fetch('/api/me').then(r => r.json()),
        fetch('/api/policies/home').then(r => r.json()),
        fetch('/api/policies/auto').then(r => r.json()),
        fetch('/api/invoices?type=all').then(r => r.json()),
      ]);
      if (me.error) { router.push('/login'); return; }
      setUser(me);
      setHomePolicies(Array.isArray(hp) ? hp : []);
      setAutoPolicies(Array.isArray(ap) ? ap : []);
      setInvoices(inv.home ? inv : { home: [], auto: [] });
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { loadData(); }, [loadData]);

  const makePayment = async () => {
    if (!payModal) return;
    await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: payModal.type, invoiceId: payModal.invoiceId, paymentAmount: parseFloat(payAmt), paymentMethod: payMethod }),
    });
    setPayModal(null);
    loadData();
  };

  const fmtCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
  const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const pendingInvoices = [...invoices.home, ...invoices.auto].filter(i => i.invoice_status !== 'PAID');
  const totalDue = pendingInvoices.reduce((s, i) => s + (i.invoice_amount - i.amount_paid), 0);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gray-50)' }}>
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--gray-50)' }}>
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--navy)' }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={2}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800" style={{ fontFamily: 'DM Serif Display, serif' }}>NICE Insurance</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">👋 {user?.firstName}</span>
            <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Sign out</button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl text-gray-800 mb-1" style={{ fontFamily: 'DM Serif Display, serif' }}>
            Hello, {user?.firstName} 👋
          </h1>
          <p className="text-gray-500 text-sm">Here&apos;s your insurance overview</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Home Policies', value: homePolicies.length, icon: '🏠' },
            { label: 'Auto Policies', value: autoPolicies.length, icon: '🚗' },
            { label: 'Pending Invoices', value: pendingInvoices.length, icon: '📋' },
            { label: 'Total Due', value: fmtCurrency(totalDue), icon: '💳' },
          ].map(c => (
            <div key={c.label} className="card">
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-xl font-semibold text-gray-800">{c.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {(['overview', 'home', 'auto', 'invoices'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${tab === t ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {t === 'home' ? '🏠 Home' : t === 'auto' ? '🚗 Auto' : t === 'invoices' ? '📋 Invoices' : '📊 Overview'}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold text-gray-800 mb-4">🏠 Home Policies</h3>
              {homePolicies.length === 0
                ? <p className="text-gray-400 text-sm">No home policies found.</p>
                : homePolicies.slice(0, 3).map(p => (
                  <div key={p.home_policy_id} className="py-3 border-b border-gray-50 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{p.policy_number}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{fmtDate(p.policy_start_date)} – {fmtDate(p.policy_end_date)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-800">{fmtCurrency(p.premium_amount)}</div>
                        <span className={p.policy_status === 'C' ? 'badge-active' : 'badge-expired'}>{p.policy_status === 'C' ? 'Active' : 'Expired'}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-800 mb-4">🚗 Auto Policies</h3>
              {autoPolicies.length === 0
                ? <p className="text-gray-400 text-sm">No auto policies found.</p>
                : autoPolicies.slice(0, 3).map(p => (
                  <div key={p.auto_policy_id} className="py-3 border-b border-gray-50 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{p.policy_number}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{fmtDate(p.policy_start_date)} – {fmtDate(p.policy_end_date)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-800">{fmtCurrency(p.premium_amount)}</div>
                        <span className={p.policy_status === 'C' ? 'badge-active' : 'badge-expired'}>{p.policy_status === 'C' ? 'Active' : 'Expired'}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {pendingInvoices.length > 0 && (
              <div className="card md:col-span-2">
                <h3 className="font-semibold text-gray-800 mb-4">⚠️ Pending Invoices</h3>
                <div className="space-y-3">
                  {pendingInvoices.slice(0, 5).map((inv, i) => {
                    const isHome = 'home_invoice_id' in inv;
                    const id = isHome ? inv.home_invoice_id! : (inv as any).auto_invoice_id!;
                    const due = inv.invoice_amount - inv.amount_paid;
                    return (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--gray-50)' }}>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{inv.invoice_number}</div>
                          <div className="text-xs text-gray-500">Due {fmtDate(inv.payment_due_date)}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-800">{fmtCurrency(due)}</span>
                          <button onClick={() => { setPayModal({ open: true, type: isHome ? 'home' : 'auto', invoiceId: id, amount: due }); setPayAmt(due.toFixed(2)); }}
                            className="btn-primary">Pay Now</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Home Policies Tab */}
        {tab === 'home' && (
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-4">Home Insurance Policies</h3>
            {homePolicies.length === 0 ? <p className="text-gray-400 text-sm">No home policies.</p>
              : <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="pb-3 font-medium">Policy #</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Start</th>
                  <th className="pb-3 font-medium">End</th>
                  <th className="pb-3 font-medium text-right">Premium</th>
                </tr></thead>
                <tbody>{homePolicies.map(p => (
                  <tr key={p.home_policy_id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 font-medium text-gray-800">{p.policy_number}</td>
                    <td className="py-3"><span className={p.policy_status === 'C' ? 'badge-active' : 'badge-expired'}>{p.policy_status === 'C' ? 'Active' : 'Expired'}</span></td>
                    <td className="py-3 text-gray-500">{fmtDate(p.policy_start_date)}</td>
                    <td className="py-3 text-gray-500">{fmtDate(p.policy_end_date)}</td>
                    <td className="py-3 text-right font-medium">{fmtCurrency(p.premium_amount)}</td>
                  </tr>
                ))}</tbody>
              </table>}
          </div>
        )}

        {/* Auto Policies Tab */}
        {tab === 'auto' && (
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-4">Auto Insurance Policies</h3>
            {autoPolicies.length === 0 ? <p className="text-gray-400 text-sm">No auto policies.</p>
              : <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="pb-3 font-medium">Policy #</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Vehicles</th>
                  <th className="pb-3 font-medium">End Date</th>
                  <th className="pb-3 font-medium text-right">Premium</th>
                </tr></thead>
                <tbody>{autoPolicies.map(p => (
                  <tr key={p.auto_policy_id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 font-medium text-gray-800">{p.policy_number}</td>
                    <td className="py-3"><span className={p.policy_status === 'C' ? 'badge-active' : 'badge-expired'}>{p.policy_status === 'C' ? 'Active' : 'Expired'}</span></td>
                    <td className="py-3 text-gray-500">{p.vehicle_count ?? 0} vehicle(s)</td>
                    <td className="py-3 text-gray-500">{fmtDate(p.policy_end_date)}</td>
                    <td className="py-3 text-right font-medium">{fmtCurrency(p.premium_amount)}</td>
                  </tr>
                ))}</tbody>
              </table>}
          </div>
        )}

        {/* Invoices Tab */}
        {tab === 'invoices' && (
          <div className="space-y-6">
            {[{ label: '🏠 Home Invoices', items: invoices.home, type: 'home' },
              { label: '🚗 Auto Invoices', items: invoices.auto, type: 'auto' }].map(section => (
              <div key={section.type} className="card">
                <h3 className="font-semibold text-gray-800 mb-4">{section.label}</h3>
                {section.items.length === 0 ? <p className="text-gray-400 text-sm">No invoices.</p>
                  : <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100 text-left text-gray-500">
                      <th className="pb-3 font-medium">Invoice #</th>
                      <th className="pb-3 font-medium">Due Date</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Paid</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium"></th>
                    </tr></thead>
                    <tbody>{section.items.map((inv: any, i: number) => {
                      const id = section.type === 'home' ? inv.home_invoice_id : inv.auto_invoice_id;
                      const due = inv.invoice_amount - inv.amount_paid;
                      return (
                        <tr key={i} className="border-b border-gray-50 last:border-0">
                          <td className="py-3 font-medium">{inv.invoice_number}</td>
                          <td className="py-3 text-gray-500">{fmtDate(inv.payment_due_date)}</td>
                          <td className="py-3">{fmtCurrency(inv.invoice_amount)}</td>
                          <td className="py-3">{fmtCurrency(inv.amount_paid)}</td>
                          <td className="py-3">
                            <span className={inv.invoice_status === 'PAID' ? 'badge-paid' : inv.invoice_status === 'PARTIAL' ? 'badge-pending' : 'badge-pending'}>
                              {inv.invoice_status}
                            </span>
                          </td>
                          <td className="py-3">
                            {inv.invoice_status !== 'PAID' && (
                              <button onClick={() => { setPayModal({ open: true, type: section.type, invoiceId: id, amount: due }); setPayAmt(due.toFixed(2)); }}
                                className="btn-primary text-xs">Pay</button>
                            )}
                          </td>
                        </tr>
                      );
                    })}</tbody>
                  </table>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {payModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>Make a Payment</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Amount ($)</label>
                <input type="number" step="0.01" min="0.01" max={payModal.amount} value={payAmt} onChange={e => setPayAmt(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="form-label">Payment Method</label>
                <select value={payMethod} onChange={e => setPayMethod(e.target.value)} className="form-input">
                  {['Credit', 'Debit', 'PayPal', 'Check'].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setPayModal(null)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={makePayment} className="btn-primary flex-1">Pay {payAmt && `$${parseFloat(payAmt).toFixed(2)}`}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
