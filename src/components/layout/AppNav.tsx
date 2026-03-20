"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authStorage } from "@/lib/auth/authStorage";

export default function AppNav() {
  const pathname = usePathname();

  const handleLogout = () => {
    authStorage.clear();
    window.location.href = "/login";
  };

  const dashboardActive = pathname === "/dashboard";
  const generateActive = pathname === "/generate";
  const historyActive = pathname === "/history";
  const businessActive = pathname === "/business";
  const usageActive = pathname === "/usage";
  const billingActive = pathname === "/billing";

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4">
        <Link href="/dashboard" className="text-2xl font-bold text-slate-900">
          SaaSForge Web
        </Link>

        <nav className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className={
              dashboardActive
                ? "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-900 text-white"
                : "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
            }
          >
            <span className={dashboardActive ? "text-white" : "text-slate-700"}>
              Dashboard
            </span>
          </Link>

          <Link
            href="/generate"
            className={
              generateActive
                ? "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-900 text-white"
                : "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
            }
          >
            <span className={generateActive ? "text-white" : "text-slate-700"}>
              Generate
            </span>
          </Link>

          <Link
            href="/history"
            className={
              historyActive
                ? "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-900 text-white"
                : "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
            }
          >
            <span className={historyActive ? "text-white" : "text-slate-700"}>
              History
            </span>
          </Link>

          <Link
            href="/business"
            className={
              businessActive
                ? "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-900 text-white"
                : "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
            }
          >
            <span className={businessActive ? "text-white" : "text-slate-700"}>
              Business
            </span>
          </Link>

          <Link
            href="/usage"
            className={
              usageActive
                ? "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-900 text-white"
                : "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
            }
          >
            <span className={usageActive ? "text-white" : "text-slate-700"}>
              Usage
            </span>
          </Link>

          <Link
            href="/billing"
            className={
              billingActive
                ? "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-900 text-white"
                : "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
            }
          >
            <span className={billingActive ? "text-white" : "text-slate-700"}>
              Billing
            </span>
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="ml-auto rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}