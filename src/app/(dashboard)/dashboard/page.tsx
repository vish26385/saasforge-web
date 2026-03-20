"use client";

import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import Card from "@/components/ui/Card";

const cards = [
  {
    href: "/generate",
    title: "Generate Reply",
    desc: "Create AI-powered replies for customer messages and reviews.",
  },
  {
    href: "/history",
    title: "History",
    desc: "See previous AI prompts and replies.",
  },
  {
    href: "/business",
    title: "Business Profile",
    desc: "Manage your business information.",
  },
  {
    href: "/usage",
    title: "Usage",
    desc: "Track request usage and remaining limits.",
  },
  {
    href: "/billing",
    title: "Billing",
    desc: "View your plan and subscription details.",
  },
];

export default function DashboardPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Your AI Reply Assistant base is working.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Link key={card.href} href={card.href}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="text-slate-600 mt-2">{card.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}