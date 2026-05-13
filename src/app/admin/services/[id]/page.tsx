import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminServiceEditPage({ params }: Props) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    notFound();
  }

  return <ServiceForm service={service} />;
}
