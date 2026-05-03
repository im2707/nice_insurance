'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/customers/${params.id}`).then(r => r.json()).then(d => {
      if (d.error) { router.push('/admin/customers'); return; }
      setData(d);
    }).finally(() => setLoading(false));
  }, [params.id, router]);

  const fmtCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
  const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

  if (loading) return <AdminLayout title="Loading..."><div className="text-gray-400">Loading...</div></AdminLayout>;
  if (!data) return <AdminLayout title="Not Found"><div className="text-gray-400">Customer not found.</div></AdminLayout>;

  const { customer: c, homePolicies, autoPolicies } = data;

  return (
    <AdminLayout title={`${c.first_name} ${c.last_name}`} subtitle={`Customer ID: ${c.customer_id}`}>
      <div className="space-y-6 max-w-4xl">
        <div className="flex gap-3">
          <Link href={`/admin/customers/${c.customer_id}/edit`} className="btn-primary">Edit Customer</Link>
          <Link href="/admin/customers" className="btn-secondary">← Back to Customers</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
            {[
              ['Full Name', `${c.first_name} ${c.middle_name || ''} ${c.last_name}`.trim()],
              ['Email', c.email || '—'],
              ['Phone', c.phone || '—'],
              ['Address', `${c.street_address}, ${c.city}, ${c.state} ${c.zip_code}`],
              ['Gender', c.gender === 'M' ? 'Male' : c.gender === 'F' ? 'Female' : 'Not specified'],
              ['Marital Status', c.marital_status === 'M' ? 'Married' : c.marital_status === 'S' ? 'Single' : 'Widowed'],
              ['Customer Type', c.customer_type === 'AH' ? 'Home & Auto' : c.customer_type === 'H' ? 'Home' : 'Auto'],
              ['Member Since', fmtDate(c.date_created)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm text-gray-800 font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-4">Policy Summary</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-xl text-center" style={{ background: 'var(--gray-50)' }}>
                <div className="text-xl font-bold text-gray-800">{homePolicies.length}</div>
                <div className="text-xs text-gray-500">Home Policies</div>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ background: 'var(--gray-50)' }}>
                <div className="text-xl font-bold text-gray-800">{autoPolicies.length}</div>
                <div className="text-xs text-gray-500">Auto Policies</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/policies/home/new?customerId=${c.customer_id}`} className="btn-secondary text-xs flex-1 text-center">+ Home Policy</Link>
              <Link href={`/admin/policies/auto/new?customerId=${c.customer_id}`} className="btn-secondary text-xs flex-1 text-center">+ Auto Policy</Link>
            </div>
          </div>
        </div>

        {homePolicies.length > 0 && (
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-4">🏠 Home Policies</h3>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-2 font-medium">Policy #</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Start</th>
                <th className="pb-2 font-medium">End</th>
                <th className="pb-2 font-medium text-right">Premium/yr</th>
              </tr></thead>
              <tbody>{homePolicies.map((p: any) => (
                <tr key={p.home_policy_id} className="border-t border-gray-50">
                  <td className="py-2 font-medium">{p.policy_number}</td>
                  <td className="py-2"><span className={p.policy_status === 'C' ? 'badge-active' : 'badge-expired'}>{p.policy_status === 'C' ? 'Active' : 'Expired'}</span></td>
                  <td className="py-2 text-gray-500">{fmtDate(p.policy_start_date)}</td>
                  <td className="py-2 text-gray-500">{fmtDate(p.policy_end_date)}</td>
                  <td className="py-2 text-right font-medium">{fmtCurrency(p.premium_amount)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {autoPolicies.length > 0 && (
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-4">🚗 Auto Policies</h3>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-2 font-medium">Policy #</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Start</th>
                <th className="pb-2 font-medium">End</th>
                <th className="pb-2 font-medium text-right">Premium/yr</th>
              </tr></thead>
              <tbody>{autoPolicies.map((p: any) => (
                <tr key={p.auto_policy_id} className="border-t border-gray-50">
                  <td className="py-2 font-medium">{p.policy_number}</td>
                  <td className="py-2"><span className={p.policy_status === 'C' ? 'badge-active' : 'badge-expired'}>{p.policy_status === 'C' ? 'Active' : 'Expired'}</span></td>
                  <td className="py-2 text-gray-500">{fmtDate(p.policy_start_date)}</td>
                  <td className="py-2 text-gray-500">{fmtDate(p.policy_end_date)}</td>
                  <td className="py-2 text-right font-medium">{fmtCurrency(p.premium_amount)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
