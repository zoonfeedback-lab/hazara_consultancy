"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="page-shell flex min-h-[calc(100vh-5rem)] flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
