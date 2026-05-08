"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CustomSelect } from "@/components/custom-select";

type RegisterErrors = Partial<
  Record<
    | "fullName"
    | "email"
    | "phone"
    | "city"
    | "program"
    | "password"
    | "confirmPassword"
    | "terms",
    string
  >
>;

const cities = [
  "Abbottabad",
  "Mansehra",
  "Haripur",
  "Peshawar",
  "Battagram",
  "Other",
];

const programs = [
  "CSS Preparation",
  "PMS Preparation",
  "Bootcamp",
  "Career Consultancy",
  "Writing Services",
  "General Inquiry",
];

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    program: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});

  const passwordMatchState = useMemo(() => {
    if (!values.confirmPassword) {
      return "idle";
    }

    return values.password === values.confirmPassword ? "match" : "mismatch";
  }, [values.confirmPassword, values.password]);

  function validate(next = values) {
    const nextErrors: RegisterErrors = {};

    if (!next.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!next.email.trim()) nextErrors.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(next.email)) nextErrors.email = "Enter a valid email address.";
    if (!next.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!next.city) nextErrors.city = "Please choose a city.";
    if (!next.program) nextErrors.program = "Please select a program.";
    if (!next.password.trim()) nextErrors.password = "Password is required.";
    else if (next.password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    if (!next.confirmPassword.trim()) nextErrors.confirmPassword = "Please confirm your password.";
    else if (next.confirmPassword !== next.password) nextErrors.confirmPassword = "Passwords do not match.";
    if (!next.terms) nextErrors.terms = "You must agree to continue.";

    return nextErrors;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      window.alert("Registration is not wired yet.");
    }
  }

  const inputType = showPassword ? "text" : "password";

  return (
    <div className="auth-form-card p-6 sm:p-8 md:p-12">
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="form-grid-two">
          <div>
            <label className="field-label" htmlFor="register-name">
              Full Name
            </label>
            <input
              id="register-name"
              value={values.fullName}
              onChange={(event) =>
                setValues((current) => ({ ...current, fullName: event.target.value }))
              }
              onBlur={() => setErrors(validate())}
              className={`field-input ${errors.fullName ? "field-error" : ""}`}
              placeholder="Your full name"
            />
            {errors.fullName ? <p className="mt-2 text-sm text-[#D64545]">{errors.fullName}</p> : null}
          </div>

          <div>
            <label className="field-label" htmlFor="register-email">
              Email Address
            </label>
            <input
              id="register-email"
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
            <label className="field-label" htmlFor="register-phone">
              Phone Number
            </label>
            <input
              id="register-phone"
              value={values.phone}
              onChange={(event) =>
                setValues((current) => ({ ...current, phone: event.target.value }))
              }
              onBlur={() => setErrors(validate())}
              className={`field-input ${errors.phone ? "field-error" : ""}`}
              placeholder="+92 3xx xxx xxxx"
            />
            {errors.phone ? <p className="mt-2 text-sm text-[#D64545]">{errors.phone}</p> : null}
          </div>

          <div>
            <label className="field-label" htmlFor="register-city">
              City
            </label>
            <CustomSelect
              id="register-city"
              value={values.city}
              options={cities}
              placeholder="Select a city"
              onChange={(value) => {
                setValues((current) => ({ ...current, city: value }));
                setErrors((current) => ({ ...current, city: undefined }));
              }}
              error={errors.city}
            />
            {errors.city ? <p className="mt-2 text-sm text-[#D64545]">{errors.city}</p> : null}
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="register-program">
            Program of Interest
          </label>
          <CustomSelect
            id="register-program"
            value={values.program}
            options={programs}
            placeholder="Select a program"
            onChange={(value) => {
              setValues((current) => ({ ...current, program: value }));
              setErrors((current) => ({ ...current, program: undefined }));
            }}
            error={errors.program}
          />
          {errors.program ? <p className="mt-2 text-sm text-[#D64545]">{errors.program}</p> : null}
        </div>

        <div className="form-grid-two">
          <div>
            <label className="field-label" htmlFor="register-password">
              Password
            </label>
            <div className="relative">
              <input
                id="register-password"
                type={inputType}
                value={values.password}
                onChange={(event) =>
                  setValues((current) => ({ ...current, password: event.target.value }))
                }
                onBlur={() => setErrors(validate())}
                className={`field-input pr-14 ${errors.password ? "field-error" : ""}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-[var(--font-dm-sans)] text-sm font-medium text-ink/62"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password ? <p className="mt-2 text-sm text-[#D64545]">{errors.password}</p> : null}
          </div>

          <div>
            <label className="field-label" htmlFor="register-confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="register-confirm-password"
                type={inputType}
                value={values.confirmPassword}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                onBlur={() => setErrors(validate())}
                className={`field-input pr-12 ${errors.confirmPassword ? "field-error" : ""}`}
                placeholder="••••••••"
              />
              {passwordMatchState !== "idle" ? (
                <span
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg ${
                    passwordMatchState === "match" ? "text-[#2E7D32]" : "text-[#D64545]"
                  }`}
                >
                  {passwordMatchState === "match" ? "✓" : "✕"}
                </span>
              ) : null}
            </div>
            {errors.confirmPassword ? <p className="mt-2 text-sm text-[#D64545]">{errors.confirmPassword}</p> : null}
          </div>
        </div>

        <div>
          <label className="flex items-start gap-3 font-[var(--font-dm-sans)] text-[13px] leading-6 text-ink/76">
            <button
              type="button"
              onClick={() =>
                setValues((current) => ({ ...current, terms: !current.terms }))
              }
              className={`custom-checkbox mt-[2px] ${values.terms ? "is-checked" : ""}`}
              aria-pressed={values.terms}
            >
              {values.terms ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 6.2L4.8 8.5L9.5 3.8"
                    stroke="#C9A84C"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </button>
            <span>
              I agree to the{" "}
              <Link href="/contact" className="font-medium text-gold underline underline-offset-4">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="/contact" className="font-medium text-gold underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.terms ? <p className="mt-2 text-sm text-[#D64545]">{errors.terms}</p> : null}
        </div>

        <button
          type="submit"
          className="button-primary mt-7 w-full justify-center rounded-[10px] bg-navy py-[15px] text-[12px] tracking-[0.18em] text-gold hover:bg-gold hover:text-navy active:scale-[0.98]"
        >
          Create Account
        </button>

        <p className="pt-4 text-center text-sm text-ink/74">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-gold hover:text-navy">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
