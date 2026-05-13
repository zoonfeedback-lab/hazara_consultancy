"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main className="page-shell flex min-h-[calc(100vh-5rem)] flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
