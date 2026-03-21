"use client";

import { useEffect, useState } from "react";
import {
  subscriptionApi,
  SubscriptionInfo,
} from "@/lib/api/subscriptionApi";
import { usageApi } from "@/lib/api/usageApi";
import { formatUtcToLocal } from "@/lib/utils/format";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useToast } from "@/components/ui/Toast";
import RequireBusiness from "@/components/auth/RequireBusiness";

export default function BillingPage() {
  const [data, setData] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [changing, setChanging] = useState(false);
  const toast = useToast();

  const loadSubscription = async () => {
    try {
      const res = await subscriptionApi.getMe();
      setData(res);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to load subscription");
    } finally {
      setLoading(false);
    }
  };

  const refreshBillingState = async () => {
    const res = await subscriptionApi.getMe();
    setData(res);

    // optional but recommended: refresh usage too so plan limits stay in sync in UI
    try {
      await usageApi.getMe();
    } catch {
      // ignore usage refresh failure here
    }
  };

  useEffect(() => {
    loadSubscription();
  }, []);

  const handleUpgrade = async () => {
    try {
      setChanging(true);

      const res = await subscriptionApi.changePlanToPro();

      // IMPORTANT: backend now returns wrapper object
      setData(res.subscription);

      toast(res.message || "Plan changed to Pro");

      // Re-fetch backend source of truth so UI is always correct
      await refreshBillingState();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to change plan");
    } finally {
      setChanging(false);
    }
  };

  const isPro = data?.planCode?.toLowerCase() === "pro";

  return (
    <RequireBusiness>
    <PageContainer>
      <div className="space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Billing</h1>
          <p className="text-slate-600">
            View your active subscription and manage upgrades.
          </p>
        </section>

        {loading ? (
          <Card>
            <p className="text-slate-600">Loading billing...</p>
          </Card>
        ) : !data ? (
          <Card>
            <p className="text-slate-600">No subscription found.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Current Plan</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {String(data.planCode ?? "-").toUpperCase()}
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {data.status ?? "unknown"}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Start Date
                  </p>
                  <p className="mt-2 text-slate-900">
                    {formatUtcToLocal(data.startDateUtc)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    End Date
                  </p>
                  <p className="mt-2 text-slate-900">
                    {formatUtcToLocal(data.endDateUtc)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <PrimaryButton onClick={handleUpgrade} disabled={changing || isPro}>
                  {changing
                    ? "Changing..."
                    : isPro
                    ? "Already on Pro"
                    : "Upgrade to Pro"}
                </PrimaryButton>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-slate-900">
                Plan Notes
              </h3>
              <p className="mt-2 text-slate-600 leading-7">
                Your billing module is connected to the backend and ready for
                real pricing, checkout, and plan management flows.
              </p>
            </Card>
          </div>
        )}
      </div>
    </PageContainer>
    </RequireBusiness>
  );
}