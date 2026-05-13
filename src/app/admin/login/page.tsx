import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { auth } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] font-[family:var(--font-dm-sans)]">
      <div className="flex h-16 items-center bg-[#0F2447] px-6">
        <div className="text-lg font-bold text-[#FAF8F4]">Hazara Global Consultancy</div>
      </div>

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-[440px] rounded-[16px] bg-white px-8 py-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:px-12 md:py-12">
          <div className="text-[28px] font-bold text-[#0F2447]">Admin Portal</div>
          <div className="mt-2 text-[13px] uppercase tracking-[0.22em] text-[#C9A84C]">
            Hazara Global Consultancy
          </div>

          <div className="mt-8">
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
