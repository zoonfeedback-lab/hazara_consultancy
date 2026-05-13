import prisma from "@/lib/prisma";
import { InquiriesClient } from "@/components/admin/inquiries-client";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <InquiriesClient
      initialInquiries={inquiries.map((inquiry) => ({
        ...inquiry,
        createdAt: inquiry.createdAt.toISOString(),
      }))}
    />
  );
}
