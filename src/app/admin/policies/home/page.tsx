'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

export default function HomePoliciesPage() {
  const router = useRouter();
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const me = fetch('/api/me').then(r => r.json());
    const pol = fetch('/api/policies/home').then(r => r.json());
    Promise.all([me, pol]).then(([m, p]) => {
      if (m.error || m.role !== 'employee') { router.push('/login'); return; }
      setPolicies(Array.isArray(p) ? p : []);
    }).finally(() => setLoading(false));
  }, [router]);

  const fmtCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
  const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

  return (
    <AdminLayout title="Home Insurance Policies" subtitle={`${policies.length} policies`}>
      <div className="flex justify-end mb-6">
        <Link href="/admin/policies/home/new" className="btn-primary">+ New Home Policy</Link>
      </div>
      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-12 text-center text-gray-400">Loading...</div>
          : policies.length === 0 ? <div className="p-12 text-center text-gray-400">No home policies found.</div>
          : (
            <table className="w-full text-sm">
              <thead style={{ background: 'var(--gray-50)' }}>
                <tr className="text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Policy #</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Start</th>
                  <th className="px-5 py-3 font-medium">End</th>
                  <th className="px-5 py-3 font-medium">Homes</th>
                  <th className="px-5 py-3 font-medium text-right">Premium</th>
                </tr>
              </thead>
              <tbody>
                {policies.map(p => (
                  <tr key={p.home_policy_id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-gray-800">{p.policy_number}</td>
                    <td className="px-5 py-3 text-gray-700">
                      <Link href={`/admin/customers/${p.customer_id}`} className="hover:text-teal-600">
                        {p.first_name} {p.last_name}
                      </Link>
                    </td>
                    <td className="px-5 py-3"><span className={p.policy_status === 'C' ? 'badge-active' : 'badge-expired'}>{p.policy_status === 'C' ? 'Active' : 'Expired'}</span></td>
                    <td className="px-5 py-3 text-gray-500">{fmtDate(p.policy_start_date)}</td>
                    <td className="px-5 py-3 text-gray-500">{fmtDate(p.policy_end_date)}</td>
                    <td className="px-5 py-3 text-gray-500">{p.home_count ?? 0}</td>
                    <td className="px-5 py-3 text-right font-medium">{fmtCurrency(p.premium_amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </AdminLayout>
  );
}
