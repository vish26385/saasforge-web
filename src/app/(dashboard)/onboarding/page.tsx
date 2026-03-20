"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { businessApi } from "@/lib/api/businessApi";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";
import TextInput from "@/components/ui/TextInput";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function OnboardingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setLoading(true);

      const trimmedName = name.trim();

      await businessApi.create({
        name: trimmedName,
        slug: trimmedName.toLowerCase().replace(/\s+/g, "-"),
        email: email || null,
        phone: phone || null,
        address: address || null,
        timeZone: timeZone || null,
      });

      router.push("/dashboard");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create business");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Business Onboarding
          </h1>
          <p className="text-slate-600">
            Set up your business profile to start using your SaaS workspace.
          </p>
        </section>

        <Card className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Business Name
              </label>
              <TextInput
                placeholder="Business Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <TextInput
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Phone
              </label>
              <TextInput
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Time Zone
              </label>
              <TextInput
                placeholder="Time Zone"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Address
            </label>
            <TextInput
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <PrimaryButton
              onClick={handleCreate}
              disabled={loading || !name.trim()}
            >
              {loading ? "Saving..." : "Create Business"}
            </PrimaryButton>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}