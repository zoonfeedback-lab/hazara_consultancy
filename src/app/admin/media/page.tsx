import prisma from "@/lib/prisma";
import { MediaManager } from "@/components/admin/media-manager";

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <MediaManager media={media} />;
}
