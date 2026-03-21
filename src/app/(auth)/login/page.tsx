"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/authApi";
import { businessApi } from "@/lib/api/businessApi";
import { authStorage } from "@/lib/auth/authStorage";
import { useToast } from "@/components/ui/Toast";
import Card from "@/components/ui/Card";
import TextInput from "@/components/ui/TextInput";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  let hasError = false;

  const newErrors = {
    email: "",
    password: "",
  };

  if (!email.trim()) {
    newErrors.email = "Email is required";
    hasError = true;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format";
    hasError = true;
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
    hasError = true;
  }

  setErrors(newErrors);

  if (hasError) return;

  try {
    setLoading(true);

    const res = await authApi.login({ email, password });

    authStorage.setTokens(res.token, res.refreshToken);

    try {
      const business = await businessApi.getMe();

      if (business?.id) {
        toast("Login successful");
        window.location.href = "/dashboard";
      } else {
        toast("Please complete onboarding");
        window.location.href = "/onboarding";
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";

      if (msg.includes("404")) {
        toast("Please complete onboarding");
        window.location.href = "/onboarding";
      } else {
        window.location.href = "/dashboard";
      }
    }
  } catch (err) {
    const rawMessage = err instanceof Error ? err.message : "";

    let message = "Something went wrong. Please try again.";

    if (
      rawMessage.includes("Unauthorized") ||
      rawMessage.includes("401")
    ) {
      message = "Invalid email or password";
    } else if (rawMessage.trim()) {
      // Remove "401: " or "500: " prefix if exists
      message = rawMessage.replace(/^\d+:\s*/, "");
    }

    toast(message);
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
              AI reply workflows for modern businesses
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Generate professional customer replies, manage business setup,
              track usage, and control billing from one clean dashboard.
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <p>✔ AI reply generation</p>
            <p>✔ Usage and billing visibility</p>
            <p>✔ Reusable SaaS base template</p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 lg:p-12">
          <Card className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Welcome back
              </h2>
              <p className="text-slate-600">
                Login to your SaaSForge account
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>                
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>                
                <TextInput
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <PrimaryButton
              onClick={handleLogin}
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </PrimaryButton>

            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-slate-900 hover:underline"
              >
                Register
              </Link>
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
}