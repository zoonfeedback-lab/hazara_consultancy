import prisma from "@/lib/prisma";
import { EventsManager } from "@/components/admin/events-manager";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: [{ date: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <EventsManager
      events={events.map((event) => ({
        ...event,
        createdAt: event.createdAt.toISOString(),
        date: event.date?.toISOString() ?? null,
        updatedAt: event.updatedAt.toISOString(),
      }))}
    />
  );
}
