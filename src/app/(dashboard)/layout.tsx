import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AppNav from "@/components/layout/AppNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AppNav />
      {children}
    </ProtectedRoute>
  );
}