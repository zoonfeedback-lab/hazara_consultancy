import { redirect } from "next/navigation";

export default function AdminAnnouncementNewPage() {
  redirect("/admin/announcements?new=1");
}
