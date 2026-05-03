'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

interface Customer {
  customer_id: number; first_name: string; last_name: string; email: string;
  phone: string; city: string; state: string; customer_type: string;
  marital_status: string; home_policies: number; auto_policies: number;
}

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = useCallback(async (q = '') => {
    setLoading(true);
    try {
      const me = await fetch('/api/me').then(r => r.json());
      if (me.error || me.role !== 'employee') { router.push('/login'); return; }
      const res = await fetch(`/api/customers?search=${encodeURIComponent(q)}`);
      const data = await res.json();
      setCustomers(data.customers || []);
      setTotal(data.total || 0);
    } finally { setLoading(false); }
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete customer "${name}"? This will remove all their policies, invoices, and payments.`)) return;
    setDeleting(id);
    const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    if (res.ok) load(search);
    else alert('Failed to delete customer.');
    setDeleting(null);
  };

  const typeLabel = (t: string) => t === 'AH' ? '🏠🚗 Both' : t === 'H' ? '🏠 Home' : '🚗 Auto';
  const msLabel = (m: string) => m === 'M' ? 'Married' : m === 'S' ? 'Single' : 'Widowed';

  return (
    <AdminLayout title="Customers" subtitle={`${total} total customers`}>
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-xs">
          <input value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && load(search)}
            placeholder="Search by name, email, phone…"
            className="form-input pl-9" />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <div className="flex gap-2">
          <button onClick={() => load(search)} className="btn-secondary">Search</button>
          <Link href="/admin/customers/new" className="btn-primary">+ Add Customer</Link>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : customers.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No customers found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--gray-50)' }}>
              <tr className="text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Policies</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.customer_id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium text-gray-800">{c.first_name} {c.last_name}</div>
                    <div className="text-xs text-gray-400">ID: {c.customer_id} · {msLabel(c.marital_status)}</div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    <div>{c.email || '—'}</div>
                    <div className="text-xs text-gray-400">{c.phone || '—'}</div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{c.city}, {c.state}</td>
                  <td className="px-5 py-3 text-gray-600 text-xs">{typeLabel(c.customer_type)}</td>
                  <td className="px-5 py-3 text-gray-600 text-xs">
                    🏠 {c.home_policies} &nbsp; 🚗 {c.auto_policies}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/customers/${c.customer_id}`} className="btn-secondary text-xs py-1">View</Link>
                      <Link href={`/admin/customers/${c.customer_id}/edit`} className="btn-secondary text-xs py-1">Edit</Link>
                      <button onClick={() => handleDelete(c.customer_id, `${c.first_name} ${c.last_name}`)}
                        disabled={deleting === c.customer_id}
                        className="btn-danger text-xs py-1">{deleting === c.customer_id ? '...' : 'Del'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
