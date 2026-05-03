"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/customers", label: "Customers", icon: "👥" },
  { href: "/admin/policies/home", label: "Home Policies", icon: "🏠" },
  { href: "/admin/policies/auto", label: "Auto Policies", icon: "🚗" },
  { href: "/admin/vehicles", label: "Vehicles", icon: "🚙" },
  { href: "/admin/invoices", label: "Invoices", icon: "📋" },
];

export default function AdminLayout({ children, title, subtitle }: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--gray-50)" }}>
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--navy)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={2}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="font-semibold text-sm text-gray-800" style={{ fontFamily: "DM Serif Display, serif" }}>NICE Insurance</span>
          </div>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {navLinks.map(l => {
            const active = pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href}
                className={"flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors mb-0.5 " + (
                  active ? "bg-teal-50 text-teal-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                )}>
                <span>{l.icon}</span>
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Sign out</button>
        </div>
      </aside>

      <main className="ml-56 flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl text-gray-800" style={{ fontFamily: "DM Serif Display, serif" }}>{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}
