"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { AdminBadge } from "@/components/admin/admin-badge";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { useToast } from "@/components/admin/toast";
import { deleteService } from "@/lib/actions/admin/services";
import type { Service } from "@/lib/types/database";

export function ServicesManager({ services }: { services: Service[] }) {
  const { showToast } = useToast();
  const [rows, setRows] = useState(services);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const remove = (id: string) => {
    startTransition(async () => {
      const result = await deleteService(id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) => current.filter((service) => service.id !== id));
      setSelectedId(null);
      showToast("Service deleted.", "success");
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-[#0F2447]">Services</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Manage long-form public service pages and their ordering.</p>
          </div>
          <Link href="/admin/services/new" className="admin-button-primary">
            Add Service
          </Link>
        </div>

        {rows.map((service) => (
          <div key={service.id} className="admin-card p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-semibold text-[#0F2447]">{service.name}</h2>
                  <AdminBadge status={service.status} />
                  {service.featured ? (
                    <span className="rounded-full bg-[#F0EDE6] px-3 py-1 text-xs font-semibold text-[#0F2447]">
                      Featured
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-[#4B5563]">{service.tagline || "No tagline added yet."}</p>
                <div className="text-sm text-[#1F2937]/65">Sort order: {service.sortOrder}</div>
              </div>
              <div className="flex gap-3">
                <Link href={`/admin/services/${service.id}`} className="admin-button-secondary">
                  Edit
                </Link>
                <button
                  type="button"
                  className="admin-button-danger"
                  onClick={() => setSelectedId(service.id)}
                  disabled={isPending}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminConfirmModal
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
        onConfirm={() => (selectedId ? remove(selectedId) : undefined)}
        title="Delete Service"
        message="This service entry and its public detail page will be removed."
      />
    </>
  );
}
