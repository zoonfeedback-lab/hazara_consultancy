"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { AdminBadge } from "@/components/admin/admin-badge";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { AdminTable } from "@/components/admin/admin-table";
import { AdminToggle } from "@/components/admin/admin-toggle";
import { useToast } from "@/components/admin/toast";
import { deleteProgram, toggleProgramFeatured } from "@/lib/actions/admin/programs";
import { getStatusLabel } from "@/lib/admin-utils";
import type { Program } from "@/lib/types/database";

export function ProgramsManager({ programs }: { programs: Program[] }) {
  const { showToast } = useToast();
  const [rows, setRows] = useState(programs);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const remove = (id: string) => {
    startTransition(async () => {
      const result = await deleteProgram(id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) => current.filter((program) => program.id !== id));
      setSelectedId(null);
      showToast("Program deleted.", "success");
    });
  };

  const toggleFeatured = (id: string, featured: boolean) => {
    startTransition(async () => {
      const result = await toggleProgramFeatured(id, featured);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) =>
        current.map((program) => (program.id === id ? { ...program, featured } : program)),
      );
      showToast("Program updated.", "success");
    });
  };

  return (
    <>
      <div className="admin-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-[#0F2447]">Programs</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Manage bootcamps, workshops, and mentorship tracks.</p>
          </div>
          <Link href="/admin/programs/new" className="admin-button-primary">
            Add Program
          </Link>
        </div>

        <div className="mt-6">
          <AdminTable
            rows={rows}
            rowKey={(row) => row.id}
            loading={isPending}
            emptyTitle="No programs added yet"
            emptyMessage="Create the first program offering for the public catalog."
            columns={[
              {
                header: "Name",
                render: (row) => (
                  <div>
                    <div className="font-semibold text-[#0F2447]">{row.name}</div>
                    <div className="mt-1 text-sm text-[#1F2937]/60">/{row.slug}</div>
                  </div>
                ),
              },
              {
                header: "Type",
                render: (row) => (
                  <span className="rounded-full bg-[#F0EDE6] px-3 py-1 text-xs font-semibold text-[#0F2447]">
                    {getStatusLabel(row.type)}
                  </span>
                ),
              },
              {
                header: "Status",
                render: (row) => <AdminBadge status={row.status} />,
              },
              {
                header: "Duration",
                render: (row) => row.duration || "—",
              },
              {
                header: "Featured",
                render: (row) => (
                  <AdminToggle checked={row.featured} onChange={(checked) => toggleFeatured(row.id, checked)} />
                ),
              },
              {
                header: "Sort Order",
                render: (row) => row.sortOrder,
              },
              {
                header: "Actions",
                render: (row) => (
                  <div className="flex gap-2">
                    <Link href={`/admin/programs/${row.id}`} className="admin-button-secondary !px-3 !py-2">
                      Edit
                    </Link>
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

      <AdminConfirmModal
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
        onConfirm={() => (selectedId ? remove(selectedId) : undefined)}
        title="Delete Program"
        message="This program will be removed from the admin portal and the public programs page."
      />
    </>
  );
}
