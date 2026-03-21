"use client";

import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";
import RequireBusiness from "@/components/auth/RequireBusiness";

const cards = [
  {
    href: "/generate",
    title: "Generate Reply",
    desc: "Create AI-powered replies for customer messages and reviews.",
    badge: "Core",
  },
  {
    href: "/history",
    title: "History",
    desc: "Review previous prompts and generated responses.",
    badge: "Logs",
  },
  {
    href: "/business",
    title: "Business Profile",
    desc: "Manage your business details and settings.",
    badge: "Setup",
  },
  {
    href: "/usage",
    title: "Usage",
    desc: "Track requests used, limits, and remaining credits.",
    badge: "Metering",
  },
  {
    href: "/billing",
    title: "Billing",
    desc: "View your plan, subscription status, and upgrades.",
    badge: "Revenue",
  },
];

export default function DashboardPage() {
  return (
     <RequireBusiness>
    <PageContainer>
      <div className="space-y-8">
        <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
              SaaSForge Web
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              AI Reply Assistant Dashboard
            </h1>

            <p className="text-slate-300 text-base leading-7">
              Manage your business AI workflows, generate customer replies,
              review history, track usage, and control billing from one place.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
              >
                Generate Reply
              </Link>

              <Link
                href="/billing"
                className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                View Billing
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">Active</p>
            <p className="mt-1 text-sm text-slate-600">
              Your SaaS base is connected and ready.
            </p>
          </Card>

          <Card>
            <p className="text-sm text-slate-500">Core Module</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              AI Replies
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Generate replies for WhatsApp, Instagram, and reviews.
            </p>
          </Card>

          <Card>
            <p className="text-sm text-slate-500">Business</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              Configured
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Business onboarding and profile flow are working.
            </p>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Modules</h2>
              <p className="text-slate-600 text-sm mt-1">
                Use these modules to operate and scale your product.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card) => (
              <Link key={card.href} href={card.href}>
                <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-slate-900">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 leading-7">{card.desc}</p>
                    </div>

                    <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                      {card.badge}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
    </RequireBusiness>
  );
}