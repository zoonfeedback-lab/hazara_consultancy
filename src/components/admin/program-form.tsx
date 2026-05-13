"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { RepeatableInputList } from "@/components/admin/repeatable-input-list";
import { useToast } from "@/components/admin/toast";
import {
  getStatusLabel,
  programStatusOptions,
  programTypeOptions,
  slugify,
} from "@/lib/admin-utils";
import {
  createProgram,
  deleteProgram,
  updateProgram,
  type ProgramInput,
} from "@/lib/actions/admin/programs";
import type { Program } from "@/lib/types/database";

export function ProgramForm({ program }: { program?: Program | null }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [slugEdited, setSlugEdited] = useState(Boolean(program?.slug));
  const [form, setForm] = useState<ProgramInput>({
    curriculum: program?.curriculum.length ? program.curriculum : [""],
    description: program?.description ?? "",
    duration: program?.duration ?? "",
    featured: program?.featured ?? false,
    name: program?.name ?? "",
    schedule: program?.schedule ?? "",
    slug: program?.slug ?? "",
    sortOrder: String(program?.sortOrder ?? 0),
    status: program?.status ?? "UPCOMING",
    type: program?.type ?? "BOOTCAMP",
  });

  const submit = () => {
    startTransition(async () => {
      const result = program
        ? await updateProgram(program.id, form)
        : await createProgram(form);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast(program ? "Program updated." : "Program created.", "success");
      router.push("/admin/programs");
      router.refresh();
    });
  };

  const remove = () => {
    if (!program) {
      return;
    }

    startTransition(async () => {
      const result = await deleteProgram(program.id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast("Program deleted.", "success");
      router.push("/admin/programs");
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
                    type: event.target.value as ProgramInput["type"],
                  }))
                }
              >
                {programTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {getStatusLabel(option)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Duration">
              <input
                className="admin-input"
                value={form.duration}
                onChange={(event) =>
                  setForm((current) => ({ ...current, duration: event.target.value }))
                }
              />
            </Field>
          </div>

          <Field label="Schedule">
            <input
              className="admin-input"
              value={form.schedule}
              onChange={(event) => setForm((current) => ({ ...current, schedule: event.target.value }))}
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

          <RepeatableInputList
            addLabel="Add Curriculum Item"
            label="Curriculum"
            placeholder="Add curriculum item"
            values={form.curriculum}
            onChange={(curriculum) => setForm((current) => ({ ...current, curriculum }))}
          />

          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Status">
              <select
                className="admin-select"
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as ProgramInput["status"],
                  }))
                }
              >
                {programStatusOptions.map((option) => (
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
              <span>Featured Program</span>
            </label>
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-[#EEEEEE] pt-5">
            {program ? (
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
        message="This program will be removed from the admin catalog and the public programs page."
        title="Delete Program"
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
