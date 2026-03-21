"use client";

import { useState } from "react";
import { aiApi } from "@/lib/api/aiApi";
import { useToast } from "@/components/ui/Toast";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";
import TextArea from "@/components/ui/TextArea";
import PrimaryButton from "@/components/ui/PrimaryButton";
import RequireBusiness from "@/components/auth/RequireBusiness";

const platforms = ["WhatsApp", "Instagram", "Google Reviews"];
const tones = ["Professional", "Friendly", "Empathetic", "Polite"];

export default function GeneratePage() {
  const toast = useToast();

  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("WhatsApp");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    prompt: "",
  });

  const generateReply = async () => {
  let hasError = false;

  const newErrors = {
    prompt: "",
  };

  if (!prompt.trim()) {
    newErrors.prompt = "Customer message is required";
    hasError = true;
  } else if (prompt.trim().length < 5) {
    newErrors.prompt = "Customer message must be at least 5 characters";
    hasError = true;
  }

  setErrors(newErrors);

  if (hasError) return;

  try {
    setLoading(true);

    const res = await aiApi.ask({
      prompt: `
Platform: ${platform}
Tone: ${tone}

Customer Message:
${prompt}

Write a clear, professional, human-like reply.
Keep it polite, helpful, and concise.
`,
      platform,
      tone,
      featureType: "reply-assistant",
    });

    setResult(res.response);
    toast("Reply generated");
  } catch (err) {
    toast(err instanceof Error ? err.message : "Failed to generate");
  } finally {
    setLoading(false);
  }
};

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    toast("Copied to clipboard");
  };

  return (
    <RequireBusiness>
    <PageContainer>
      <div className="space-y-8">
        {/* Header */}
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">AI Generator</h1>
          <p className="text-slate-600">
            Generate professional customer replies instantly.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT */}
          <Card className="space-y-6">
            {/* Platform */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              >
                {platforms.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Tone Quick Buttons */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Tone
              </label>

              <div className="mt-2 flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition
                      ${
                        tone === t
                          ? "bg-indigo-600 text-white"
                          : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Customer Message
              </label>
              <TextArea
                className="mt-2 min-h-[180px]"
                placeholder="Paste customer message or review..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              {errors.prompt && (
                <p className="mt-2 text-sm text-red-500">{errors.prompt}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <PrimaryButton
                onClick={generateReply}
                disabled={loading || !prompt.trim()}
              >
                {loading ? "Generating..." : "Generate Reply"}
              </PrimaryButton>

              {result && (
                <>
                  <button
                    onClick={generateReply}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Regenerate
                  </button>

                  <button
                    onClick={handleCopy}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Copy
                  </button>
                </>
              )}
            </div>
          </Card>

          {/* RIGHT */}
          <Card className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Preview
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Generated reply appears here
              </p>
            </div>

            <div className="min-h-[260px] rounded-xl border border-slate-200 bg-slate-50 p-4">
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
    </RequireBusiness>
  );
}