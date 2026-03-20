"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/authApi";
import { authStorage } from "@/lib/auth/authStorage";
import Card from "@/components/ui/Card";
import TextInput from "@/components/ui/TextInput";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const res = await authApi.register({
        fullName,
        email,
        password,
      });

      authStorage.setTokens(res.token, res.refreshToken);
      router.push("/onboarding");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">
        <section className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white">
          <div>
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              SaaSForge Web
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              Launch your AI SaaS with a reusable frontend base
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Create your account, set up your business, and start building AI
              automation products on top of this base template.
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <p>✔ Authentication ready</p>
            <p>✔ Dashboard and navigation ready</p>
            <p>✔ AI module, usage, and billing ready</p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 lg:p-12">
          <Card className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Create account
              </h2>
              <p className="text-slate-600">
                Start your AI reply assistant
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <TextInput
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <TextInput
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <PrimaryButton
              onClick={handleRegister}
              disabled={
                loading ||
                !fullName.trim() ||
                !email.trim() ||
                !password.trim()
              }
              className="w-full"
            >
              {loading ? "Creating account..." : "Register"}
            </PrimaryButton>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-slate-900 hover:underline"
              >
                Login
              </Link>
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
}