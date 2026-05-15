import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { auth } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="admin-login-shell min-h-screen overflow-hidden bg-[#FAF8F4] font-[family:var(--font-dm-sans)] lg:flex">
      <aside className="admin-login-brand-panel admin-login-panel-fade relative hidden h-screen flex-[0_0_45%] overflow-hidden lg:flex lg:flex-col">
        <div className="relative z-10 p-8">
          <div className="display-title text-xl font-bold text-[#FAF8F4]">
            Hazara Global Consultancy
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[#C9A84C]">
            Premium Mentorship Academy
          </div>
        </div>

        <div className="relative z-10 flex flex-1 items-center px-8">
          <div className="admin-login-quote-fade relative max-w-md">
            <div className="pointer-events-none absolute -left-5 -top-20 font-[family:var(--font-display)] text-[8rem] leading-none text-[#C9A84C]/15">
              &quot;
            </div>
            <div className="font-[family:var(--font-display)] text-2xl italic leading-relaxed text-[#C9A84C]">
              &quot;Shaping the civil servants of tomorrow, today.&quot;
            </div>
            <div className="my-4 w-12 border-t border-[#C9A84C] opacity-30" />
            <div className="text-xs uppercase tracking-[0.15em] text-[#FAF8F4]/50">
              Hazara Global Consultancy, Abbottabad
            </div>
          </div>
        </div>

        <div className="relative z-10 p-8">
          <div className="flex items-stretch gap-5">
            {[
              { value: "800+", label: "Students Mentored" },
              { value: "87%", label: "Pass Rate" },
              { value: "42+", label: "Programs Launched" },
            ].map((stat, index) => (
              <div key={stat.label} className="flex flex-1 items-center gap-5">
                <div>
                  <div className="font-[family:var(--font-display)] text-2xl font-bold text-[#C9A84C]">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[#FAF8F4]/60">
                    {stat.label}
                  </div>
                </div>
                {index < 2 ? <div className="h-12 w-px bg-[#C9A84C]/20" /> : null}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="admin-login-form-panel admin-login-form-fade flex min-h-screen flex-1 items-center justify-center border-t-[3px] border-[#C9A84C] bg-[#FAF8F4] px-6 py-8 lg:border-t-0 lg:px-10">
        <div className="w-full max-w-md">
          <div className="pt-8 text-center lg:hidden">
            <div className="display-title text-[1.75rem] font-bold text-[#0F2447]">
              Hazara Global Consultancy
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#C9A84C]">
              Premium Mentorship Academy
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <AdminLoginForm />
          </div>
        </div>
      </main>
    </div>
  );
}
