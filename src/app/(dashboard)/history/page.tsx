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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI History</h1>
          <p className="text-slate-600 mt-1">
            Review previous prompts and generated replies.
          </p>
        </div>

        {loading ? (
          <Card>
            <p>Loading...</p>
          </Card>
        ) : items.length === 0 ? (
          <Card>
            <p>No history found.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <div className="space-y-3">
                  <p>
                    <strong>Prompt:</strong> {item.prompt}
                  </p>
                  <p>
                    <strong>Reply:</strong> {item.response}
                  </p>
                  <p>
                    <strong>Feature:</strong> {item.featureType}
                  </p>
                  <p>
                    <strong>Model:</strong> {item.model || "-"}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {formatUtcToLocal(item.createdAtUtc)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}