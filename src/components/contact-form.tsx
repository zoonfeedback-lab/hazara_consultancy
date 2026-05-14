"use client";

import { useRef, useState, useTransition } from "react";
import { submitInquiry, type InquiryActionState } from "@/lib/actions/inquiry";

type ContactFormProps = {
  services: Array<{ id: string; name: string }>;
};

export function ContactForm({ services }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, setState] = useState<InquiryActionState | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

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
      <div className="rounded-[18px] border border-gold/30 bg-gold/10 px-5 py-6 text-base leading-7 text-navy">
        Thank you for your message. We will be in touch within 2 business hours.
      </div>
    );
  }

  const errors = state && "errors" in state ? state.errors : undefined;

  return (
    <form ref={formRef} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={onSubmit}>
      <label className="text-sm font-medium">
        Full Name
        <input
          name="name"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="Your full name"
        />
        {errors?.name ? <p className="mt-2 text-sm text-red-600">{errors.name}</p> : null}
      </label>
      <label className="text-sm font-medium">
        Email Address
        <input
          name="email"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="name@example.com"
          type="email"
        />
        {errors?.email ? <p className="mt-2 text-sm text-red-600">{errors.email}</p> : null}
      </label>
      <label className="text-sm font-medium">
        Phone Number
        <input
          name="phone"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="+92..."
        />
      </label>
      <label className="text-sm font-medium">
        Subject
        <input
          name="subject"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="How can we help?"
        />
      </label>
      <label className="text-sm font-medium md:col-span-2">
        Service of Interest
        <select
          name="service_of_interest"
          className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          defaultValue=""
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium md:col-span-2">
        Message
        <textarea
          name="message"
          className="mt-2 min-h-40 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
          placeholder="Share your goals, timeline, or the kind of support you need."
        />
        {errors?.message ? <p className="mt-2 text-sm text-red-600">{errors.message}</p> : null}
      </label>
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <button type="submit" disabled={isPending} className="button-primary w-full disabled:opacity-60 md:w-auto">
          {isPending ? "Submitting..." : "Submit Inquiry"}
        </button>
        <p className="text-sm text-ink/62">We respond within 2 business hours.</p>
      </div>
      {state && !state.success ? (
        <p className="md:col-span-2 text-sm text-red-600">{state.message}</p>
      ) : null}
    </form>
  );
}
