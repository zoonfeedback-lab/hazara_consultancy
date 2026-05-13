import { AdminLayoutBoundary } from "@/components/admin/admin-layout-boundary";
import { ToastProvider } from "@/components/admin/toast";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <ToastProvider>
      <AdminLayoutBoundary email={session?.user?.email ?? null}>{children}</AdminLayoutBoundary>
    </ToastProvider>
  );
}
