"use client";

import { usePathname } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";

type AdminLayoutBoundaryProps = {
  children: React.ReactNode;
  email: string | null;
};

export function AdminLayoutBoundary({ children, email }: AdminLayoutBoundaryProps) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminShell email={email}>{children}</AdminShell>;
}
