"use client";

import { useEffect, useState } from "react";
import { businessApi } from "@/lib/api/businessApi";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";
import TextInput from "@/components/ui/TextInput";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function BusinessPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const res = await businessApi.getMe();

        setName(res.name || "");
        setSlug(res.slug || "");
        setEmail(res.email || "");
        setPhone(res.phone || "");
        setAddress(res.address || "");
        setTimeZone(res.timeZone || "");
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to load business");
      } finally {
        setLoading(false);
      }
    };

    loadBusiness();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);

      await businessApi.updateMe({
        name,
        slug: slug || name.toLowerCase().trim().replace(/\s+/g, "-"),
        email: email || null,
        phone: phone || null,
        address: address || null,
        timeZone: timeZone || null,
      });

      alert("Business updated");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update business");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold">Business Profile</h1>
          <p className="text-slate-600 mt-1">
            Manage your business details and contact information.
          </p>
        </div>

        {loading ? (
          <Card>
            <p>Loading...</p>
          </Card>
        ) : (
          <Card className="space-y-4">
            <TextInput
              placeholder="Business Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextInput
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
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

            <PrimaryButton onClick={handleSave}>
              {saving ? "Saving..." : "Update Business"}
            </PrimaryButton>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}