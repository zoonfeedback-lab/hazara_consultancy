"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export async function deleteMedia(id: string): Promise<AdminActionResult<{ id: string }>> {
  try {
    const media = await prisma.media.delete({ where: { id } });
    revalidatePath("/admin/media");
    return { data: { id: media.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to delete media item.");
  }
}
