import prisma from "@/lib/prisma";
import { ServicesManager } from "@/components/admin/services-manager";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return <ServicesManager services={services} />;
}
