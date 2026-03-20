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
      <div className="space-y-8 max-w-4xl">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Business Profile
          </h1>
          <p className="text-slate-600">
            Manage your business identity and contact information.
          </p>
        </section>

        {loading ? (
          <Card>
            <p className="text-slate-600">Loading business profile...</p>
          </Card>
        ) : (
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
                  Slug
                </label>
                <TextInput
                  placeholder="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
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
            </div>

            <div className="grid gap-4">
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

            <div className="pt-2">
              <PrimaryButton onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Update Business"}
              </PrimaryButton>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}