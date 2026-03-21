"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { businessApi } from "@/lib/api/businessApi";
import { authStorage } from "@/lib/auth/authStorage";

const LAST_APP_ROUTE_KEY = "sf_last_app_route";

const protectedAppRoutes = [
  "/dashboard",
  "/generate",
  "/history",
  "/business",
  "/usage",
  "/billing",
];

function getLastAppRoute() {
  if (typeof window === "undefined") return "/dashboard";

  const stored = sessionStorage.getItem(LAST_APP_ROUTE_KEY);

  if (stored && protectedAppRoutes.includes(stored)) {
    return stored;
  }

  return "/dashboard";
}

function setLastAppRoute(pathname: string) {
  if (typeof window === "undefined") return;

  if (protectedAppRoutes.includes(pathname)) {
    sessionStorage.setItem(LAST_APP_ROUTE_KEY, pathname);
  }
}

export default function RequireBusiness({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkBusiness = async () => {
      const token = authStorage.getAccessToken();

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const business = await businessApi.getMe();

        if (cancelled) return;

        const hasBusiness = !!business?.id;

        if (hasBusiness) {
          if (pathname === "/onboarding") {
            window.location.href = getLastAppRoute();
            return;
          }

          setLastAppRoute(pathname);
          setReady(true);
          return;
        }

        if (pathname === "/onboarding") {
          setReady(true);
          return;
        }

        window.location.href = "/onboarding";
      } catch (err) {
        if (cancelled) return;

        const msg = err instanceof Error ? err.message : "";

        if (msg.includes("404")) {
          if (pathname === "/onboarding") {
            setReady(true);
            return;
          }

          window.location.href = "/onboarding";
          return;
        }

        authStorage.clear();
        window.location.href = "/login";
      }
    };

    setReady(false);
    checkBusiness();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-600">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}