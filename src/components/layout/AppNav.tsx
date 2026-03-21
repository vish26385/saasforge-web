"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authStorage } from "@/lib/auth/authStorage";

const fullNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/generate", label: "Generate" },
  { href: "/history", label: "History" },
  { href: "/business", label: "Business" },
  { href: "/usage", label: "Usage" },
  { href: "/billing", label: "Billing" },
];

const onboardingNavItems = [{ href: "/onboarding", label: "Onboarding" }];

export default function AppNav() {
  const pathname = usePathname();

  const isOnboardingOnly = pathname === "/onboarding";
  const navItems = isOnboardingOnly ? onboardingNavItems : fullNavItems;

  const handleLogout = () => {
    authStorage.clear();
    window.location.href = "/login";
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-8">
          <Link
            href={isOnboardingOnly ? "/onboarding" : "/dashboard"}
            className="text-2xl font-bold text-slate-900"
          >
            SaaSForge Web
          </Link>

          <nav className="flex items-center gap-3">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium transition"
                      : "inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
                  }
                >
                  <span className={active ? "text-white" : "text-slate-800"}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}