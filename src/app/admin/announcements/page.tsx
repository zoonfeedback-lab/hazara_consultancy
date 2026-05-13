import prisma from "@/lib/prisma";
import { AnnouncementsManager } from "@/components/admin/announcements-manager";

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AnnouncementsManager
      announcements={announcements.map((announcement) => ({
        ...announcement,
        createdAt: announcement.createdAt.toISOString(),
        expiresAt: announcement.expiresAt?.toISOString() ?? null,
      }))}
    />
  );
}
