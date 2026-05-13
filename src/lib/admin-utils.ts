import type {
  BlogPostStatus,
  EventStatus,
  EventType,
  InquiryStatus,
  ProgramStatus,
  ProgramType,
  ServiceStatus,
} from "@/lib/types/database";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(value?: string | Date | null, options?: Intl.DateTimeFormatOptions) {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(date);
}

export function formatDateTime(value?: string | Date | null) {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatRelativeTime(value?: string | Date | null) {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  const diff = date.getTime() - Date.now();
  const minutes = Math.round(diff / 60000);

  if (Math.abs(minutes) < 60) {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(minutes, "minute");
  }

  const hours = Math.round(minutes / 60);

  if (Math.abs(hours) < 24) {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(hours, "hour");
  }

  const days = Math.round(hours / 24);
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(days, "day");
}

export function getStatusLabel(status: string) {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function toNullableString(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function toInteger(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function toOptionalInteger(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const parsed = Number.parseInt(trimmed, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export function toOptionalDate(value: string) {
  if (!value.trim()) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export const inquiryStatusOptions: InquiryStatus[] = ["NEW", "IN_PROGRESS", "RESOLVED"];
export const blogStatusOptions: BlogPostStatus[] = ["DRAFT", "PUBLISHED"];
export const serviceStatusOptions: ServiceStatus[] = ["ACTIVE", "INACTIVE"];
export const programTypeOptions: ProgramType[] = [
  "BOOTCAMP",
  "WORKSHOP",
  "CRASH_COURSE",
  "MENTORSHIP",
];
export const programStatusOptions: ProgramStatus[] = ["ACTIVE", "UPCOMING", "COMPLETED"];
export const eventTypeOptions: EventType[] = ["SEMINAR", "CONFERENCE", "WORKSHOP", "COMMUNITY"];
export const eventStatusOptions: EventStatus[] = ["UPCOMING", "ACTIVE", "COMPLETED"];
