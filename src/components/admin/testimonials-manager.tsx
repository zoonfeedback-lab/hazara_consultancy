"use client";

import { useState, useTransition } from "react";
import { AdminBadge } from "@/components/admin/admin-badge";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { AdminModal } from "@/components/admin/admin-modal";
import { useToast } from "@/components/admin/toast";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
  type TestimonialInput,
} from "@/lib/actions/admin/testimonials";
import type { Testimonial } from "@/lib/types/database";

const emptyForm: TestimonialInput = {
  featured: false,
  program: "",
  quote: "",
  sortOrder: "0",
  studentName: "",
};

export function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
  const { showToast } = useToast();
  const [rows, setRows] = useState(testimonials);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<TestimonialInput>(emptyForm);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    setForm({
      featured: testimonial.featured,
      program: testimonial.program ?? "",
      quote: testimonial.quote,
      sortOrder: String(testimonial.sortOrder),
      studentName: testimonial.studentName,
    });
    setIsModalOpen(true);
  };

  const submit = () => {
    startTransition(async () => {
      const result = editing
        ? await updateTestimonial(editing.id, form)
        : await createTestimonial(form);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) => {
        if (editing) {
          return current.map((item) => (item.id === editing.id ? result.data : item));
        }

        return [result.data, ...current];
      });

      setIsModalOpen(false);
      showToast(editing ? "Testimonial updated." : "Testimonial created.", "success");
    });
  };

  const remove = (id: string) => {
    startTransition(async () => {
      const result = await deleteTestimonial(id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) => current.filter((item) => item.id !== id));
      setSelectedId(null);
      showToast("Testimonial deleted.", "success");
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-[#0F2447]">Testimonials</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Curate featured student stories for the public site.</p>
          </div>
          <button type="button" className="admin-button-primary" onClick={openCreate}>
            Add Testimonial
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((testimonial) => (
            <div key={testimonial.id} className="admin-card flex flex-col gap-4 p-6">
              <p className="line-clamp-2 text-sm leading-7 text-[#374151]">{testimonial.quote}</p>
              <div className="space-y-1">
                <div className="font-semibold text-[#0F2447]">{testimonial.studentName}</div>
                <div className="text-sm text-[#4B5563]">{testimonial.program || "No program set"}</div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                {testimonial.featured ? <AdminBadge status="featured" /> : <span />}
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="admin-button-secondary !px-3 !py-2"
                    onClick={() => openEdit(testimonial)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="admin-button-danger !px-3 !py-2"
                    onClick={() => setSelectedId(testimonial.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? "Edit Testimonial" : "Add Testimonial"}
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" className="admin-button-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="admin-button-primary" onClick={submit} disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        }
      >
        <div className="grid gap-4">
          <Field label="Quote">
            <textarea
              className="admin-textarea"
              rows={5}
              value={form.quote}
              onChange={(event) => setForm((current) => ({ ...current, quote: event.target.value }))}
            />
          </Field>
          <Field label="Student Name">
            <input
              className="admin-input"
              value={form.studentName}
              onChange={(event) =>
                setForm((current) => ({ ...current, studentName: event.target.value }))
              }
            />
          </Field>
          <Field label="Program">
            <input
              className="admin-input"
              value={form.program}
              onChange={(event) => setForm((current) => ({ ...current, program: event.target.value }))}
            />
          </Field>
          <Field label="Sort Order">
            <input
              className="admin-input"
              type="number"
              value={form.sortOrder}
              onChange={(event) => setForm((current) => ({ ...current, sortOrder: event.target.value }))}
            />
          </Field>
          <label className="flex items-center gap-3 text-sm font-medium text-[#1F2937]">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                setForm((current) => ({ ...current, featured: event.target.checked }))
              }
            />
            <span>Featured testimonial</span>
          </label>
        </div>
      </AdminModal>

      <AdminConfirmModal
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
        onConfirm={() => (selectedId ? remove(selectedId) : undefined)}
        title="Delete Testimonial"
        message="This testimonial will be removed from the admin portal and public pages."
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
