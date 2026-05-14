"use client";

import { useRef, useState, useTransition } from "react";
import { submitInquiry, type InquiryActionState } from "@/lib/actions/inquiry";

export function EventsInquiryForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, setState] = useState<InquiryActionState | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sourceFormData = new FormData(event.currentTarget);
    const organization = typeof sourceFormData.get("organization") === "string"
      ? sourceFormData.get("organization")?.toString().trim() ?? ""
      : "";
    const eventType = typeof sourceFormData.get("event_type") === "string"
      ? sourceFormData.get("event_type")?.toString().trim() ?? ""
      : "";
    const message = typeof sourceFormData.get("message") === "string"
      ? sourceFormData.get("message")?.toString().trim() ?? ""
      : "";

    const formData = new FormData();
    formData.set("name", sourceFormData.get("name")?.toString() ?? "");
    formData.set("email", sourceFormData.get("email")?.toString() ?? "");
    formData.set("phone", sourceFormData.get("phone")?.toString() ?? "");
    formData.set("subject", "Event Partnership Inquiry");
    formData.set("service_of_interest", "Event Management");
    formData.set(
      "message",
      [
        organization ? `Organization: ${organization}` : "Organization: Not provided",
        `Event Type: ${eventType || "Other"}`,
        "",
        message,
      ].join("\n"),
    );

    startTransition(async () => {
      const result = await submitInquiry(formData);
      setState(result);

      if (result.success) {
        formRef.current?.reset();
      }
    });
  };

  if (state?.success) {
    return (
      <div className="rounded-[18px] border border-gold/30 bg-gold/10 px-5 py-6 text-sm leading-7 text-navy">
        Thank you for your message. We will be in touch within 2 business hours.
      </div>
    );
  }

  const errors = state && "errors" in state ? state.errors : undefined;

  return (
    <form ref={formRef} className="grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
      <label className="text-sm font-medium md:col-span-1">
        Full Name
        <input
          name="name"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="Your full name"
        />
        {errors?.name ? <p className="mt-2 text-xs text-red-600">{errors.name}</p> : null}
      </label>
      <label className="text-sm font-medium md:col-span-1">
        Email Address
        <input
          name="email"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="name@example.com"
          type="email"
        />
        {errors?.email ? <p className="mt-2 text-xs text-red-600">{errors.email}</p> : null}
      </label>
      <label className="text-sm font-medium md:col-span-1">
        Phone Number
        <input
          name="phone"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="+92..."
        />
      </label>
      <label className="text-sm font-medium md:col-span-1">
        Organization Name
        <input
          name="organization"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="Institution or organization name"
        />
      </label>
      <label className="text-sm font-medium md:col-span-2">
        Event Type
        <select
          name="event_type"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          defaultValue="Seminar"
        >
          <option value="Seminar">Seminar</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Community Event">Community Event</option>
          <option value="Corporate Event">Corporate Event</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label className="text-sm font-medium md:col-span-2">
        Message
        <textarea
          name="message"
          className="mt-2 min-h-36 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="Tell us what you want to host and who it is for."
        />
        {errors?.message ? <p className="mt-2 text-xs text-red-600">{errors.message}</p> : null}
      </label>
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <button type="submit" disabled={isPending} className="button-primary disabled:opacity-60">
          {isPending ? "Submitting..." : "Send Inquiry"}
        </button>
        <p className="text-sm text-ink/62">We respond within 2 business hours.</p>
      </div>
      {state && !state.success ? (
        <p className="md:col-span-2 text-sm text-red-600">{state.message}</p>
      ) : null}
    </form>
  );
}
