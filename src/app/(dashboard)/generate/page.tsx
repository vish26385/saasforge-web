"use client";

import { useState } from "react";
import { aiApi } from "@/lib/api/aiApi";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";
import TextArea from "@/components/ui/TextArea";
import PrimaryButton from "@/components/ui/PrimaryButton";

const platforms = ["WhatsApp", "Instagram", "Google Reviews"];
const tones = ["Professional", "Friendly", "Empathetic", "Polite"];

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("WhatsApp");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await aiApi.ask({
        prompt,
        platform,
        tone,
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
      <div className="space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">AI Generator</h1>
          <p className="text-slate-600">
            Generate professional customer replies for chats, messages, and reviews.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
                >
                  {platforms.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
                >
                  {tones.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Customer Message
              </label>
              <TextArea
                className="min-h-[180px]"
                placeholder="Paste the customer message or review here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={handleGenerate} disabled={loading || !prompt.trim()}>
                {loading ? "Generating..." : "Generate Reply"}
              </PrimaryButton>

              {result ? (
                <button
                  onClick={handleCopy}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Copy Reply
                </button>
              ) : null}
            </div>
          </Card>

          <Card className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Preview</h2>
              <p className="text-sm text-slate-600 mt-1">
                Your generated reply will appear here.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 min-h-[240px]">
              {result ? (
                <p className="whitespace-pre-wrap leading-7 text-slate-800">
                  {result}
                </p>
              ) : (
                <p className="text-slate-400">
                  No reply generated yet.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}