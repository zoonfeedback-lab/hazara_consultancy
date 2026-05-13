import { getStatusLabel } from "@/lib/admin-utils";

type AdminBadgeProps = {
  status: string;
};

function getBadgeColors(status: string) {
  const normalized = status.toLowerCase();

  if (["active", "published", "resolved"].includes(normalized)) {
    return "bg-[#16A34A] text-white";
  }

  if (["draft", "upcoming", "in progress", "in_progress", "new"].includes(normalized)) {
    return "bg-[#D97706] text-white";
  }

  if (["inactive", "completed"].includes(normalized)) {
    return "bg-[#6B7280] text-white";
  }

  return "bg-[#0F2447] text-white";
}

export function AdminBadge({ status }: AdminBadgeProps) {
  return (
    <span className={`admin-badge ${getBadgeColors(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
}
