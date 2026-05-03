'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

function NewVehicleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prePolicyId = searchParams.get('policyId') || '';
  const [policies, setPolicies] = useState<any[]>([]);
  const [form, setForm] = useState({ autoPolicyId: prePolicyId, vin: '', vehicleMake: '', vehicleModel: '', vehicleYear: '', vehicleStatus: 'O' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    fetch('/api/policies/auto').then(r => r.json()).then(d => setPolicies(Array.isArray(d) ? d : []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    if (form.vin.length !== 17) { setError('VIN must be exactly 17 characters'); setLoading(false); return; }
    const res = await fetch('/api/vehicles', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, autoPolicyId: parseInt(form.autoPolicyId), vehicleYear: parseInt(form.vehicleYear) }),
    });
    const data = await res.json();
    if (res.ok) router.push('/admin/vehicles');
    else { setError(data.error || 'Failed to add vehicle'); setLoading(false); }
  };

  return (
    <div className="max-w-lg">
      {error && <div className="mb-4 p-3 rounded-lg text-sm text-red-600 bg-red-50 border border-red-200">{error}</div>}
      <form onSubmit={handleSubmit} className="card space-y-5">
        <div>
          <label className="form-label">Auto Policy *</label>
          <select required value={form.autoPolicyId} onChange={e => set('autoPolicyId', e.target.value)} className="form-input">
            <option value="">Select auto policy</option>
            {policies.map(p => <option key={p.auto_policy_id} value={p.auto_policy_id}>{p.policy_number} — {p.first_name} {p.last_name}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">VIN (17 characters) *</label>
          <input required maxLength={17} minLength={17} value={form.vin} onChange={e => set('vin', e.target.value.toUpperCase())}
            placeholder="1HGBH41JXMN109186" className="form-input font-mono" />
          <div className="text-xs text-gray-400 mt-1">{form.vin.length}/17 characters</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="form-label">Make *</label><input required value={form.vehicleMake} onChange={e => set('vehicleMake', e.target.value)} placeholder="Honda" className="form-input" /></div>
          <div><label className="form-label">Model *</label><input required value={form.vehicleModel} onChange={e => set('vehicleModel', e.target.value)} placeholder="Accord" className="form-input" /></div>
          <div><label className="form-label">Year *</label><input required type="number" min={1900} max={2027} value={form.vehicleYear} onChange={e => set('vehicleYear', e.target.value)} placeholder="2024" className="form-input" /></div>
        </div>
        <div>
          <label className="form-label">Vehicle Status *</label>
          <select required value={form.vehicleStatus} onChange={e => set('vehicleStatus', e.target.value)} className="form-input">
            <option value="O">Owned (O)</option>
            <option value="F">Financed (F)</option>
            <option value="L">Leased (L)</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
          <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Adding...' : 'Add Vehicle'}</button>
        </div>
      </form>
    </div>
  );
}

export default function NewVehiclePage() {
  return (
    <AdminLayout title="Add Vehicle" subtitle="Register a vehicle to an auto policy">
      <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
        <NewVehicleForm />
      </Suspense>
    </AdminLayout>
  );
}
