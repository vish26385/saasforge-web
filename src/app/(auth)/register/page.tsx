"use client";

import { useState } from "react";
import { authApi } from "@/lib/api/authApi";
import { authStorage } from "@/lib/auth/authStorage";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Card from "@/components/ui/Card";

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
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <Card className="w-full max-w-md space-y-5">
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-bold">Create account</h1>
          <p className="text-slate-600">Start your AI reply assistant</p>
        </div>

        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

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

        <PrimaryButton onClick={handleRegister} className="w-full">
          {loading ? "Creating account..." : "Register"}
        </PrimaryButton>
      </Card>
    </main>
  );
}