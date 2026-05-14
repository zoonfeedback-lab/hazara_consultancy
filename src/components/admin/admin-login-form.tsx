"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (!result || result.error) {
        setError(result?.error || "Invalid email or password.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    });
  };

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <label className="block space-y-2 text-sm font-medium text-[#1F2937]">
        <span>Email Address</span>
        <input
          className="admin-input"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-[#1F2937]">
        <span>Password</span>
        <div className="relative">
          <input
            className="admin-input pr-20"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F2447]"
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </label>

      {error ? <div className="text-[13px] text-[#DC2626]">{error}</div> : null}

      <button
        type="submit"
        disabled={isPending}
        className="admin-button-primary h-12 w-full !bg-[#0F2447] !text-[#C9A84C]"
      >
        {isPending ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-[12px] text-[#1F2937]/50">
        Access restricted to authorized administrators only.
      </p>
    </form>
  );
}
