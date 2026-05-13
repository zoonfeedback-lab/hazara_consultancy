"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Settings } from "@/lib/types/database";

export function AppChrome({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Settings | null;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main className="page-shell flex min-h-[calc(100vh-5rem)] flex-col">{children}</main>
      <SiteFooter settings={settings} />
    </>
  );
}
