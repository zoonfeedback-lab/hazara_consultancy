import { AuthShell } from "@/components/auth-shell";
import { SignInForm } from "@/components/sign-in-form";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <AuthShell
      title="Sign In"
      quote="Your civil service journey starts here."
    >
      <SignInForm />
    </AuthShell>
  );
}
