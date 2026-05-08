import Link from "next/link";
import { stats } from "@/lib/site-data";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  quote: string;
};

export function AuthShell({ title, subtitle, children, quote }: AuthShellProps) {
  return (
    <section className="auth-layout">
      <div className="auth-split">
        <aside className="auth-brand-panel hidden h-screen shrink-0 basis-[42%] flex-col justify-between px-10 py-9 text-cream md:flex">
          <Link href="/" className="block w-[248px]">
            <div className="display-title text-[20px] leading-tight text-cream">
              Hazara Global Consultancy
            </div>
            <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              Premium Mentorship Academy
            </div>
          </Link>

          <div className="relative max-w-[320px]">
            <span className="auth-quote-mark">“</span>
            <p className="display-title relative z-10 text-[32px] italic leading-[1.3] text-gold">
              {quote}
            </p>
            <div className="mt-8 h-px bg-gold/20" />
            <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream/84">
              Hazara Global Consultancy, Abbottabad
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="trust-pill">
                <div className="display-title text-[28px] leading-none text-gold">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-cream/82">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="auth-form-panel basis-[58%] bg-cream">
          <div className="bg-navy px-5 py-5 sm:px-8 md:hidden">
            <Link href="/" className="block w-[220px]">
              <div className="display-title text-[1.2rem] leading-tight text-cream">
                Hazara Global Consultancy
              </div>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                Premium Mentorship Academy
              </div>
            </Link>
          </div>

          <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8 md:px-10 lg:px-12">
            <div className="auth-card-entry w-full max-w-[520px]">
              <h1 className="display-title text-[34px] leading-tight text-navy">{title}</h1>
              {subtitle ? (
                <p className="mt-3 max-w-[500px] font-[var(--font-dm-sans)] text-[15px] leading-7 text-ink/70">
                  {subtitle}
                </p>
              ) : null}
              <div className="mt-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
