"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { adminSignOut } from "@/lib/actions/admin/auth";

type AdminShellProps = {
  children: React.ReactNode;
  email: string | null;
};

const navigation = [
  { href: "/admin/dashboard", icon: GridIcon, label: "Dashboard" },
  { href: "/admin/inquiries", icon: InboxIcon, label: "Inquiries" },
  { href: "/admin/blog", icon: FileTextIcon, label: "Blog Posts" },
  { href: "/admin/services", icon: BriefcaseIcon, label: "Services" },
  { href: "/admin/programs", icon: BookOpenIcon, label: "Programs" },
  { href: "/admin/events", icon: CalendarIcon, label: "Events" },
  { href: "/admin/testimonials", icon: QuoteIcon, label: "Testimonials" },
  { href: "/admin/announcements", icon: MegaphoneIcon, label: "Announcements" },
  { href: "/admin/media", icon: ImageIcon, label: "Media" },
  { href: "/admin/settings", icon: SettingsIcon, label: "Settings" },
];

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/admin/blog/new")) return "New Blog Post";
  if (pathname.startsWith("/admin/blog/")) return "Edit Blog Post";
  if (pathname.startsWith("/admin/services/new")) return "New Service";
  if (pathname.startsWith("/admin/services/")) return "Edit Service";
  if (pathname.startsWith("/admin/programs/new")) return "New Program";
  if (pathname.startsWith("/admin/programs/")) return "Edit Program";
  if (pathname.startsWith("/admin/events/new")) return "New Event";
  if (pathname.startsWith("/admin/events/")) return "Edit Event";

  const current = navigation.find((item) => pathname.startsWith(item.href));
  return current?.label ?? "Admin Portal";
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children, email }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = useMemo(() => getPageTitle(pathname), [pathname]);
  const initial = (email ?? "A").charAt(0).toUpperCase();

  return (
    <div className="admin-root">
      <aside className="fixed inset-y-0 left-0 z-40 hidden bg-[#0F2447] md:flex md:w-16 lg:w-[260px]">
        <SidebarContent email={email} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
      </aside>

      <div
        className={`fixed inset-0 z-[70] bg-black/45 transition md:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <aside
          className={`absolute inset-y-0 left-0 w-[260px] bg-[#0F2447] transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <SidebarContent email={email} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </aside>
      </div>

      <div className="md:pl-16 lg:pl-[260px]">
        <header className="fixed left-0 right-0 top-0 z-30 border-b border-[#EEEEEE] bg-white md:left-16 lg:left-[260px]">
          <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open admin navigation"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E5E7EB] text-[#0F2447] md:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </svg>
              </button>
              <div className="text-lg font-semibold text-[#0F2447]">{title}</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <div className="text-[13px] text-[#1F2937]/60">{email ?? "admin@hazaraglobal.com"}</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A84C] text-sm font-bold text-[#0F2447]">
                {initial}
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-screen overflow-y-auto pt-16">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  email,
  onNavigate,
  pathname,
}: {
  email: string | null;
  onNavigate: () => void;
  pathname: string;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="px-6 py-6 lg:px-6">
        <div className="text-center text-sm font-bold text-[#FAF8F4] lg:text-left lg:text-[18px]">
          <span className="md:inline lg:hidden">HGC</span>
          <span className="hidden lg:inline">Hazara Global Consultancy</span>
        </div>
        <div className="mt-2 hidden text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] lg:block">
          Premium Mentorship Academy
        </div>
        <div className="mt-5 hidden h-px bg-[#C9A84C]/20 lg:block" />
      </div>

      <nav className="flex-1 space-y-1 px-2 lg:px-3">
        {navigation.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-12 items-center rounded-r-[10px] transition duration-150 ${
                active
                  ? "border-l-[3px] border-[#C9A84C] bg-[#17335F] text-[#FAF8F4]"
                  : "border-l-[3px] border-transparent text-[#FAF8F4]/70 hover:bg-white/5 hover:text-[#FAF8F4]"
              } gap-3 justify-center px-0 lg:justify-start lg:px-4`}
              onClick={onNavigate}
              title={item.label}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden text-sm lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6">
        <form action={adminSignOut}>
          <button type="submit" className="admin-button-secondary w-full !bg-white/10 !text-[#FAF8F4]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            <span className="hidden lg:inline">Sign Out</span>
          </button>
        </form>
        <div className="mt-3 hidden text-[11px] text-[#FAF8F4]/45 lg:block">{email ?? "Admin session"}</div>
      </div>
    </div>
  );
}

function IconBase({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      {children}
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="currentColor" />
    </IconBase>
  );
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path
        d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M4 12h4l2 3h4l2-3h4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M7 3h7l5 5v13H7z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 3v5h5M9 13h6M9 17h6" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M9 6V4h6v2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="6" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 11h18" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5A2.5 2.5 0 0 0 17.5 16H4z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 5.5V19a2 2 0 0 0 2 2h12" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v4M16 3v4M3 10h18" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M8 10a4 4 0 0 0-4 4v4h6v-4H7a2 2 0 0 1 2-2V6H5M19 10a4 4 0 0 0-4 4v4h6v-4h-3a2 2 0 0 1 2-2V6h-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </IconBase>
  );
}

function MegaphoneIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M3 11v2a2 2 0 0 0 2 2h2l3 4h2v-4l6-2V7l-6-2V1h-2v4H5a2 2 0 0 0-2 2v2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
      <path d="m21 15-4.5-4.5L8 19" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 1 0 12 8.5z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m19.4 15 .8 1.4-1.8 3.1-1.7-.3a7.9 7.9 0 0 1-1.3.8L13 22h-2l-.4-1.7a7.9 7.9 0 0 1-1.3-.8l-1.7.3-1.8-3.1.8-1.4a7.7 7.7 0 0 1 0-1.6l-.8-1.4 1.8-3.1 1.7.3c.4-.3.8-.5 1.3-.8L11 2h2l.4 1.7c.5.2.9.5 1.3.8l1.7-.3 1.8 3.1-.8 1.4c.1.5.1 1 0 1.6Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </IconBase>
  );
}
