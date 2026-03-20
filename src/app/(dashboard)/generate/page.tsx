"use client";

import { useState } from "react";
import { aiApi } from "@/lib/api/aiApi";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";
import TextArea from "@/components/ui/TextArea";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await aiApi.ask({
        prompt,
        platform: "WhatsApp",
        tone: "Professional",
        featureType: "reply-assistant",
      });

      setResult(res.response);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    alert("Reply copied");
  };

  return (
    <PageContainer>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold">AI Generator</h1>
          <p className="text-slate-600 mt-1">
            Paste a customer message and generate a reply.
          </p>
        </div>

        <Card className="space-y-4">
          <TextArea
            className="min-h-[140px]"
            placeholder="Enter customer message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="flex gap-3">
            <PrimaryButton onClick={handleGenerate}>
              {loading ? "Generating..." : "Generate Reply"}
            </PrimaryButton>

            {result ? (
              <button
                onClick={handleCopy}
                className="rounded-lg border border-slate-300 px-4 py-2"
              >
                Copy Reply
              </button>
            ) : null}
          </div>
        </Card>

        {result ? (
          <Card>
            <h2 className="text-xl font-semibold mb-3">AI Reply</h2>
            <p className="leading-7 whitespace-pre-wrap">{result}</p>
          </Card>
        ) : null}
      </div>
    </PageContainer>
  );
}