"use client";

import { useEffect, useState } from "react";
import {
  subscriptionApi,
  SubscriptionInfo,
} from "@/lib/api/subscriptionApi";
import { formatUtcToLocal } from "@/lib/utils/format";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function BillingPage() {
  const [data, setData] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [changing, setChanging] = useState(false);

  const loadSubscription = async () => {
    try {
      const res = await subscriptionApi.getMe();
      setData(res);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to load subscription");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscription();
  }, []);

  const handleUpgrade = async () => {
    try {
      setChanging(true);
      const res = await subscriptionApi.changePlanToPro();
      setData(res);
      alert("Plan changed to Pro");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to change plan");
    } finally {
      setChanging(false);
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-slate-600 mt-1">
            View your current subscription and plan status.
          </p>
        </div>

        {loading ? (
          <Card>
            <p>Loading...</p>
          </Card>
        ) : !data ? (
          <Card>
            <p>No subscription found.</p>
          </Card>
        ) : (
          <Card>
            <div className="space-y-3">
              <p>
                <strong>Plan:</strong> {data.planCode ?? "-"}
              </p>
              <p>
                <strong>Status:</strong> {data.status ?? "-"}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {formatUtcToLocal(data.startDateUtc)}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {formatUtcToLocal(data.endDateUtc)}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {formatUtcToLocal(data.createdAtUtc)}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {formatUtcToLocal(data.updatedAtUtc)}
              </p>

              <div className="pt-2">
                <PrimaryButton onClick={handleUpgrade} disabled={changing}>
                  {changing ? "Changing..." : "Upgrade to Pro"}
                </PrimaryButton>
              </div>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}