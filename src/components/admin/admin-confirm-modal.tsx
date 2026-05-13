"use client";

import { AdminModal } from "@/components/admin/admin-modal";

type AdminConfirmModalProps = {
  confirmLabel?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title?: string;
};

export function AdminConfirmModal({
  confirmLabel = "Delete",
  message,
  onClose,
  onConfirm,
  open,
  title = "Confirm Action",
}: AdminConfirmModalProps) {
  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <div className="flex justify-end gap-3">
          <button type="button" className="admin-button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="admin-button-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      }
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-[#DC2626]">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>
        <p className="text-sm leading-7 text-[#374151]">{message}</p>
      </div>
    </AdminModal>
  );
}
