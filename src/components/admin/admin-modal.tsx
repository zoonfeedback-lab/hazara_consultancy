"use client";

import { useEffect, useRef } from "react";

type AdminModalProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  title: string;
};

export function AdminModal({ children, footer, onClose, open, title }: AdminModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const node = dialogRef.current;
    const focusable = node?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab" && first && last) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4 py-8"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="admin-card w-full max-w-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[#EEEEEE] px-6 py-5">
          <div className="text-lg font-semibold text-[#0F2447]">{title}</div>
        </div>
        <div className="px-6 py-6">{children}</div>
        {footer ? <div className="border-t border-[#EEEEEE] px-6 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
