"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { useSessionTimeout } from "@/lib/useSessionTimeout";

interface Stats { customers: number; homePolicies: number; autoPolicies: number; pendingInvoices: number; monthlyRevenue: number; }

export default function AdminPage() {
  const router = useRouter();
  useSessionTimeout();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/me").then(r => r.json()),
      fetch("/api/admin-stats").then(r => r.json()),
    ]).then(([me, s]) => {
      if (me.error || me.role !== "employee") { router.push("/login"); return; }
      setStats(s);
    }).finally(() => setLoading(false));
  }, [router]);

  const fmtCurrency = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  if (loading) return (
    <AdminLayout title="Dashboard">
      <div className="flex items-center justify-center h-40">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout title="Admin Dashboard" subtitle="NICE Insurance management system">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Customers", value: stats?.customers || 0, icon: "👥", color: "var(--navy)" },
          { label: "Active Home Policies", value: stats?.homePolicies || 0, icon: "🏠", color: "var(--teal-dark)" },
          { label: "Active Auto Policies", value: stats?.autoPolicies || 0, icon: "🚗", color: "#10b981" },
          { label: "Monthly Revenue", value: fmtCurrency(stats?.monthlyRevenue || 0), icon: "💰", color: "var(--amber)" },
        ].map(c => (
          <div key={c.label} className="card">
            <div className="text-2xl mb-2">{c.icon}</div>
            <div className="text-2xl font-bold mb-0.5" style={{ color: c.color }}>{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/admin/customers/new", label: "Add Customer", icon: "➕" },
            { href: "/admin/policies/home/new", label: "New Home Policy", icon: "🏠" },
            { href: "/admin/policies/auto/new", label: "New Auto Policy", icon: "🚗" },
            { href: "/admin/invoices", label: "Manage Invoices", icon: "📋" },
          ].map(a => (
            <Link key={a.href} href={a.href} className="card hover:shadow-md transition-shadow cursor-pointer text-center block">
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="text-sm font-medium text-gray-700">{a.label}</div>
            </Link>
          ))}
        </div>
      </div>

      {(stats?.pendingInvoices || 0) > 0 && (
        <div className="p-4 rounded-xl flex items-center justify-between" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <div className="text-sm font-semibold text-orange-800">{stats?.pendingInvoices} Pending Invoice(s)</div>
              <div className="text-xs text-orange-600">Customers have unpaid invoices awaiting action</div>
            </div>
          </div>
          <Link href="/admin/invoices" className="btn-primary text-xs">View Invoices</Link>
        </div>
      )}
    </AdminLayout>
  );
}
