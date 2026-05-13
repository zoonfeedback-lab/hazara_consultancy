"use server";

import { revalidatePath } from "next/cache";
import type { InquiryStatus } from "@/lib/types/database";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
): Promise<AdminActionResult<{ id: string; status: InquiryStatus }>> {
  try {
    const inquiry = await prisma.inquiry.update({
      data: { status },
      where: { id },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/inquiries");

    return {
      data: { id: inquiry.id, status: inquiry.status },
      success: true,
    };
  } catch (error) {
    return adminActionError(error, "Unable to update inquiry status.");
  }
}

export async function updateInquiryNotes(
  id: string,
  notes: string,
): Promise<AdminActionResult<{ id: string; notes: string | null }>> {
  try {
    const inquiry = await prisma.inquiry.update({
      data: { notes: notes.trim() || null },
      where: { id },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/inquiries");

    return {
      data: { id: inquiry.id, notes: inquiry.notes },
      success: true,
    };
  } catch (error) {
    return adminActionError(error, "Unable to save inquiry notes.");
  }
}
