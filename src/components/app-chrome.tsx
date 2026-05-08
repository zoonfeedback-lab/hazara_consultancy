"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const authRoutes = new Set(["/sign-in", "/register", "/forgot-password"]);

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.has(pathname);

  if (isAuthRoute) {
    return <main className="page-shell flex min-h-screen flex-col">{children}</main>;
  }

  return (
    <>
      <SiteHeader />
      <main className="page-shell flex min-h-[calc(100vh-5rem)] flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
