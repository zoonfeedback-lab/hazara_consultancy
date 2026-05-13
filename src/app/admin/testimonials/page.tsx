import prisma from "@/lib/prisma";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return <TestimonialsManager testimonials={testimonials} />;
}
