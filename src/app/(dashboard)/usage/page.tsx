"use client";

import { useEffect, useState } from "react";
import { usageApi, UsageInfo } from "@/lib/api/usageApi";
import { formatUtcToLocal } from "@/lib/utils/format";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";

export default function UsagePage() {
  const [data, setData] = useState<UsageInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsage = async () => {
      try {
        const res = await usageApi.getMe();
        setData(res);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to load usage");
      } finally {
        setLoading(false);
      }
    };

    loadUsage();
  }, []);

  const remaining =
    data?.aiRequestLimit != null && data?.aiRequestsUsed != null
      ? data.aiRequestLimit - data.aiRequestsUsed
      : null;

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Usage</h1>
          <p className="text-slate-600 mt-1">
            Track current usage against your request limits.
          </p>
        </div>

        {loading ? (
          <Card>
            <p>Loading...</p>
          </Card>
        ) : !data ? (
          <Card>
            <p>No usage data found.</p>
          </Card>
        ) : (
          <Card>
            <div className="space-y-3">
              <p>
                <strong>Business ID:</strong> {data.businessId ?? "-"}
              </p>
              <p>
                <strong>Plan Code:</strong> {data.planCode ?? "-"}
              </p>
              <p>
                <strong>AI Requests Used:</strong> {data.aiRequestsUsed ?? "-"}
              </p>
              <p>
                <strong>AI Request Limit:</strong> {data.aiRequestLimit ?? "-"}
              </p>
              <p>
                <strong>Remaining:</strong> {remaining ?? "-"}
              </p>
              <p>
                <strong>Current Period Start:</strong>{" "}
                {formatUtcToLocal(data.currentPeriodStartUtc)}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {formatUtcToLocal(data.lastUpdatedAtUtc)}
              </p>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}