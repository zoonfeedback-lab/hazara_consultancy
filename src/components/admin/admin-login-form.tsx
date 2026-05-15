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
    <div className="rounded-none bg-transparent lg:rounded-[1rem] lg:bg-white lg:p-10 lg:shadow-[0_20px_60px_rgba(15,36,71,0.12)]">
      <div className="hidden border-t-[3px] border-[#C9A84C] lg:block" />
      <div className="pt-0 lg:pt-7">
        <div className="display-title text-3xl font-bold text-[#0F2447]">Admin Portal</div>
        <div className="mt-2 mb-8 text-xs uppercase tracking-[0.2em] text-[#C9A84C]">
          Hazara Global Consultancy
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">
              Email Address
            </span>
            <input
              className="admin-login-input"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">
              Password
            </span>
            <div className="relative">
              <input
                className="admin-login-input pr-20"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A84C]"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </label>

          <div className={`admin-login-error ${error ? "is-visible" : ""}`} aria-live="polite">
            <span className="mt-[1px] text-sm leading-none">⚠</span>
            <span>{error}</span>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={isPending}
              className="admin-login-submit"
            >
              {isPending ? <span className="admin-login-spinner" aria-hidden="true" /> : "Sign In"}
            </button>
          </div>

          <p className="pt-1 text-center text-xs text-gray-400">
            Access restricted to authorized administrators only.
          </p>
        </form>
      </div>
    </div>
  );
}
