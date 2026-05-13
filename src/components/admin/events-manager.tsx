"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { AdminBadge } from "@/components/admin/admin-badge";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { AdminTable } from "@/components/admin/admin-table";
import { AdminToggle } from "@/components/admin/admin-toggle";
import { useToast } from "@/components/admin/toast";
import { deleteEvent, updateEvent, type EventInput } from "@/lib/actions/admin/events";
import { formatDate, getStatusLabel } from "@/lib/admin-utils";
import type { Event } from "@/lib/types/database";

type EventRecord = Omit<Event, "createdAt" | "date" | "updatedAt"> & {
  createdAt: string;
  date: string | null;
  updatedAt: string;
};

export function EventsManager({ events }: { events: EventRecord[] }) {
  const { showToast } = useToast();
  const [rows, setRows] = useState(events);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const remove = (id: string) => {
    startTransition(async () => {
      const result = await deleteEvent(id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) => current.filter((event) => event.id !== id));
      setSelectedId(null);
      showToast("Event deleted.", "success");
    });
  };

  const togglePast = (row: EventRecord, isPast: boolean) => {
    startTransition(async () => {
      const input: EventInput = {
        date: row.date ? row.date.slice(0, 10) : "",
        description: row.description ?? "",
        featured: row.featured,
        imageUrl: row.imageUrl ?? "",
        isPast,
        location: row.location ?? "",
        name: row.name,
        slug: row.slug,
        status: row.status,
        type: row.type,
      };

      const result = await updateEvent(row.id, input);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) =>
        current.map((event) => (event.id === row.id ? { ...event, isPast } : event)),
      );
      showToast("Event updated.", "success");
    });
  };

  return (
    <>
      <div className="admin-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-[#0F2447]">Events</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Manage upcoming seminars, workshops, and past portfolio events.</p>
          </div>
          <Link href="/admin/events/new" className="admin-button-primary">
            Add Event
          </Link>
        </div>
        <div className="mt-6">
          <AdminTable
            rows={rows}
            rowKey={(row) => row.id}
            loading={isPending}
            emptyTitle="No events added yet"
            emptyMessage="Create the first event listing or portfolio entry."
            columns={[
              {
                header: "Name",
                render: (row) => (
                  <div>
                    <div className="font-semibold text-[#0F2447]">{row.name}</div>
                    <div className="mt-1 text-sm text-[#1F2937]/60">{row.location || "No location"}</div>
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
                header: "Date",
                render: (row) => formatDate(row.date),
              },
              {
                header: "Location",
                render: (row) => row.location || "—",
              },
              {
                header: "Is Past",
                render: (row) => (
                  <AdminToggle checked={row.isPast} onChange={(checked) => togglePast(row, checked)} />
                ),
              },
              {
                header: "Status",
                render: (row) => <AdminBadge status={row.status} />,
              },
              {
                header: "Actions",
                render: (row) => (
                  <div className="flex gap-2">
                    <Link href={`/admin/events/${row.id}`} className="admin-button-secondary !px-3 !py-2">
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
        title="Delete Event"
        message="This event entry will be removed from the admin portal and the public events page."
      />
    </>
  );
}
