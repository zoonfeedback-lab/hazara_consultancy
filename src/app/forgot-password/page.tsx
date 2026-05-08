import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";

export const metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset Your Password"
      subtitle="Enter your email address and we’ll send recovery instructions when the workflow is connected."
      quote="The strongest systems make recovery feel calm, not confusing."
    >
      <div className="card-shell rounded-[24px] border border-navy/8 bg-paper p-6 shadow-[0_20px_44px_rgba(15,36,71,0.08)] sm:p-8">
        <form className="space-y-5">
          <div>
            <label className="field-label" htmlFor="reset-email">
              Email Address
            </label>
            <input
              id="reset-email"
              type="email"
              className="field-input mt-2"
              placeholder="name@example.com"
            />
          </div>
          <button
            type="button"
            className="button-primary w-full justify-center rounded-[14px] bg-navy py-4 text-gold hover:bg-gold hover:text-navy"
          >
            Send Recovery Link
          </button>
          <div className="text-center">
            <Link href="/sign-in" className="text-sm font-medium text-gold hover:text-navy">
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </AuthShell>
  );
}
