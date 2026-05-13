"use client";

import { useMemo, useState, useTransition } from "react";
import { AdminBadge } from "@/components/admin/admin-badge";
import { AdminTable } from "@/components/admin/admin-table";
import { useToast } from "@/components/admin/toast";
import { formatDate, formatDateTime, getStatusLabel, inquiryStatusOptions } from "@/lib/admin-utils";
import {
  updateInquiryNotes,
  updateInquiryStatus,
} from "@/lib/actions/admin/inquiries";
import type { Inquiry, InquiryStatus } from "@/lib/types/database";

type InquiryRecord = Omit<Inquiry, "createdAt"> & {
  createdAt: string;
};

export function InquiriesClient({ initialInquiries }: { initialInquiries: InquiryRecord[] }) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | InquiryStatus>("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>(
    Object.fromEntries(initialInquiries.map((inquiry) => [inquiry.id, inquiry.notes ?? ""])),
  );

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => {
      const matchesStatus = statusFilter === "ALL" || inquiry.status === statusFilter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        inquiry.name.toLowerCase().includes(query) ||
        inquiry.email.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, search, statusFilter]);

  const selectedInquiry = inquiries.find((inquiry) => inquiry.id === selectedId) ?? null;

  const changeStatus = (id: string, status: InquiryStatus) => {
    startTransition(async () => {
      const result = await updateInquiryStatus(id, status);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setInquiries((current) =>
        current.map((inquiry) => (inquiry.id === id ? { ...inquiry, status } : inquiry)),
      );
      showToast("Inquiry status updated.", "success");
    });
  };

  const saveNotes = (id: string) => {
    startTransition(async () => {
      const result = await updateInquiryNotes(id, notesDraft[id] ?? "");

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setInquiries((current) =>
        current.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, notes: result.data.notes } : inquiry,
        ),
      );
      showToast("Inquiry notes saved.", "success");
    });
  };

  return (
    <div className="relative">
      <div className="admin-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#0F2447]">Inquiries</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Manage every website lead in one place.</p>
          </div>
          <input
            className="admin-input max-w-sm"
            placeholder="Search by name or email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["ALL", ...inquiryStatusOptions] as const).map((status) => (
            <button
              key={status}
              type="button"
              className="admin-tab"
              data-active={statusFilter === status}
              onClick={() => setStatusFilter(status)}
            >
              {status === "ALL" ? "All" : getStatusLabel(status)}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <AdminTable
            rows={filteredInquiries}
            rowKey={(row) => row.id}
            onRowClick={(row) => setSelectedId(row.id)}
            loading={isPending}
            emptyTitle="No inquiries match the current view"
            emptyMessage="Try adjusting the search or filter to find the inquiry you need."
            columns={[
              {
                header: "Name and Email",
                render: (row) => (
                  <div>
                    <div className="font-semibold text-[#0F2447]">{row.name}</div>
                    <div className="mt-1 text-sm text-[#1F2937]/60">{row.email}</div>
                  </div>
                ),
              },
              {
                header: "Subject",
                render: (row) => row.subject || "—",
              },
              {
                header: "Service of Interest",
                render: (row) => row.serviceOfInterest || "—",
              },
              {
                header: "Date Submitted",
                render: (row) => formatDate(row.createdAt),
              },
              {
                header: "Status",
                render: (row) => <AdminBadge status={row.status} />,
              },
              {
                header: "Actions",
                render: (row) => (
                  <div className="flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
                    <button
                      type="button"
                      className="admin-button-secondary !px-3 !py-2"
                      onClick={() => setSelectedId(row.id)}
                    >
                      View
                    </button>
                    <select
                      className="admin-select max-w-[150px]"
                      value={row.status}
                      onChange={(event) => changeStatus(row.id, event.target.value as InquiryStatus)}
                    >
                      {inquiryStatusOptions.map((option) => (
                        <option key={option} value={option}>
                          {getStatusLabel(option)}
                        </option>
                      ))}
                    </select>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-[80] w-full max-w-[480px] border-l border-[#EEEEEE] bg-white p-6 shadow-[-8px_0_30px_rgba(15,36,71,0.12)] transition-transform duration-300 ${
          selectedInquiry ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedInquiry ? (
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#0F2447]">{selectedInquiry.name}</h2>
                <p className="mt-1 text-sm text-[#4B5563]">{selectedInquiry.email}</p>
              </div>
              <button
                type="button"
                className="admin-button-secondary !px-3 !py-2"
                onClick={() => setSelectedId(null)}
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4 overflow-y-auto pr-1 text-sm text-[#374151]">
              <DetailRow label="Phone" value={selectedInquiry.phone || "—"} />
              <DetailRow label="Subject" value={selectedInquiry.subject || "—"} />
              <DetailRow label="Service" value={selectedInquiry.serviceOfInterest || "—"} />
              <DetailRow label="Date" value={formatDateTime(selectedInquiry.createdAt)} />
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                  Current Status
                </div>
                <AdminBadge status={selectedInquiry.status} />
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                  Message
                </div>
                <div className="rounded-[12px] bg-[#F9F9FB] p-4 leading-7 text-[#1F2937]">
                  {selectedInquiry.message}
                </div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                  Internal Notes
                </div>
                <textarea
                  className="admin-textarea min-h-40"
                  value={notesDraft[selectedInquiry.id] ?? ""}
                  onChange={(event) =>
                    setNotesDraft((current) => ({
                      ...current,
                      [selectedInquiry.id]: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="admin-button-primary"
                onClick={() => saveNotes(selectedInquiry.id)}
              >
                Save Notes
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">{label}</div>
      <div>{value}</div>
    </div>
  );
}
