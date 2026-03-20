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
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold">Business Onboarding</h1>
          <p className="text-slate-600 mt-1">
            Set up your business profile to start using the app properly.
          </p>
        </div>

        <Card className="space-y-4">
          <TextInput
            placeholder="Business Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextInput
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextInput
            placeholder="Time Zone"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          />

          <PrimaryButton onClick={handleCreate}>
            {loading ? "Saving..." : "Create Business"}
          </PrimaryButton>
        </Card>
      </div>
    </PageContainer>
  );
}