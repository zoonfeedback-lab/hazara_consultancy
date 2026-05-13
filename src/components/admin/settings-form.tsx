"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/components/admin/toast";
import { updateSettings, type SettingsInput } from "@/lib/actions/admin/settings";
import type { Settings } from "@/lib/types/database";

export function SettingsForm({ settings }: { settings: Settings | null }) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<SettingsInput>({
    address: settings?.address ?? "",
    consultancyName: settings?.consultancyName ?? "",
    contactEmail: settings?.contactEmail ?? "",
    facebookUrl: settings?.facebookUrl ?? "",
    facultyCount: String(settings?.facultyCount ?? ""),
    instagramUrl: settings?.instagramUrl ?? "",
    linkedinUrl: settings?.linkedinUrl ?? "",
    passRate: String(settings?.passRate ?? ""),
    phone: settings?.phone ?? "",
    programsLaunched: String(settings?.programsLaunched ?? ""),
    studentsMentored: String(settings?.studentsMentored ?? ""),
    tagline: settings?.tagline ?? "",
    whatsappNumber: settings?.whatsappNumber ?? "",
    whatsappUrl: settings?.whatsappUrl ?? "",
    youtubeUrl: settings?.youtubeUrl ?? "",
  });

  const submit = () => {
    startTransition(async () => {
      const result = await updateSettings(form);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast("Settings updated successfully.", "success");
    });
  };

  return (
    <div className="admin-card p-6">
      <div className="space-y-8">
        <Section title="General">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Consultancy Name">
              <input
                className="admin-input"
                value={form.consultancyName}
                onChange={(event) =>
                  setForm((current) => ({ ...current, consultancyName: event.target.value }))
                }
              />
            </Field>
            <Field label="Tagline">
              <input
                className="admin-input"
                value={form.tagline}
                onChange={(event) => setForm((current) => ({ ...current, tagline: event.target.value }))}
              />
            </Field>
          </div>
        </Section>

        <Section title="Contact">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Contact Email">
              <input
                className="admin-input"
                type="email"
                value={form.contactEmail}
                onChange={(event) =>
                  setForm((current) => ({ ...current, contactEmail: event.target.value }))
                }
              />
            </Field>
            <Field label="Phone">
              <input
                className="admin-input"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              />
            </Field>
            <Field label="WhatsApp Number">
              <input
                className="admin-input"
                value={form.whatsappNumber}
                onChange={(event) =>
                  setForm((current) => ({ ...current, whatsappNumber: event.target.value }))
                }
              />
            </Field>
            <Field label="WhatsApp URL">
              <input
                className="admin-input"
                value={form.whatsappUrl}
                onChange={(event) =>
                  setForm((current) => ({ ...current, whatsappUrl: event.target.value }))
                }
              />
            </Field>
          </div>
        </Section>

        <Section title="Address">
          <Field label="Address">
            <textarea
              className="admin-textarea"
              rows={4}
              value={form.address}
              onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
            />
          </Field>
        </Section>

        <Section title="Social Media">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Facebook URL">
              <input
                className="admin-input"
                value={form.facebookUrl}
                onChange={(event) =>
                  setForm((current) => ({ ...current, facebookUrl: event.target.value }))
                }
              />
            </Field>
            <Field label="Instagram URL">
              <input
                className="admin-input"
                value={form.instagramUrl}
                onChange={(event) =>
                  setForm((current) => ({ ...current, instagramUrl: event.target.value }))
                }
              />
            </Field>
            <Field label="YouTube URL">
              <input
                className="admin-input"
                value={form.youtubeUrl}
                onChange={(event) =>
                  setForm((current) => ({ ...current, youtubeUrl: event.target.value }))
                }
              />
            </Field>
            <Field label="LinkedIn URL">
              <input
                className="admin-input"
                value={form.linkedinUrl}
                onChange={(event) =>
                  setForm((current) => ({ ...current, linkedinUrl: event.target.value }))
                }
              />
            </Field>
          </div>
        </Section>

        <Section title="Stats">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Field label="Students Mentored">
              <input
                className="admin-input"
                type="number"
                value={form.studentsMentored}
                onChange={(event) =>
                  setForm((current) => ({ ...current, studentsMentored: event.target.value }))
                }
              />
            </Field>
            <Field label="Pass Rate (%)">
              <input
                className="admin-input"
                type="number"
                value={form.passRate}
                onChange={(event) => setForm((current) => ({ ...current, passRate: event.target.value }))}
              />
            </Field>
            <Field label="Programs Launched">
              <input
                className="admin-input"
                type="number"
                value={form.programsLaunched}
                onChange={(event) =>
                  setForm((current) => ({ ...current, programsLaunched: event.target.value }))
                }
              />
            </Field>
            <Field label="Faculty Count">
              <input
                className="admin-input"
                type="number"
                value={form.facultyCount}
                onChange={(event) =>
                  setForm((current) => ({ ...current, facultyCount: event.target.value }))
                }
              />
            </Field>
          </div>
        </Section>

        <div className="flex justify-end border-t border-[#EEEEEE] pt-5">
          <button type="button" className="admin-button-primary" onClick={submit} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-[#0F2447]">{title}</h2>
        <div className="mt-3 h-px bg-[#E5E7EB]" />
      </div>
      {children}
    </section>
  );
}

function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <label className="block space-y-2 text-sm font-medium text-[#1F2937]">
      <span>{label}</span>
      {children}
    </label>
  );
}
