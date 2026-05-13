"use server";

import { revalidatePath } from "next/cache";
import type { Testimonial } from "@/lib/types/database";
import { toInteger, toNullableString } from "@/lib/admin-utils";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export type TestimonialInput = {
  featured: boolean;
  program: string;
  quote: string;
  sortOrder: string;
  studentName: string;
};

function toTestimonialData(input: TestimonialInput) {
  return {
    featured: input.featured,
    program: toNullableString(input.program),
    quote: input.quote.trim(),
    sortOrder: toInteger(input.sortOrder),
    studentName: input.studentName.trim(),
  };
}

function revalidateTestimonialPaths() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(
  input: TestimonialInput,
): Promise<AdminActionResult<Testimonial>> {
  try {
    const testimonial = await prisma.testimonial.create({ data: toTestimonialData(input) });
    revalidateTestimonialPaths();
    return { data: testimonial, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to create testimonial.");
  }
}

export async function updateTestimonial(
  id: string,
  input: TestimonialInput,
): Promise<AdminActionResult<Testimonial>> {
  try {
    const testimonial = await prisma.testimonial.update({
      data: toTestimonialData(input),
      where: { id },
    });
    revalidateTestimonialPaths();
    return { data: testimonial, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to update testimonial.");
  }
}

export async function deleteTestimonial(id: string): Promise<AdminActionResult<{ id: string }>> {
  try {
    const testimonial = await prisma.testimonial.delete({ where: { id } });
    revalidateTestimonialPaths();
    return { data: { id: testimonial.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to delete testimonial.");
  }
}
