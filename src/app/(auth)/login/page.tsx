"use client";

import { useState } from "react";
import { authApi } from "@/lib/api/authApi";
import { authStorage } from "@/lib/auth/authStorage";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Card from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await authApi.login({
        email,
        password,
      });

      authStorage.setTokens(res.token, res.refreshToken);

      try {
        const { businessApi } = await import("@/lib/api/businessApi");
        await businessApi.getMe();
        router.push("/dashboard");
      } catch {
        router.push("/onboarding");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <Card className="w-full max-w-md space-y-5">
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-slate-600">Login to your SaaSForge account</p>
        </div>

        <TextInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PrimaryButton onClick={handleLogin} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </PrimaryButton>
      </Card>
    </main>
  );
}