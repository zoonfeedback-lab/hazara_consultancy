import { AuthShell } from "@/components/auth-shell";
import { RegisterForm } from "@/components/register-form";

export const metadata = {
  title: "Register Now",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create Your Account"
      subtitle="Join hundreds of students preparing for CSS, PMS, and competitive exams across Hazara."
      quote="Confidence grows faster when preparation has structure."
    >
      <RegisterForm />
    </AuthShell>
  );
}
