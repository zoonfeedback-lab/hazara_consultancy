"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { RepeatableInputList } from "@/components/admin/repeatable-input-list";
import { useToast } from "@/components/admin/toast";
import { getStatusLabel, serviceStatusOptions, slugify } from "@/lib/admin-utils";
import {
  createService,
  deleteService,
  updateService,
  type ServiceInput,
} from "@/lib/actions/admin/services";
import type { Service } from "@/lib/types/database";

export function ServiceForm({ service }: { service?: Service | null }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [slugEdited, setSlugEdited] = useState(Boolean(service?.slug));
  const [form, setForm] = useState<ServiceInput>({
    benefits: service?.benefits.length ? service.benefits : [""],
    description: service?.description ?? "",
    featured: service?.featured ?? false,
    name: service?.name ?? "",
    slug: service?.slug ?? "",
    sortOrder: String(service?.sortOrder ?? 0),
    status: service?.status ?? "ACTIVE",
    tagline: service?.tagline ?? "",
    whoItsFor: service?.whoItsFor ?? "",
  });

  const submit = () => {
    startTransition(async () => {
      const result = service
        ? await updateService(service.id, form)
        : await createService(form);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast(service ? "Service updated." : "Service created.", "success");
      router.push("/admin/services");
      router.refresh();
    });
  };

  const remove = () => {
    if (!service) {
      return;
    }

    startTransition(async () => {
      const result = await deleteService(service.id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast("Service deleted.", "success");
      router.push("/admin/services");
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

          <Field label="Tagline">
            <input
              className="admin-input"
              value={form.tagline}
              onChange={(event) =>
                setForm((current) => ({ ...current, tagline: event.target.value }))
              }
            />
          </Field>

          <Field label="Description">
            <textarea
              className="admin-textarea"
              rows={5}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
            />
          </Field>

          <Field label="Who It's For">
            <textarea
              className="admin-textarea"
              rows={4}
              value={form.whoItsFor}
              onChange={(event) =>
                setForm((current) => ({ ...current, whoItsFor: event.target.value }))
              }
            />
          </Field>

          <RepeatableInputList
            addLabel="Add Benefit"
            label="Benefits"
            placeholder="Add a service benefit"
            values={form.benefits}
            onChange={(benefits) => setForm((current) => ({ ...current, benefits }))}
          />

          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Status">
              <select
                className="admin-select"
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as ServiceInput["status"],
                  }))
                }
              >
                {serviceStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {getStatusLabel(option)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Sort Order">
              <input
                className="admin-input"
                type="number"
                value={form.sortOrder}
                onChange={(event) =>
                  setForm((current) => ({ ...current, sortOrder: event.target.value }))
                }
              />
            </Field>

            <label className="flex items-end gap-3 pb-3 text-sm font-medium text-[#1F2937]">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  setForm((current) => ({ ...current, featured: event.target.checked }))
                }
              />
              <span>Featured Service</span>
            </label>
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-[#EEEEEE] pt-5">
            {service ? (
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
        message="This service card and its public-facing content will be removed."
        title="Delete Service"
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
