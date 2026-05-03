'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

const QUERIES = [
  { id: '1', label: 'Q1 — 3-Table Join', icon: '🔗' },
  { id: '2', label: 'Q2 — Multi-Row Subquery', icon: '📊' },
  { id: '3', label: 'Q3 — Correlated Subquery', icon: '🔄' },
  { id: '4', label: 'Q4 — UNION SET Operator', icon: '🔀' },
  { id: '5', label: 'Q5 — WITH Clause', icon: '📅' },
  { id: '6', label: 'Q6 — TOP-N Query', icon: '🏆' },
];

export default function ReportsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState('1');
  const [result, setResult] = useState<{ title: string; purpose: string; sql: string; results: any[]; count: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(m => {
      if (m.error || m.role !== 'employee') router.push('/login');
    });
  }, [router]);

  const runQuery = async (qId: string) => {
    setLoading(true); setError(''); setSelected(qId);
    try {
      const res = await fetch(`/api/queries?q=${qId}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Query failed'); return; }
      setResult(data);
    } catch { setError('Network error'); }
    finally { setLoading(false); }
  };

  const fmtVal = (v: any) => {
    if (v === null || v === undefined) return '—';
    if (typeof v === 'number') return v % 1 !== 0 ? `$${v.toFixed(2)}` : v.toString();
    if (typeof v === 'string' && v.match(/^\d{4}-\d{2}-\d{2}/)) return new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return String(v);
  };

  return (
    <AdminLayout title="SQL Business Reports" subtitle="Run the 6 required analytical queries on NICE Insurance data">
      <div className="grid md:grid-cols-4 gap-6">
        {/* Query Selector */}
        <div className="md:col-span-1">
          <div className="card p-3 space-y-1">
            <div className="text-xs font-medium text-gray-400 px-2 pb-1 uppercase tracking-wider">Queries</div>
            {QUERIES.map(q => (
              <button key={q.id} onClick={() => runQuery(q.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 ${selected === q.id ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                <span>{q.icon}</span>
                <span>{q.label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => runQuery(selected)}
            className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--teal)' }}>
            ▶ Run Query
          </button>
        </div>

        {/* Result Panel */}
        <div className="md:col-span-3 space-y-4">
          {!result && !loading && !error && (
            <div className="card text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">📊</div>
              <div className="text-sm">Select a query and click Run Query to see results</div>
            </div>
          )}

          {loading && (
            <div className="card text-center py-16">
              <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <div className="text-sm text-gray-400">Running query...</div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl text-sm text-red-600 bg-red-50 border border-red-200">{error}</div>
          )}

          {result && !loading && (
            <>
              <div className="card">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: 'DM Serif Display, serif' }}>{result.title}</h3>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{result.count} rows</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{result.purpose}</p>
                <div className="rounded-xl overflow-auto" style={{ background: '#0d1b2a' }}>
                  <pre className="text-xs text-green-300 p-4 leading-relaxed whitespace-pre-wrap">{result.sql}</pre>
                </div>
              </div>

              {result.results.length > 0 && (
                <div className="card p-0 overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between" style={{ background: 'var(--gray-50)' }}>
                    <span className="text-sm font-medium text-gray-700">Query Results</span>
                    <span className="text-xs text-gray-400">{result.count} rows returned</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead style={{ background: 'var(--gray-50)' }}>
                        <tr className="text-left text-gray-500 border-b border-gray-100">
                          {Object.keys(result.results[0]).map(col => (
                            <th key={col} className="px-4 py-2.5 font-medium whitespace-nowrap">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.results.map((row, i) => (
                          <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                            {Object.values(row).map((val, j) => (
                              <td key={j} className="px-4 py-2.5 text-gray-700 whitespace-nowrap">{fmtVal(val)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {result.results.length === 0 && (
                <div className="card text-center py-8 text-gray-400 text-sm">
                  Query returned 0 rows. This may be because the data conditions are not met (e.g., no policies created in the last 180 days).
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
