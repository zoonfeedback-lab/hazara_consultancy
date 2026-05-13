import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/event-form";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminEventEditPage({ params }: Props) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    notFound();
  }

  return <EventForm event={event} />;
}
