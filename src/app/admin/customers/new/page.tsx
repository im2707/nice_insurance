'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'];

export default function NewCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '', streetAddress: '',
    city: '', state: '', zipCode: '', gender: '', maritalStatus: 'S',
    customerType: 'H', email: '', phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) router.push('/admin/customers');
    else { setError(data.error || 'Failed to create customer'); setLoading(false); }
  };

  return (
    <AdminLayout title="Add Customer" subtitle="Create a new customer record">
      <div className="max-w-2xl">
        {error && <div className="mb-4 p-3 rounded-lg text-sm text-red-600 bg-red-50 border border-red-200">{error}</div>}
        <form onSubmit={handleSubmit} className="card space-y-5">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="form-label">First Name *</label>
              <input required value={form.firstName} onChange={e => set('firstName', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">Middle Name</label>
              <input value={form.middleName} onChange={e => set('middleName', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">Last Name *</label>
              <input required value={form.lastName} onChange={e => set('lastName', e.target.value)} className="form-input" />
            </div>
          </div>
          <div>
            <label className="form-label">Street Address *</label>
            <input required value={form.streetAddress} onChange={e => set('streetAddress', e.target.value)} className="form-input" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="form-label">City *</label>
              <input required value={form.city} onChange={e => set('city', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">State *</label>
              <select required value={form.state} onChange={e => set('state', e.target.value)} className="form-input">
                <option value="">Select</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">ZIP Code *</label>
              <input required value={form.zipCode} onChange={e => set('zipCode', e.target.value)} className="form-input" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="form-label">Gender</label>
              <select value={form.gender} onChange={e => set('gender', e.target.value)} className="form-input">
                <option value="">Not specified</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div>
              <label className="form-label">Marital Status *</label>
              <select required value={form.maritalStatus} onChange={e => set('maritalStatus', e.target.value)} className="form-input">
                <option value="S">Single</option>
                <option value="M">Married</option>
                <option value="W">Widowed</option>
              </select>
            </div>
            <div>
              <label className="form-label">Customer Type *</label>
              <select required value={form.customerType} onChange={e => set('customerType', e.target.value)} className="form-input">
                <option value="H">Home</option>
                <option value="A">Auto</option>
                <option value="AH">Both</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} className="form-input" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Create Customer'}</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
