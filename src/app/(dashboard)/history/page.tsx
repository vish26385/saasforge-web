"use client";

import { useEffect, useState } from "react";
import { aiApi } from "@/lib/api/aiApi";
import { AiHistoryItem } from "@/lib/types/ai";
import { formatUtcToLocal } from "@/lib/utils/format";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";

export default function HistoryPage() {
  const [items, setItems] = useState<AiHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await aiApi.history();
        setItems(res);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <PageContainer>
      <div className="space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">History</h1>
          <p className="text-slate-600">
            Review previously generated replies and prompts.
          </p>
        </section>

        {loading ? (
          <Card>
            <p className="text-slate-600">Loading history...</p>
          </Card>
        ) : items.length === 0 ? (
          <Card>
            <p className="text-slate-600">No history found yet.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.featureType}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.model || "AI Model"}
                    </span>
                  </div>

                  <span className="text-sm text-slate-500">
                    {formatUtcToLocal(item.createdAtUtc)}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500">Prompt</p>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
                    {item.prompt}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500">Reply</p>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-800 leading-7 whitespace-pre-wrap">
                    {item.response}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}