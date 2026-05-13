/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { useToast } from "@/components/admin/toast";
import {
  eventStatusOptions,
  eventTypeOptions,
  getStatusLabel,
  slugify,
} from "@/lib/admin-utils";
import {
  createEvent,
  deleteEvent,
  updateEvent,
  type EventInput,
} from "@/lib/actions/admin/events";
import type { Event } from "@/lib/types/database";

export function EventForm({ event }: { event?: Event | null }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [slugEdited, setSlugEdited] = useState(Boolean(event?.slug));
  const [form, setForm] = useState<EventInput>({
    date: event?.date ? toDateInput(event.date) : "",
    description: event?.description ?? "",
    featured: event?.featured ?? false,
    imageUrl: event?.imageUrl ?? "",
    isPast: event?.isPast ?? false,
    location: event?.location ?? "",
    name: event?.name ?? "",
    slug: event?.slug ?? "",
    status: event?.status ?? "UPCOMING",
    type: event?.type ?? "SEMINAR",
  });

  const previewUrl = useMemo(() => {
    try {
      return form.imageUrl ? new URL(form.imageUrl).toString() : "";
    } catch {
      return "";
    }
  }, [form.imageUrl]);

  const submit = () => {
    startTransition(async () => {
      const result = event
        ? await updateEvent(event.id, form)
        : await createEvent(form);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast(event ? "Event updated." : "Event created.", "success");
      router.push("/admin/events");
      router.refresh();
    });
  };

  const remove = () => {
    if (!event) {
      return;
    }

    startTransition(async () => {
      const result = await deleteEvent(event.id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast("Event deleted.", "success");
      router.push("/admin/events");
      router.refresh();
    });
  };

  return (
    <>
      <div className="admin-card p-6">
        <div className="grid gap-5">
          <Field label="Name">
            <input
              className="admin-input"
              value={form.name}
              onChange={(event) => {
                const name = event.target.value;
                setForm((current) => ({
                  ...current,
                  name,
                  slug: slugEdited ? current.slug : slugify(name),
                }));
              }}
            />
          </Field>
          <Field label="Slug">
            <input
              className="admin-input"
              value={form.slug}
              onChange={(event) => {
                setSlugEdited(true);
                setForm((current) => ({ ...current, slug: slugify(event.target.value) }));
              }}
            />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Type">
              <select
                className="admin-select"
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    type: event.target.value as EventInput["type"],
                  }))
                }
              >
                {eventTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {getStatusLabel(option)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Date">
              <input
                className="admin-input"
                type="date"
                value={form.date}
                onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
              />
            </Field>
          </div>
          <Field label="Location">
            <input
              className="admin-input"
              value={form.location}
              onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
            />
          </Field>
          <Field label="Description">
            <textarea
              className="admin-textarea"
              rows={6}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
            />
          </Field>
          <Field label="Image URL">
            <input
              className="admin-input"
              value={form.imageUrl}
              onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))}
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Event preview"
                className="mt-3 h-48 w-full rounded-[12px] object-cover"
              />
            ) : null}
          </Field>
          <div className="grid gap-5 md:grid-cols-3">
            <label className="flex items-end gap-3 pb-3 text-sm font-medium text-[#1F2937]">
              <input
                type="checkbox"
                checked={form.isPast}
                onChange={(event) =>
                  setForm((current) => ({ ...current, isPast: event.target.checked }))
                }
              />
              <span>Mark as past event</span>
            </label>
            <Field label="Status">
              <select
                className="admin-select"
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as EventInput["status"],
                  }))
                }
              >
                {eventStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {getStatusLabel(option)}
                  </option>
                ))}
              </select>
            </Field>
            <label className="flex items-end gap-3 pb-3 text-sm font-medium text-[#1F2937]">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  setForm((current) => ({ ...current, featured: event.target.checked }))
                }
              />
              <span>Featured Event</span>
            </label>
          </div>
          <div className="flex flex-wrap justify-end gap-3 border-t border-[#EEEEEE] pt-5">
            {event ? (
              <button
                type="button"
                className="admin-button-danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete
              </button>
            ) : null}
            <button type="button" className="admin-button-primary" onClick={submit} disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      <AdminConfirmModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={remove}
        message="This event will be removed from the admin records and the public events page."
        title="Delete Event"
      />
    </>
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

function toDateInput(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
}
