"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { AdminModal } from "@/components/admin/admin-modal";
import { AdminTable } from "@/components/admin/admin-table";
import { AdminToggle } from "@/components/admin/admin-toggle";
import { useToast } from "@/components/admin/toast";
import {
  createAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementActive,
  updateAnnouncement,
  type AnnouncementInput,
} from "@/lib/actions/admin/announcements";
import { formatDate } from "@/lib/admin-utils";
import type { Announcement } from "@/lib/types/database";

type AnnouncementRecord = Omit<Announcement, "createdAt" | "expiresAt"> & {
  createdAt: string;
  expiresAt: string | null;
};

const emptyForm: AnnouncementInput = {
  active: true,
  expiresAt: "",
  link: "",
  text: "",
};

export function AnnouncementsManager({ announcements }: { announcements: AnnouncementRecord[] }) {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [rows, setRows] = useState(announcements);
  const [editing, setEditing] = useState<AnnouncementRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(searchParams.get("new") === "1");
  const [form, setForm] = useState<AnnouncementInput>(emptyForm);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (announcement: AnnouncementRecord) => {
    setEditing(announcement);
    setForm({
      active: announcement.active,
      expiresAt: announcement.expiresAt ? announcement.expiresAt.slice(0, 10) : "",
      link: announcement.link ?? "",
      text: announcement.text,
    });
    setIsModalOpen(true);
  };

  const submit = () => {
    startTransition(async () => {
      const result = editing
        ? await updateAnnouncement(editing.id, form)
        : await createAnnouncement(form);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      const nextRow = {
        ...result.data,
        createdAt: result.data.createdAt.toISOString(),
        expiresAt: result.data.expiresAt?.toISOString() ?? null,
      };

      setRows((current) =>
        editing
          ? current.map((item) => (item.id === editing.id ? nextRow : item))
          : [nextRow, ...current],
      );
      setIsModalOpen(false);
      showToast(editing ? "Announcement updated." : "Announcement created.", "success");
    });
  };

  const remove = (id: string) => {
    startTransition(async () => {
      const result = await deleteAnnouncement(id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) => current.filter((item) => item.id !== id));
      setSelectedId(null);
      showToast("Announcement deleted.", "success");
    });
  };

  const toggleActive = (id: string, active: boolean) => {
    startTransition(async () => {
      const result = await toggleAnnouncementActive(id, active);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) =>
        current.map((item) => (item.id === id ? { ...item, active } : item)),
      );
      showToast("Announcement visibility updated.", "success");
    });
  };

  return (
    <>
      <div className="admin-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-[#0F2447]">Announcements</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Control the homepage ticker and timed notices.</p>
          </div>
          <button type="button" className="admin-button-primary" onClick={openCreate}>
            Add Announcement
          </button>
        </div>
        <div className="mt-6">
          <AdminTable
            rows={rows}
            rowKey={(row) => row.id}
            loading={isPending}
            emptyTitle="No announcements added yet"
            emptyMessage="Add the first ticker item for the public homepage."
            columns={[
              {
                header: "Text",
                render: (row) => (
                  <button
                    type="button"
                    className="line-clamp-1 max-w-[420px] text-left font-medium text-[#0F2447]"
                    onClick={() => openEdit(row)}
                  >
                    {row.text}
                  </button>
                ),
              },
              {
                header: "Link",
                render: (row) => row.link || "—",
              },
              {
                header: "Active",
                render: (row) => (
                  <AdminToggle checked={row.active} onChange={(checked) => toggleActive(row.id, checked)} />
                ),
              },
              {
                header: "Expires At",
                render: (row) => formatDate(row.expiresAt),
              },
              {
                header: "Actions",
                render: (row) => (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="admin-button-secondary !px-3 !py-2"
                      onClick={() => openEdit(row)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-button-danger !px-3 !py-2"
                      onClick={() => setSelectedId(row.id)}
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      <AdminModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? "Edit Announcement" : "Add Announcement"}
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
          <Field label="Text">
            <textarea
              className="admin-textarea"
              rows={4}
              value={form.text}
              onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
            />
          </Field>
          <Field label="Link">
            <input
              className="admin-input"
              value={form.link}
              onChange={(event) => setForm((current) => ({ ...current, link: event.target.value }))}
            />
          </Field>
          <Field label="Expires At">
            <input
              className="admin-input"
              type="date"
              value={form.expiresAt}
              onChange={(event) =>
                setForm((current) => ({ ...current, expiresAt: event.target.value }))
              }
            />
          </Field>
          <label className="flex items-center gap-3 text-sm font-medium text-[#1F2937]">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) => setForm((current) => ({ ...current, active: event.target.checked }))}
            />
            <span>Announcement is active</span>
          </label>
        </div>
      </AdminModal>

      <AdminConfirmModal
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
        onConfirm={() => (selectedId ? remove(selectedId) : undefined)}
        title="Delete Announcement"
        message="This announcement will disappear from the admin portal and the homepage ticker."
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
