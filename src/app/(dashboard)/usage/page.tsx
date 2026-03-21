"use client";

import { useEffect, useState } from "react";
import { usageApi, UsageInfo } from "@/lib/api/usageApi";
import { formatUtcToLocal } from "@/lib/utils/format";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import RequireBusiness from "@/components/auth/RequireBusiness";

export default function UsagePage() {
  const [data, setData] = useState<UsageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadUsage = async () => {
      try {
        const res = await usageApi.getMe();
        setData(res);
      } catch (err) {
        toast(err instanceof Error ? err.message : "Failed to load usage");
      } finally {
        setLoading(false);
      }
    };

    loadUsage();
  }, []);

  const used = data?.aiRequestsUsed ?? 0;
  const limit = data?.aiRequestLimit ?? 0;
  const remaining = limit - used;
  const percent =
    limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;

  return (
    <RequireBusiness>
    <PageContainer>
      <div className="space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Usage</h1>
          <p className="text-slate-600">
            Monitor request consumption and current plan usage.
          </p>
        </section>

        {loading ? (
          <Card>
            <p className="text-slate-600">Loading usage...</p>
          </Card>
        ) : !data ? (
          <Card>
            <p className="text-slate-600">No usage data found.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-slate-500">Plan</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {data.planCode ?? "-"}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Used</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {used}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-slate-500">Remaining</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {remaining >= 0 ? remaining : 0}
                </p>
              </Card>
            </div>

            <Card className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Request Usage
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {used} of {limit} AI requests used
                  </p>
                </div>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  {percent}% used
                </span>
              </div>

              <div className="h-3 w-full rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Current Period Start
                  </p>
                  <p className="mt-2 text-slate-900">
                    {formatUtcToLocal(data.currentPeriodStartUtc)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Last Updated
                  </p>
                  <p className="mt-2 text-slate-900">
                    {formatUtcToLocal(data.lastUpdatedAtUtc)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageContainer>
    </RequireBusiness>
  );
}