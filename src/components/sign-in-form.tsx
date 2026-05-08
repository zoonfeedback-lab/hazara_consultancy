"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Mode = "student" | "admin";

type SignInErrors = {
  email?: string;
  password?: string;
  adminCode?: string;
};

const toggles: Array<{ mode: Mode; label: string; icon: Mode }> = [
  { mode: "student", label: "Student", icon: "student" },
  { mode: "admin", label: "Admin", icon: "admin" },
];

function ToggleIcon({ type, active }: { type: Mode; active: boolean }) {
  const stroke = active ? "#FFFFFF" : "#2C2C2C";

  if (type === "student") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M3 7L10 3L17 7L10 11L3 7Z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M6 9.5V13C6 14.6569 7.79086 16 10 16C12.2091 16 14 14.6569 14 13V9.5"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="12" height="12" rx="2.5" stroke={stroke} strokeWidth="1.6" />
      <path d="M7 10H13" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 7V13" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SignInForm() {
  const [mode, setMode] = useState<Mode>("student");
  const [values, setValues] = useState({
    email: "",
    password: "",
    adminCode: "",
  });
  const [errors, setErrors] = useState<SignInErrors>({});

  const isAdmin = mode === "admin";

  const canSubmit = useMemo(() => {
    if (!values.email || !values.password) {
      return false;
    }

    if (isAdmin && !values.adminCode) {
      return false;
    }

    return true;
  }, [isAdmin, values]);

  function validate(next = values, nextMode = mode) {
    const nextErrors: SignInErrors = {};

    if (!next.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(next.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!next.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (next.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (nextMode === "admin") {
      if (!next.adminCode.trim()) {
        nextErrors.adminCode = "Admin access code is required.";
      } else if (next.adminCode.trim().length < 4) {
        nextErrors.adminCode = "Enter the short admin access code.";
      }
    }

    return nextErrors;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      window.alert(`${mode === "student" ? "Student" : "Admin"} sign-in is not wired yet.`);
    }
  }

  return (
    <div className="auth-form-card p-6 sm:p-8 md:p-12">
      <div className="auth-toggle-shell">
        {toggles.map((toggle) => {
          const active = toggle.mode === mode;
          return (
            <button
              key={toggle.mode}
              type="button"
              onClick={() => {
                setMode(toggle.mode);
                setErrors(validate(values, toggle.mode));
              }}
              className={`auth-toggle-card flex min-h-[84px] flex-col items-center justify-center gap-2 px-5 py-4 ${
                active ? "is-active" : ""
              }`}
            >
              <ToggleIcon type={toggle.icon} active={active} />
              <span className="font-[var(--font-dm-sans)] text-sm font-semibold uppercase tracking-[0.12em]">
                {toggle.label}
              </span>
            </button>
          );
        })}
      </div>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <div>
          <label className="field-label" htmlFor="signin-email">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            value={values.email}
            onChange={(event) =>
              setValues((current) => ({ ...current, email: event.target.value }))
            }
            onBlur={() => setErrors(validate())}
            className={`field-input ${errors.email ? "field-error" : ""}`}
            placeholder="student@hazara.edu.pk"
          />
          {errors.email ? <p className="mt-2 text-sm text-[#D64545]">{errors.email}</p> : null}
        </div>

        <div>
          <label className="field-label" htmlFor="signin-password">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            value={values.password}
            onChange={(event) =>
              setValues((current) => ({ ...current, password: event.target.value }))
            }
            onBlur={() => setErrors(validate())}
            className={`field-input ${errors.password ? "field-error" : ""}`}
            placeholder="••••••••"
          />
          {errors.password ? <p className="mt-2 text-sm text-[#D64545]">{errors.password}</p> : null}
        </div>

        {isAdmin ? (
          <div className="admin-code-enter">
            <label className="field-label" htmlFor="signin-admin-code">
              Admin Access Code
            </label>
            <input
              id="signin-admin-code"
              type="text"
              value={values.adminCode}
              onChange={(event) =>
                setValues((current) => ({ ...current, adminCode: event.target.value }))
              }
              onBlur={() => setErrors(validate())}
              className={`field-input ${errors.adminCode ? "field-error" : ""}`}
              placeholder="HGC-ADMIN"
            />
            {errors.adminCode ? <p className="mt-2 text-sm text-[#D64545]">{errors.adminCode}</p> : null}
          </div>
        ) : null}

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm font-medium text-gold hover:text-navy">
            Forgot Password
          </Link>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="button-primary mt-7 w-full justify-center rounded-[10px] bg-navy py-[15px] text-[12px] tracking-[0.18em] text-gold enabled:hover:bg-gold enabled:hover:text-navy enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55"
        >
          Sign In
        </button>

        <p className="pt-4 text-center text-sm text-ink/74">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-gold hover:text-navy">
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
}
