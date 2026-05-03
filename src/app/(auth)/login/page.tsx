"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeoutMsg, setTimeoutMsg] = useState(false);

  useEffect(() => {
    if (searchParams.get("reason") === "timeout") setTimeoutMsg(true);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setTimeoutMsg(false);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Invalid credentials"); return; }
      if (data.role === "employee") router.push("/admin");
      else router.push("/dashboard");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f0f4f8" }}>
      <header className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#0d1b2a" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={2.5}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "DM Serif Display, serif" }}>NICE Insurance</span>
        </div>
        <Link href="/register" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
          New customer? <span className="text-teal-600 font-medium">Get started</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: "#e0f2fe", color: "#0284c7" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block"></span>
              Auto &amp; Home Insurance Management
            </div>
            <h1 className="text-4xl leading-tight text-gray-900 mb-4" style={{ fontFamily: "DM Serif Display, serif" }}>
              Your insurance,<br /><span style={{ color: "#0096c7" }}>all in one place.</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Manage your home and auto insurance policies, track invoices, and make payments anytime, anywhere.
            </p>
            <div className="space-y-3">
              {[
                { icon: "🏠", text: "Home and auto insurance policies" },
                { icon: "📋", text: "Invoice tracking and online payments" },
                { icon: "🔒", text: "Secure, encrypted account access" },
                { icon: "📊", text: "Real-time analytics and reporting" },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-3">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-sm text-gray-600">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-1" style={{ fontFamily: "DM Serif Display, serif" }}>Sign in</h2>
            <p className="text-sm text-gray-400 mb-6">Enter your credentials to access your account</p>

            {timeoutMsg && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm text-amber-700 bg-amber-50 border border-amber-200">
                Your session expired due to inactivity. Please sign in again.
              </div>
            )}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-600 bg-red-50 border border-red-100">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Email address</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
                <input type="password" required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="........"
                  className="w-full px-4 py-3 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "#0d1b2a" }}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-3">Demo access</p>
              <div className="grid grid-cols-2 gap-2">
                <button type="button"
                  onClick={() => setForm({ email: "admin@nice-insurance.com", password: "password" })}
                  className="py-2.5 px-3 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors">
                  Employee Account
                </button>
                <button type="button"
                  onClick={() => setForm({ email: "customer@nice-insurance.com", password: "password" })}
                  className="py-2.5 px-3 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors">
                  Customer Account
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              No account? <Link href="/register" className="text-teal-600 hover:text-teal-700 font-medium">Create one</Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="px-8 py-4 text-center">
        <p className="text-xs text-gray-400">2026 NICE Insurance - Ibrahim Mohammed and Anurag Kunde - NYU Tandon CS-GY 6083</p>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "#f0f4f8" }} />}>
      <LoginForm />
    </Suspense>
  );
}
