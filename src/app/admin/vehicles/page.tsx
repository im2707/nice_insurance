'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/me').then(r => r.json()),
      fetch('/api/vehicles').then(r => r.json()),
    ]).then(([m, v]) => {
      if (m.error || m.role !== 'employee') { router.push('/login'); return; }
      setVehicles(Array.isArray(v) ? v : []);
    }).finally(() => setLoading(false));
  }, [router]);

  const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
  const statusLabel = (s: string) => s === 'L' ? '🔑 Leased' : s === 'F' ? '💳 Financed' : '✅ Owned';

  return (
    <AdminLayout title="Vehicles" subtitle={`${vehicles.length} vehicles insured`}>
      <div className="flex justify-end mb-6">
        <Link href="/admin/vehicles/new" className="btn-primary">+ Add Vehicle</Link>
      </div>
      <div className="card p-0 overflow-hidden">
        {loading ? <div className="p-12 text-center text-gray-400">Loading...</div>
          : vehicles.length === 0 ? <div className="p-12 text-center text-gray-400">No vehicles found.</div>
          : (
            <table className="w-full text-sm">
              <thead style={{ background: 'var(--gray-50)' }}>
                <tr className="text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">VIN</th>
                  <th className="px-5 py-3 font-medium">Vehicle</th>
                  <th className="px-5 py-3 font-medium">Owner</th>
                  <th className="px-5 py-3 font-medium">Policy #</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Added</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(v => (
                  <tr key={v.vehicle_id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-mono text-xs text-gray-600">{v.vin}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{v.vehicle_year} {v.vehicle_make} {v.vehicle_model}</td>
                    <td className="px-5 py-3 text-gray-600">{v.first_name} {v.last_name}</td>
                    <td className="px-5 py-3 text-gray-500">{v.policy_number}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{statusLabel(v.vehicle_status)}</td>
                    <td className="px-5 py-3 text-gray-500">{fmtDate(v.date_added)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </AdminLayout>
  );
}
