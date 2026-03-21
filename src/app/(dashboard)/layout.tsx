import AppNav from "@/components/layout/AppNav";
import RequireBusiness from "@/components/auth/RequireBusiness";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireBusiness>
      <div className="min-h-screen bg-slate-50">
        <AppNav />
        {children}
      </div>
    </RequireBusiness>
  );
}

